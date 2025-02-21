import React, { useState, useEffect } from "react";

const EditMoa = ({ isOpen, onClose, editingMoa, setEditingMoa, onMoaEdited }) => {
  const [error, setError] = useState("");
  useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [error]); 
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !editingMoa) return null;

  const formatMySQLDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const pad = (n) => (n < 10 ? '0' + n : n);
    return (
      d.getFullYear() +
      '-' +
      pad(d.getMonth() + 1) +
      '-' +
      pad(d.getDate()) +
      ' ' +
      pad(d.getHours()) +
      ':' +
      pad(d.getMinutes()) +
      ':' +
      pad(d.getSeconds())
    );
  };
  
  const handleSave = async () => {
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
        "preferred_college",
        "email_address",
        "office_address",
        "with_moa_date_notarized",
        "expiry_date",
      ];
  
      const updatedPartner = { ...industryPartner };
      fieldsToConvert.forEach((field) => {
        if (updatedPartner[field] === "") {
          updatedPartner[field] = null;
        }
      });
  
      // Format updated_at for MySQL
      updatedPartner.updated_at = formatMySQLDate(new Date());
  
      const response = await fetch(
        `http://localhost:3001/api/ip/updatePartner/${industryPartner.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPartner),
        }
      );
  
      if (response.ok) {
        // Remove the window.location.reload() and use the callback instead
        if (onPartnerEdited) {
          onPartnerEdited();
        }
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update Industry Partner");
      }
    } catch (err) {
      console.error("Error updating Industry Partner:", err);
      setError("An error occurred while updating the Industry Partner");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 sm:mt-0 mt-20">
      <div className="bg-white p-6 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[85vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit MOA</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={editingMoa.company_name}
              onChange={(e) => setEditingMoa({ ...editingMoa, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Type</label>
              <select
                value={editingMoa.type_of_moa}
                onChange={(e) => setEditingMoa({ ...editingMoa, type_of_moa: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="" disabled>Select MOA Type</option>
                <option value="Practicum">Practicum</option>
                <option value="Research">Research</option>
                <option value="Employment">Employment</option>
                <option value="Scholarship">Scholarship</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Draft of MOA Sent</label>
              <input
                type="text"
                value={editingMoa.moa_draft_sent}
                onChange={(e) => setEditingMoa({ ...editingMoa, moa_draft_sent: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Draft of MOA Sent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Status</label>
              <select
                value={editingMoa.moa_status}
                onChange={(e) => setEditingMoa({ ...editingMoa, moa_status: e.target.value })}
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
                value={editingMoa.business_type}
                onChange={(e) => setEditingMoa({ ...editingMoa, business_type: e.target.value })}
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
                value={editingMoa.contact_person}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={editingMoa.contact_no}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_no: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={editingMoa.email}
                onChange={(e) => setEditingMoa({ ...editingMoa, email: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Office Address</label>
            <input
              type="text"
              value={editingMoa.address}
              onChange={(e) => setEditingMoa({ ...editingMoa, address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={editingMoa.remarks}
              onChange={(e) => setEditingMoa({ ...editingMoa, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Validity</label>
            <input
              type="text"
              value={editingMoa.validity}
              onChange={(e) => setEditingMoa({ ...editingMoa, validity: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Years of Validity"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Year Started</label>
              <input
                type="date"
                value={editingMoa.year_moa_started 
                  ? new Date(editingMoa.year_moa_started).toISOString().split("T")[0] 
                  : ""}
                onChange={(e) => setEditingMoa({ ...editingMoa, year_moa_started: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="MOA Year Started"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">MOA Date Notarized</label>
              <input
                type="date"
                value={editingMoa.date_notarized}
                onChange={(e) =>
                  setEditingMoa({ ...editingMoa, date_notarized: parseInt(e.target.value, 10)})
                }
                min="1900" max="2100"
                className="w-full p-2 border rounded border-gray-500"
              />

            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={editingMoa.expiration_date 
                  ? new Date(editingMoa.expiration_date).toISOString().split("T")[0] 
                  : ""}
                onChange={(e) => setEditingMoa({ ...editingMoa, expiration_date: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={editingMoa.moa_status || "Inactive"}
              onChange={(e) => setEditingMoa({ ...editingMoa, moa_status: e.target.value })}
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