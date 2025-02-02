import initializeConnection from '../config/db.js';
import connectDB from '../config/db.js';

export const getUsers = async (req, res) => {
    try {
        const connection = await connectDB();
        const sql = "SELECT * FROM users";
        const [results] = await connection.query(sql);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// export const createUser = async (req, res) => {
//     try {
//         const { email, password } = req.body; 
        
//         if (!email) {
//             return res.status(400).json({ error: 'Email is required.' });
//         }
//         if (!password) {
//             return res.status(400).json({ error: 'Password is required.' });
//         }

//         const connection = await connectDB();
//         const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
//         const [result] = await connection.query(sql, [email, password]);
        
//         res.status(201).json({ id: result.insertId, email });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

export const createUser = async (req, res) => {
    try {
        const { email, password, name, contact_number, position, campus, college} = req.body;
        
        // Input validation
        if (!email || !password || !name || !contact_number || !position || !campus || !college) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain a number or special character.' });
        }

        const connection = await initializeConnection();

        // Check if the email already exists
        const [existingUser] = await connection.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user into users table
        const [userResult] = await connection.query(
            "INSERT INTO users (email, password, is_verified, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
            [email, hashedPassword, 0]
        );

        const userId = userResult.insertId;

        // Insert additional user info
        await connection.query(
            "INSERT INTO user_account (user_id, name, contact_number, position, campus, college) VALUES (?, ?, ?, ?, ?, ?)",
            [userId, realName, contact_number, position, campus, college]
        );
        
        
        res.status(201).json({ message: 'Registration successful. Please verify your account.', user_id: userId });
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};
