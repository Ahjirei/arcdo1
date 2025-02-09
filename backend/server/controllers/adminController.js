import connectDB from '../config/db.js';

export const getAdminUsers = async (req, res) => {
    try {
        const connection = await connectDB();
        const sql = `
            SELECT users.id, users.email, users.role, users.last_login, user_account.name
            FROM users
            JOIN user_account ON users.id = user_account.user_id
            WHERE users.role = 'Admin'
        `;
        const [results] = await connection.query(sql);
        res.json(results);
    } catch (error) {
        console.error("Error fetching admin users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const setAdminRole = async (req, res) => {
    const { name, email } = req.body; // Accept name or email
    const requesterId = req.user?.id; // ID of the requesting user (from authentication middleware)

    try {
        const connection = await connectDB();

        // Check if a user with the provided name or email exists
        let query = "SELECT id FROM users WHERE ";
        let queryParams = [];

        if (name) {
            query += "id = (SELECT user_id FROM user_account WHERE name = ?)";
            queryParams.push(name);
        } else if (email) {
            query += "email = ?";
            queryParams.push(email);
        } else {
            return res.status(400).json({ error: "Please provide a name or email" });
        }

        const [user] = await connection.query(query, queryParams);

        if (!user.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = user[0].id;

        // Update the role to Admin
        await connection.query("UPDATE users SET role = 'Admin' WHERE id = ?", [userId]);

        res.json({ message: "User role updated to Admin successfully" });

    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const removeAdminRole = async (req, res) => {
    const { name, email } = req.body; // Accept name or email
    const requesterId = req.user?.id; // ID of the requesting user (from authentication middleware)

    try {
        const connection = await connectDB();
        // Find user by name or email
        let query = "SELECT id FROM users WHERE ";
        let queryParams = [];

        if (name) {
            query += "id = (SELECT user_id FROM user_account WHERE name = ?)";
            queryParams.push(name);
        } else if (email) {
            query += "email = ?";
            queryParams.push(email);
        } else {
            return res.status(400).json({ error: "Please provide a name or email" });
        }

        const [user] = await connection.query(query, queryParams);

        if (!user.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = user[0].id;

        // Update the role to "User"
        await connection.query("UPDATE users SET role = 'User' WHERE id = ?", [userId]);

        res.json({ message: "User role updated to User successfully" });

    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
