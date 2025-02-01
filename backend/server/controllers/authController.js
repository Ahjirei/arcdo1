import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import initializeConnection from '../config/db.js';


dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const clientUrl = process.env.CLIENT_URL;

function validatePassword(password) {
    return password.length >= 8 && /[0-9!@#$%^&*]/.test(password);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export const register = async (req, res) => {
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
            [userId, name, contact_number, position, campus, college]
        );
        
        res.status(201).json({ message: 'Registration successful. Please verify your account.', user_id: userId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: `An error occurred during registration: ${error.message}` });
    } 
};


export const userDetails = async (req, res) => {
    const user_id = req.params.id;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    let connection;
    try {
        connection = await initializeConnection();
        
        // Fetch user details
        const [userInfo] = await connection.query(
            "SELECT name, contact_number, position, campus, college FROM user_account WHERE user_id = ?",
            [user_id]
        );

        if (userInfo.length === 0) {
            return res.status(404).json({ error: "User details not found." });
        }

        const { name, contact_number, position, campus, college } = userInfo[0];

        res.json({
            name,
            contact_number,
            position,
            campus,
            college
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

export const updateUserDetails = async (req, res) => {
    const user_id = req.params.id;  // Retrieve user ID from the URL
    const { name, contact_number, position, campus, college } = req.body;  // New data to update

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required." });
    }

    if (!name || !contact_number || !position || !campus || !college) {
        return res.status(400).json({ error: "All fields are required to update." });
    }

    let connection;
    try {
        connection = await initializeConnection();

        // Update user details in the database
        const [updateResult] = await connection.query(
            "UPDATE user_account SET name = ?, contact_number = ?, position = ?, campus = ?, college = ? WHERE user_id = ?",
            [name, contact_number, position, campus, college, user_id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "User details not found for this user ID." });
        }

        // Retrieve the updated user details
        const [updatedUserInfo] = await connection.query(
            "SELECT name, contact_number, position, campus, college FROM user_account WHERE user_id = ?",
            [user_id]
        );

        res.json({
            message: "User details updated successfully.",
            updatedUserInfo: updatedUserInfo[0]
        });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const connection = await initializeConnection();
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await connection.query(sql, [email]);

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '24h' });
        const refresh_token = jwt.sign({ id: user.id, email: user.email }, refreshSecretKey);

        const updateSql = 'UPDATE users SET refresh_token = ? WHERE id = ?';
        await connection.query(updateSql, [refresh_token, user.id]);

        res.json({ token, refresh_token, id: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error logging in' });
    }
};


export const refresh_token = async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
        return res.status(401).send('Refresh token is required');
    }

    try {
        const decoded = jwt.verify(refresh_token, refreshSecretKey);
        const connection = await initializeConnection();
        const sql = 'SELECT * FROM users WHERE id = ? AND refresh_token = ?';
        const [results] = await connection.query(sql, [decoded.id, refresh_token]);

        if (results.length === 0) {
            return res.status(403).send('Invalid refresh token');
        }

        const user = results[0];
        const newToken = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '24h' });

        res.json({ token: newToken });
    } catch (error) {
        res.status(403).send('Invalid refresh token');
    }
};

export const protectedRoute = (req, res) => {
    const { email } = req.user;
    res.send(`Welcome ${email}! This is a protected route.`);
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const connection = await initializeConnection();

        // Check if the user exists in the database
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await connection.query(sql, [email]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        const user = results[0];

        // Create a reset token
        const resetToken = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

        // Construct the reset URL
        const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
                <h1>Password Reset</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        // Attempt to send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset link. Please try again later.' });
    }
};


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, secretKey);
        const { email } = decoded;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const connection = await initializeConnection();
        const sql = 'UPDATE users SET password = ? WHERE email = ?';
        await connection.query(sql, [hashedPassword, email]);

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token.' });
    }
};