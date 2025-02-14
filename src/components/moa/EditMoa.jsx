import React, { useState, useEffect } from "react";

const EditMoa = ({ isOpen, onClose, MoaData, onMoaEdited }) => {
  const [moa, setMoa] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (MoaData) {
      setMoa(MoaData);
    }
  }, [MoaData]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Convert empty fields to NULL
      const fieldsToConvert = ['date_notarized', 'expiration_date', 'moa_draft_sent', 'type_of_moa', 'moa_status'];
      const updatedMoa = { ...moa };
      fieldsToConvert.forEach(field => {
        if (updatedMoa[field] === '' || updatedMoa[field] === '1970-01-01') {
          updatedMoa[field] = null;
        }
      });
      
      const response = await fetch(`http://localhost:3001/api/moa/updateMoa/${moa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMoa),
      });

      if (response.ok) {
        onMoaEdited();
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setError(errorData.error || 'Failed to update MOA. Please try again.');
      }
    } catch (err) {
      console.error('Error updating MOA:', err);
      setError('An error occurred while updating the MOA. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 sm:mt-0 mt-20">
      <div className="bg-white p-6 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[85vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit MOA</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={moa.company_name || ""}
              onChange={(e) => setMoa({ ...moa, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Type</label>
              <input
                type="text"
                value={moa.type_of_moa || ""}
                onChange={(e) => setMoa({ ...moa, type_of_moa: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="MOA Type"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Draft of MOA Sent</label>
              <input
                type="text"
                value={moa.moa_draft_sent || ""}
                onChange={(e) => setMoa({ ...moa, moa_draft_sent: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Draft of MOA Sent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Validity</label>
              <select
                value={moa.moa_status || ""}
                onChange={(e) => setMoa({ ...moa, moa_status: e.target.value })}
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
                value={moa.business_type || ""}
                onChange={(e) => setMoa({ ...moa, business_type: e.target.value })}
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
                value={moa.contact_person || ""}
                onChange={(e) => setMoa({ ...moa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={moa.contact_no || ""}
                onChange={(e) => setMoa({ ...moa, contact_no: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={moa.email || ""}
                onChange={(e) => setMoa({ ...moa, email: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Office Address</label>
            <input
              type="text"
              value={moa.address || ""}
              onChange={(e) => setMoa({ ...moa, address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={moa.remarks || ""}
              onChange={(e) => setMoa({ ...moa, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Year Started</label>
              <input
                type="text"
                value={moa.year_moa_started || ""}
                onChange={(e) => setMoa({ ...moa, year_moa_started: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="MOA Year Started"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">MOA Date Notarized</label>
              <input
                type="date"
                value={moa.date_notarized || ""}
                onChange={(e) => setMoa({ ...moa, date_notarized: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={moa.expiration_date || ""}
                onChange={(e) => setMoa({ ...moa, expiration_date: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={moa.moa_status || "Inactive"}
              onChange={(e) => setMoa({ ...moa, moa_status: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMoa;