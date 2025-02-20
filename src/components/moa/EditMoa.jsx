import React, { useState } from "react";

const EditMoa = ({ isOpen, onClose, moaData }) => {
  const [moa, setmoa] = useState(moaData || {
    company_name: "",
    year_moa_started: "",
    business_type: "",
    moa_status: "Processing",
    contact_person: "",
    contact_number: "",
    remarks: "",
    email_address: "",
    office_address: "",
    with_moa_date_notarized: "",
    expiry_date: "",
    status: "Active",
    moa_type: "",
    draft_moa_sent: ""
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    const requiredFields = [
      'company_name', 'year_moa_started', 'business_type', 'moa_status', 'contact_person','moa_type', 'draft_moa_sent', 
      'contact_number','remarks', 'email_address', 'office_address' ,'with_moa_date_notarized', 'expiry_date' 
    ];
    const missingFields = requiredFields.filter(field => !moa[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    setError("");
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 sm:mt-0 mt-20">
      <div className="bg-white p-6 rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[85vh] overflow-auto">
      <h2 className="text-xl font-semibold mb-4 items-center">Edit MOA</h2>
        
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
              value={moa.company_name}
              onChange={(e) => setmoa({ ...moa, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Moa Type</label>
              <input
                type="text"
                value={moa.moa_type}
                onChange={(e) => setmoa({ ...moa, moa_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Telephone Number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Draft of Moa sent</label>
              <input
                type="text"
                value={moa.draft_moa_sent}
                onChange={(e) => setmoa({ ...moa, draft_moa_sent: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Draft of Moa sent"
              />
            </div>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
              <label className="text-sm font-medium text-gray-700">MOA Validity</label>
              <select
                value={moa.moa_status}
                onChange={(e) => setmoa({ ...moa, moa_status: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="Processing">Processing</option>
                <option value="On Hold">On Hold</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
                <option value="For Renewal">For Renewal</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                value={moa.business_type}
                onChange={(e) => setmoa({ ...moa, business_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Business Type"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                value={moa.contact_person}
                onChange={(e) => setmoa({ ...moa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={moa.contact_number}
                onChange={(e) => setmoa({ ...moa, contact_number: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={moa.email_address}
                onChange={(e) => setmoa({ ...moa, email_address: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="email@domain.com"
              />
            </div>
            </div>
          

          <div>
            <label className="text-sm font-medium text-gray-700">Office Address</label>
            <input
              type="text"
              value={moa.office_address}
              onChange={(e) => setmoa({ ...moa, office_address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={moa.remarks}
              onChange={(e) => setmoa({ ...moa, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>
        </div>

       



        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
            <label className="text-sm font-medium text-gray-700">
              Moa Year Started
            </label>
            <input
              type="text"
              value={moa.year_moa_started}
              onChange={(e) => setmoa({ ...moa, year_moa_started: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Moa Year Started"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              MOA Date Notarized
            </label>
            <input
              type="date"
              value={moa.with_moa_date_notarized}
              onChange={(e) => setmoa({ ...moa, with_moa_date_notarized: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              value={moa.expiry_date}
              onChange={(e) => setmoa({ ...moa, expiry_date: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (validateForm()) {
                onSave(moa);
              }
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMoa;
