import initializeConnection from '../config/db.js';

// Get all MOA records
export const getMoa = async (req, res) => {
    let connection;
    try {
        connection = await initializeConnection();
        const [moaRecords] = await connection.query("SELECT * FROM moa");

        // Format date fields for all records
        const dateFields = ['expiration_date', 'year_moa_started', 'moa_draft_sent'];
        moaRecords.forEach(record => {
            dateFields.forEach(field => {
                if (record[field]) {
                    const date = new Date(record[field]);
                    record[field] = date.toISOString().split('T')[0];
                }
            });

            // Handle date_notarized separately if it's stored as timestamp
            if (record.date_notarized) {
                const date = new Date(record.date_notarized);
                record.date_notarized = date.toISOString().split('T')[0];
            }
        });

        res.status(200).json(moaRecords);
    } catch (error) {
        console.error("Error fetching MOA records:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    } finally {
        if (connection) connection.end();
    }
};

// Get MOA by ID
export const getMoaById = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await initializeConnection();
        const [moa] = await connection.query("SELECT * FROM moa WHERE id = ?", [id]);

        if (moa.length === 0) {
            return res.status(404).json({ error: "MOA record not found." });
        }

        // Format date fields to YYYY-MM-DD
        const dateFields = ['expiration_date', 'year_moa_started', 'moa_draft_sent'];
        dateFields.forEach(field => {
            if (moa[0][field]) {
                const date = new Date(moa[0][field]);
                moa[0][field] = date.toISOString().split('T')[0];
            }
        });

        // Handle date_notarized separately if it's stored as timestamp
        if (moa[0].date_notarized) {
            const date = new Date(moa[0].date_notarized);
            moa[0].date_notarized = date.toISOString().split('T')[0];
        }

        res.status(200).json(moa[0]);
    } catch (error) {
        console.error("Error fetching MOA record by ID:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    } finally {
        if (connection) connection.end();
    }
};

// Add a new MOA record
export const addMoa = async (req, res) => {
    let connection;
    try {
        const newMoa = { ...req.body };

        // Convert empty fields to NULL
        const fieldsToConvert = ['date_notarized', 'expiration_date', 'moa_draft_sent', 'type_of_moa', 'moa_status'];
        fieldsToConvert.forEach(field => {
            if (newMoa[field] === '') {
                newMoa[field] = null;
            }
        });

        connection = await initializeConnection();
        const [result] = await connection.query(
            "INSERT INTO moa SET ?",
            [newMoa]
        );

        const addedMoa = {
            id: result.insertId,
            ...newMoa
        };

        res.status(201).json(addedMoa);
    } catch (error) {
        console.error("Error adding MOA record:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (connection) connection.end();
    }
};

// Update an existing MOA record
export const updateMoa = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Convert empty fields to NULL
        const fieldsToConvert = ['date_notarized', 'expiration_date', 'moa_draft_sent', 'type_of_moa', 'moa_status'];
        fieldsToConvert.forEach(field => {
            if (updates[field] === '' || updates[field] === '1970-01-01') {
                updates[field] = null;
            }
        });

        connection = await initializeConnection();
        
        const updateQuery = 'UPDATE moa SET ? WHERE id = ?';
        const [result] = await connection.query(updateQuery, [updates, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'MOA not found' });
        }

        const [updated] = await connection.query('SELECT * FROM moa WHERE id = ?', [id]);
        res.json(updated[0]);

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) connection.end();
    }
};

// Delete an MOA record
export const deleteMoa = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await initializeConnection();

        // Check if the MOA record exists
        const [existingMoa] = await connection.query("SELECT * FROM moa WHERE id = ?", [id]);
        if (existingMoa.length === 0) {
            return res.status(404).json({ error: "MOA record not found." });
        }

        // Delete the MOA record
        const [result] = await connection.query("DELETE FROM moa WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "MOA record not found." });
        }

        res.status(200).json({ message: "MOA record deleted successfully." });
    } catch (error) {
        console.error("Error deleting MOA record:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    } finally {
        if (connection) connection.end();
    }
};
