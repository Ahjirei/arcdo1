import React, { useState } from "react";

const AddMoa = ({ isOpen, onClose, onMoaAdded }) => {
  const [newMoa, setNewMoa] = useState({
    company_name: "",
    year_moa_started: "",
    business_type: "",
    moa_status: "Active",
    contact_person: "",
    contact_no: "",
    remarks: "",
    email: "",
    address: "",
    date_notarized: "",
    expiration_date: "",
    type_of_moa: "",
    moa_draft_sent: "",
    validity: "Processing"
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    const requiredFields = [
      'company_name', 'contact_person', 'email', 'address'
    ];
    const missingFields = requiredFields.filter(field => !newMoa[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      // Convert empty fields to NULL
      const fieldsToConvert = ['date_notarized', 'expiration_date', 'moa_draft_sent', 'type_of_moa', 'moa_status'];
      const updatedMoa = { ...newMoa };
      fieldsToConvert.forEach(field => {
        if (updatedMoa[field] === '') {
          updatedMoa[field] = null;
        }
      });

      const response = await fetch("http://localhost:3001/api/moa/addMoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMoa),
      });

      if (response.ok) {
        onMoaAdded();
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setError(errorData.error || 'Failed to add MOA. Please try again.');
      }
    } catch (err) {
      console.error('Error adding MOA:', err);
      setError('An error occurred while adding the MOA. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 sm:mt-0 mt-20">
      <div className="bg-white p-6 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[85vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New MOA</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={newMoa.company_name}
              onChange={(e) => setNewMoa({ ...newMoa, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Type</label>
              <input
                type="text"
                value={newMoa.type_of_moa}
                onChange={(e) => setNewMoa({ ...newMoa, type_of_moa: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="MOA Type"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Draft of MOA Sent</label>
              <input
                type="text"
                value={newMoa.moa_draft_sent}
                onChange={(e) => setNewMoa({ ...newMoa, moa_draft_sent: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Draft of MOA Sent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Validity</label>
              <select
                value={newMoa.validity}
                onChange={(e) => setNewMoa({ ...newMoa, validity: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="Processing">Processing</option>
                <option value="On Hold">On Hold</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                value={newMoa.business_type}
                onChange={(e) => setNewMoa({ ...newMoa, business_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Business Type"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                value={newMoa.contact_person}
                onChange={(e) => setNewMoa({ ...newMoa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={newMoa.contact_no}
                onChange={(e) => setNewMoa({ ...newMoa, contact_no: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={newMoa.email}
                onChange={(e) => setNewMoa({ ...newMoa, email: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Office Address</label>
            <input
              type="text"
              value={newMoa.address}
              onChange={(e) => setNewMoa({ ...newMoa, address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={newMoa.remarks}
              onChange={(e) => setNewMoa({ ...newMoa, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Year Started</label>
              <input
                type="text"
                value={newMoa.year_moa_started}
                onChange={(e) => setNewMoa({ ...newMoa, year_moa_started: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="MOA Year Started"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">MOA Date Notarized</label>
              <input
                type="date"
                value={newMoa.date_notarized}
                onChange={(e) => setNewMoa({ ...newMoa, date_notarized: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={newMoa.expiration_date}
                onChange={(e) => setNewMoa({ ...newMoa, expiration_date: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddMoa;