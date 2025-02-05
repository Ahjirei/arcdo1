import React, { useState } from "react";

const EditHTE = ({ isOpen, onClose, hteData }) => {
  const [hte, setHTE] = useState(hteData || {
    company_name: "",
    year_submitted: "",
    business_type: "",
    moa_status: "Processing",
    contact_person: "",
    contact_number: "",
    remarks: "",
    year_included: "",
    position_department: "",
    course: "",
    campus: "",
    college: "",
    email_address: "",
    office_address: "",
    with_moa_date_notarized: "",
    expiry_date: "",
    assigned_student: "",
    status: "Active"
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    const requiredFields = [
      'company_name', 'year_submitted', 'business_type', 'moa_status', 'contact_person', 'contact_number', 
      'remarks', 'year_included', 'position_department', 'course', 'campus', 'college', 'email_address', 
      'office_address', 'assigned_student'
    ];
    const missingFields = requiredFields.filter(field => !hte[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    setError("");
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white ml-10 p-6 rounded-lg w-8/12 h-[80%] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 items-center">Edit HTE</h2>
        
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
              value={hte.company_name}
              onChange={(e) => setHTE({ ...hte, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>

          <div className="flex flex-row gap-10 items-center justify-items-stretch">
            <div>
              <label className="text-sm font-medium text-gray-700">Year Submitted</label>
              <input
                type="text"
                value={hte.year_submitted}
                onChange={(e) => setHTE({ ...hte, year_submitted: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Year Submitted"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                value={hte.business_type}
                onChange={(e) => setHTE({ ...hte, business_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Business Type"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Status</label>
              <select
                value={hte.moa_status}
                onChange={(e) => setHTE({ ...hte, moa_status: e.target.value })}
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

          <div className="flex flex-row gap-10 items-center justify-items-stretch">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                value={hte.contact_person}
                onChange={(e) => setHTE({ ...hte, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={hte.contact_number}
                onChange={(e) => setHTE({ ...hte, contact_number: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={hte.remarks}
              onChange={(e) => setHTE({ ...hte, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700">
              Course
            </label>
            <input
              type="text"
              value={hte.course}
              onChange={(e) => setHTE({ ...hte, course: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Course"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Campus
            </label>
            <select
              value={hte.campus}
              onChange={(e) => setHTE({ ...hte, campus: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
            >
              <option value="">Select Campus</option>
              <option value="Main">PUP Main</option>
              <option value="Taguig">PUP Taguig</option>
              <option value="Quezon City">PUP Quezon City</option>
              <option value="San Juan">PUP San Juan</option>
              <option value="Paranaque">PUP Paranaque</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              College
            </label>
            <input
              type="text"
              value={hte.college}
              onChange={(e) => setHTE({ ...hte, college: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="College"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Office Address
            </label>
            <input
              type="text"
              value={hte.office_address}
              onChange={(e) => setHTE({ ...hte, office_address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>

        <div className="flex flex-row gap-10 items-center justify-items-stretch">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Year Included
            </label>
            <input
              type="text"
              value={hte.year_included}
              onChange={(e) => setHTE({ ...hte, year_included: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Year Included"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              MOA Date Notarized
            </label>
            <input
              type="date"
              value={hte.with_moa_date_notarized}
              onChange={(e) => setHTE({ ...hte, with_moa_date_notarized: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              value={hte.expiry_date}
              onChange={(e) => setHTE({ ...hte, expiry_date: e.target.value })}
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
                onSave(hte);
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

export default EditHTE;
