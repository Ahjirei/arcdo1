import initializeConnection from '../config/db.js';

export const getHte = async (req, res) => {
    try {
        const connection = await initializeConnection();
        const [hte] = await connection.query("SELECT * FROM hte");
        res.status(200).json(hte);
    } catch (error) {
        console.error("Error fetching hte:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

export const getHteById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await initializeConnection();
        const [hte] = await connection.query("SELECT * FROM hte WHERE id = ?", [id]);
        
        if (hte.length === 0) {
            return res.status(404).json({ error: "HTE not found." });
        }

        res.status(200).json(hte[0]);
    } catch (error) {
        console.error("Error fetching hte by ID:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

// Add a new HTE record
export const addHte = async (req, res) => {
    try {
        const {
            company_name,
            office_address,
            year_submitted,
            business_type,
            moa_status,
            contact_person,
            contact_number,
            email_address,
            remarks = null,
            campus = null,
            college = null,
            course = null,
            expiry_date = null,
            position_department,
            with_moa_date_notarized = null,
            year_included
        } = req.body;

        // Validate only the required fields
        if (
            !company_name ||
            !office_address ||
            !year_submitted ||
            !business_type ||
            !moa_status ||
            !contact_person ||
            !contact_number ||
            !email_address ||
            !position_department ||
            !year_included
        ) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const connection = await initializeConnection();
        const [result] = await connection.query(
            `INSERT INTO hte (
                company_name, office_address, year_submitted, business_type, moa_status,
                contact_person, contact_number, email_address, remarks, campus, 
                college, course, expiry_date, position_department, with_moa_date_notarized, year_included
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                company_name,
                office_address,
                year_submitted,
                business_type,
                moa_status,
                contact_person,
                contact_number,
                email_address,
                remarks,
                campus,
                college,
                course,
                expiry_date,
                position_department,
                with_moa_date_notarized,
                year_included
            ]
        );

        res.status(201).json({ id: result.insertId, message: "HTE added successfully." });
    } catch (error) {
        console.error("Error adding HTE:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

// Update an existing HTE record
export const updateHte = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company_name,
            office_address,
            year_submitted,
            business_type,
            moa_status,
            contact_person,
            contact_number,
            email_address,
            remarks,
            campus,
            college,
            course,
            expiry_date,
            position_department,
            with_moa_date_notarized,
            year_included,
        } = req.body;

        if (
            !company_name ||
            !office_address ||
            !year_submitted ||
            !business_type ||
            !moa_status ||
            !contact_person ||
            !contact_number ||
            !email_address ||
            !position_department ||
            !year_included
        ) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const formattedExpiryDate = new Date(expiry_date).toISOString().split("T")[0];
        const formattedMoaDate = new Date(with_moa_date_notarized).toISOString().split("T")[0];

        const connection = await initializeConnection();
        const [result] = await connection.query(
            `UPDATE hte SET 
                company_name = ?, office_address = ?, year_submitted = ?, business_type = ?, moa_status = ?,
                contact_person = ?, contact_number = ?, email_address = ?, remarks = ?, campus = ?, 
                college = ?, course = ?, expiry_date = ?, position_department = ?, with_moa_date_notarized = ?, year_included = ?
             WHERE id = ?`,
            [
                company_name,
                office_address,
                year_submitted,
                business_type,
                moa_status,
                contact_person,
                contact_number,
                email_address,
                remarks,
                campus,
                college,
                course,
                formattedExpiryDate,
                position_department,
                formattedMoaDate,
                year_included,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "HTE not found." });
        }

        res.status(200).json({ message: "HTE updated successfully." });
    } catch (error) {
        console.error("Error updating HTE:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

// Delete an HTE record
export const deleteHte = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await initializeConnection();
        
        // Check if the HTE record exists
        const [existingHte] = await connection.query("SELECT * FROM hte WHERE id = ?", [id]);
        if (existingHte.length === 0) {
            return res.status(404).json({ error: "HTE not found." });
        }
        
        // Delete the HTE record
        const [result] = await connection.query("DELETE FROM hte WHERE id = ?", [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "HTE not found." });
        }
        
        res.status(200).json({ message: "HTE deleted successfully." });
    } catch (error) {
        console.error("Error deleting HTE:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};