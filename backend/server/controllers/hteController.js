import initializeConnection from '../config/db.js';

export const getHte = async (req, res) => {
    try {
        const connection = await initializeConnection();
        const [coordinators] = await connection.query("SELECT * FROM hte");
        res.status(200).json(coordinators);
    } catch (error) {
        console.error("Error fetching coordinators:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};