import React, { useState } from "react";
import axios from "axios";

const AddHTE = ({ isOpen, onClose, onHTEAdded }) => {
  const [newHTE, setNewHTE] = useState({
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
    status: "Active"
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
  
  const validateForm = () => {
    const requiredFields = [
      'company_name', 
      'year_submitted', 
      'business_type', 
      'moa_status', 
      'contact_person', 
      'contact_number', 
      'year_included', 
      'position_department', 
      'email_address', 
      'office_address'
    ];
    const missingFields = requiredFields.filter(field => !newHTE[field]);
    
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
      const response = await axios.post(
        "http://localhost:3001/api/hte/addHte",
        newHTE
      );

      if (response.status === 201) {
        onHTEAdded(response.data);
        setNewHTE({
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
          status: "Active"
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding hte:", error);
      setError(error.response?.data?.error || "Failed to add hte");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 sm:mt-0 mt-20">
      <div className="bg-white p-6 rounded-lg w-full  sm:w-10/12 md:w-8/12 lg:w-6/12 max-h-[85vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New HTE</h2>
  
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
              value={newHTE.company_name}
              onChange={(e) => setNewHTE({ ...newHTE, company_name: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Name"
            />
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Year Submitted</label>
              <input
                type="text"
                value={newHTE.year_submitted}
                onChange={(e) => setNewHTE({ ...newHTE, year_submitted: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Year Submitted"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                value={newHTE.business_type}
                onChange={(e) => setNewHTE({ ...newHTE, business_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Business Type"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Status</label>
              <select
                value={newHTE.moa_status}
                onChange={(e) => setNewHTE({ ...newHTE, moa_status: e.target.value })}
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
                value={newHTE.contact_person}
                onChange={(e) => setNewHTE({ ...newHTE, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="number"
                value={newHTE.contact_number}
                onChange={(e) => setNewHTE({ ...newHTE, contact_number: e.target.value })}
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
                value={newHTE.position_department}
                onChange={(e) => setNewHTE({ ...newHTE, position_department: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Position or Department"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={newHTE.email_address}
                onChange={(e) => setNewHTE({ ...newHTE, email_address: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

         
          <div>
            <label className="text-sm font-medium text-gray-700">Office Address</label>
            <input
              type="text"
              value={newHTE.office_address}
              onChange={(e) => setNewHTE({ ...newHTE, office_address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Office Address"
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={newHTE.remarks}
              onChange={(e) => setNewHTE({ ...newHTE, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Course</label>
              <input
                type="text"
                value={newHTE.course}
                onChange={(e) => setNewHTE({ ...newHTE, course: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Course"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">College</label>
              <input
                type="text"
                value={newHTE.college}
                onChange={(e) => setNewHTE({ ...newHTE, college: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="College"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">Campus</label>
              <select
                value={newHTE.campus}
                onChange={(e) => setNewHTE({ ...newHTE, campus: e.target.value })}
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
                type="text"
                value={newHTE.year_included}
                onChange={(e) => setNewHTE({ ...newHTE, year_included: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Year Included"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">MOA Date Notarized</label>
              <input
                type="date"
                value={newHTE.with_moa_date_notarized}
                onChange={(e) => setNewHTE({ ...newHTE, with_moa_date_notarized: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>
  
            <div>
              <label className="text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={newHTE.expiry_date}
                onChange={(e) => setNewHTE({ ...newHTE, expiry_date: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              />
            </div>
          </div>
        </div>
  
        <div className="flex justify-end mt-6 space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50">
              Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Save
            </button>
        </div>
      </div>
    </div>
  );
  
};

export default AddHTE;
