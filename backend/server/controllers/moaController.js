import initializeConnection from '../config/db.js';

// Get all MOA records
export const getMoa = async (req, res) => {
    try {
        const connection = await initializeConnection();
        const [moaRecords] = await connection.query("SELECT * FROM moa");
        res.status(200).json(moaRecords);
    } catch (error) {
        console.error("Error fetching MOA records:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

// Get MOA by ID
export const getMoaById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await initializeConnection();
        const [moa] = await connection.query("SELECT * FROM moa WHERE id = ?", [id]);

        if (moa.length === 0) {
            return res.status(404).json({ error: "MOA record not found." });
        }

        res.status(200).json(moa[0]);
    } catch (error) {
        console.error("Error fetching MOA record by ID:", error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

// Add a new MOA record
export const addMoa = async (req, res) => {
    try {
      const { company_name, date_notarized, validity, moa_status, contact_person, email } = req.body;
  
      if (!company_name || !date_notarized || !validity || !moa_status || !contact_person || !email) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const connection = await initializeConnection();
      // Convert date_notarized using STR_TO_DATE if needed
      const [result] = await connection.query(
        "INSERT INTO moa (company_name, date_notarized, validity, moa_status, contact_person, email) VALUES (?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, ?, ?)",
        [company_name, date_notarized, validity, moa_status, contact_person, email]
      );
  
      const newMoa = {
        id: result.insertId,
        company_name,
        date_notarized,
        validity,
        moa_status,
        contact_person,
        email
      };
  
      res.status(201).json(newMoa);
    } catch (error) {
      console.error("Error adding MOA record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const updateMoa = async (req, res) => {
    try {
      const { id } = req.params;
      const { company_name, date_notarized, validity, moa_status, contact_person, email } = req.body;
  
      if (!id || !company_name || !date_notarized || !validity || !moa_status || !contact_person || !email) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const connection = await initializeConnection();
      const [result] = await connection.query(
        "UPDATE moa SET company_name = ?, date_notarized = STR_TO_DATE(?, '%Y-%m-%d'), validity = ?, moa_status = ?, contact_person = ?, email = ? WHERE id = ?",
        [company_name, date_notarized, validity, moa_status, contact_person, email, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "MOA record not found." });
      }
  
      res.status(200).json({ message: "MOA record updated successfully." });
    } catch (error) {
      console.error("Error updating MOA record:", error);
      res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
  };
  
// Delete an MOA record
export const deleteMoa = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await initializeConnection();

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
    }
};
