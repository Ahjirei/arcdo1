import React, { useState, useEffect } from "react";

const AddIndustryPartner = ({ isOpen, onClose, onPartnerAdded }) => {
  const [newIndustryPartner, setNewIndustryPartner] = useState({
    company_name: "",
    telephone: "",
    fax_number: "",
    business_type: "",
    moa_status: "Processing",
    contact_person: "",
    contact_number: "",
    remarks: "",
    year_included: "",
    position_department: "",
    preferred_courses: "",
    campus: "",
    preferred_college: "",
    email_address: "",
    office_address: "",
    with_moa_date_notarized: "",
    expiry_date: "",
  });

  const [error, setError] = useState("");
  useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [error]); 

  const handleSave = async () => {

    const formatDate = (date) => {
      if (!date) return null; 
      return new Date(date).toISOString().split("T")[0]; 
    };
  
    // Trim inputs before sending
    const trimmedIP = {};
    for (let key in newIndustryPartner) {
      trimmedIP[key] = newIndustryPartner[key].trim ? newIndustryPartner[key].trim() : newIndustryPartner[key];
    }
    trimmedIP.year_included = String(trimmedIP.year_included);
    trimmedIP.with_moa_date_notarized = String(trimmedIP.with_moa_date_notarized);
    trimmedIP.created_at = new Date().toISOString();
  
    if (newIndustryPartner.expiry_date) {
      trimmedIP.expiry_date = formatDate(newIndustryPartner.expiry_date);
    } else {
      trimmedIP.expiry_date = null;
    }
  
    try {
      // Convert empty fields to NULL
      const fieldsToConvert = [
        "telephone",
        "fax_number",
        "business_type",
        "moa_status",
        "contact_person",
        "contact_number",
        "remarks",
        "year_included",
        "position_department",
        "preferred_courses",
        "campus",
        "preferred_college",
        "email_address",
        "office_address",
        "with_moa_date_notarized",
        "expiry_date",
      ];
      const updatedPartner = { ...newIndustryPartner };
      fieldsToConvert.forEach((field) => {
        if (updatedPartner[field] === "") {
          updatedPartner[field] = null;
        }
      });

      const response = await fetch("http://localhost:3001/api/ip/addPartner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPartner),
      });

      if (response.ok) {
        onPartnerAdded();
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.error || "Failed to add Industry Partner. Please try again.");
      }
    } catch (err) {
      console.error("Error adding Industry Partner:", err);
      setError("An error occurred while adding the Industry Partner. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 sm:mt-0 mt-20">
      <div className="bg-white p-6 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[85vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Industry Partner</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={newIndustryPartner.company_name}
              onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Telephone Number</label>
              <input
                type="text"
                value={newIndustryPartner.telephone}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, telephone: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Telephone Number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Fax Number</label>
              <input
                type="text"
                value={newIndustryPartner.fax_number}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, fax_number: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Fax Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                value={newIndustryPartner.business_type}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, business_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Business Type"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">MOA Status</label>
              <select
                value={newIndustryPartner.moa_status}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, moa_status: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="Processing">Processing</option>
                <option value="On Hold">On Hold</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
                <option value="For Renewal">For Renewal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                value={newIndustryPartner.contact_person}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={newIndustryPartner.contact_number}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, contact_number: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Position/Department</label>
              <input
                type="text"
                value={newIndustryPartner.position_department}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, position_department: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Position or Department"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={newIndustryPartner.email_address}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, email_address: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Office Address</label>
            <input
              type="text"
              value={newIndustryPartner.office_address}
              onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, office_address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={newIndustryPartner.remarks}
              onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Course</label>
              <input
                type="text"
                value={newIndustryPartner.preferred_courses}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, preferred_courses: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Course"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">College</label>
              <input
                type="text"
                value={newIndustryPartner.preferred_college}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, preferred_college: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="College"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Campus</label>
              <select
                value={newIndustryPartner.campus}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, campus: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="">Select Campus</option>
                <option value="Main">PUP Main</option>
                <option value="Bataan">PUP Bataan</option>
                <option value="Calauan">PUP Calauan</option>
                <option value="Lopez">PUP Lopez</option>
                <option value="Paranaque">PUP Paranaque</option>
                <option value="Quezon City">PUP Quezon City</option>
                <option value="Ragay">PUP Ragay</option>
                <option value="San Juan">PUP San Juan</option>
                <option value="Sto. Tomas">PUP Sto. Tomas</option>
                <option value="San Pedro">PUP San Pedro</option>
                <option value="Santa Rosa">PUP Santa Rosa</option>
                <option value="Taguig">PUP Taguig</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Year Included</label>
              <input
                type="date"
                value={newIndustryPartner.year_included}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, year_included: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Year Included"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">MOA Date Notarized</label>
              <input
                type="date"
                value={newIndustryPartner.with_moa_date_notarized}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, with_moa_date_notarized: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={newIndustryPartner.expiry_date}
                onChange={(e) => setNewIndustryPartner({ ...newIndustryPartner, expiry_date: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIndustryPartner;
