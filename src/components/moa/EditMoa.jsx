//// filepath: /c:/ARCDO/arcdo/src/components/moa/EditMoa.jsx
import React, { useState, useEffect } from "react";

const EditMoa = ({ isOpen, onClose, MoaData, onMoaEdited }) => {
  const [moa, setMoa] = useState(MoaData || {
    id: "",
    company_name: "",
    year_moa_started: "",
    business_type: "",
    moa_status: "Processing",
    contact_person: "",
    contact_no: "",
    remarks: "",
    email: "",
    address: "",
    date_notarized: "",
    expiration_date: "",
    status: "Active",
    type_of_moa: "",
    moa_draft_sent: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update local state whenever MoaData changes.
  useEffect(() => {
    setMoa(MoaData);
  }, [MoaData]);

  if (!isOpen || !moa) return null;

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`http://localhost:3001/api/moa/updateMoa/${moa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: moa.company_name,
          year_moa_started: moa.year_moa_started,
          business_type: moa.business_type,
          moa_status: moa.moa_status,
          contact_person: moa.contact_person,
          contact_no: moa.contact_no,
          remarks: moa.remarks,
          email: moa.email,
          address: moa.address,
          date_notarized: moa.date_notarized,
          expiration_date: moa.expiration_date,
          status: moa.status,
          type_of_moa: moa.type_of_moa,
          moa_draft_sent: moa.moa_draft_sent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update MOA");
      }

      onMoaEdited();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit MOA</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={moa.company_name}
            onChange={(e) => setMoa({ ...moa, company_name: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">MOA Type</label>
          <input
            type="text"
            value={moa.type_of_moa}
            onChange={(e) => setMoa({ ...moa, type_of_moa: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Draft of MOA Sent</label>
          <input
            type="text"
            value={moa.moa_draft_sent}
            onChange={(e) => setMoa({ ...moa, moa_draft_sent: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Business Type</label>
          <input
            type="text"
            value={moa.business_type}
            onChange={(e) => setMoa({ ...moa, business_type: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">MOA Validity</label>
          <select
            value={moa.moa_status}
            onChange={(e) => setMoa({ ...moa, moa_status: e.target.value })}
            className="w-full p-2 border mb-2"
          >
            <option value="Processing">Processing</option>
            <option value="On Hold">On Hold</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
            <option value="For Renewal">For Renewal</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Contact Person</label>
          <input
            type="text"
            value={moa.contact_person}
            onChange={(e) => setMoa({ ...moa, contact_person: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            value={moa.contact_no}
            onChange={(e) => setMoa({ ...moa, contact_no: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={moa.email}
            onChange={(e) => setMoa({ ...moa, email: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Office Address</label>
          <input
            type="text"
            value={moa.address}
            onChange={(e) => setMoa({ ...moa, address: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Remarks</label>
          <input
            type="text"
            value={moa.remarks}
            onChange={(e) => setMoa({ ...moa, remarks: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">MOA Year Started</label>
          <input
            type="text"
            value={moa.year_moa_started}
            onChange={(e) => setMoa({ ...moa, year_moa_started: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">MOA Date Notarized</label>
          <input
            type="date"
            value={moa.date_notarized}
            onChange={(e) => setMoa({ ...moa, date_notarized: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            value={moa.expiration_date}
            onChange={(e) => setMoa({ ...moa, expiration_date: e.target.value })}
            className="w-full p-2 border mb-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={moa.status}
            onChange={(e) => setMoa({ ...moa, status: e.target.value })}
            className="w-full p-2 border mb-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-md mr-2"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-700 rounded-md disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMoa;