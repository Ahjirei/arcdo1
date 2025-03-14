import React, { useState, useEffect } from "react";
import { Upload, FileText } from "lucide-react";

const EditMoa = ({ isOpen, onClose, editingMoa, setEditingMoa, onMoaEdited }) => {
  const [dragActive, setDragActive] = useState(false);
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

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError("");

      const formatDate = (date) => {
        if (!date || date === "null" || date === "") return null;
        return new Date(date).toISOString().split("T")[0];
      };     
      
      const response = await fetch(`http://localhost:3001/api/moa/updateMoa/${editingMoa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: editingMoa.company_name,
          address: editingMoa.address,
          year_moa_started: formatDate(editingMoa.year_moa_started),
          business_type: editingMoa.business_type,
          moa_status: editingMoa.moa_status,
          contact_person: editingMoa.contact_person,
          contact_no: editingMoa.contact_no,
          email: editingMoa.email,
          remarks: editingMoa.remarks,
          expiration_date: formatDate(editingMoa.expiration_date),
          type_of_moa: editingMoa.type_of_moa,
          validity: editingMoa.validity,
          date_notarized: editingMoa.date_notarized
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update MOA');
      }

      onMoaEdited();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingMoa({ ...editingMoa, file });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditingMoa({ ...editingMoa, file });
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
            <label className="text-sm font-extrabold text-gray-700">Company Name</label>
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
              <label className="text-sm  text-gray-700 font-extrabold">Type of MOA</label>
              <select
                value={editingMoa.type_of_moa}
                onChange={(e) => setEditingMoa({ ...editingMoa, type_of_moa: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
              >
                <option value="" disabled>Select Type of MOA</option>
                <option value="Practicum">Practicum</option>
                <option value="Research">Research</option>
                <option value="Employment">Employment</option>
                <option value="Scholarship">Scholarship</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-extrabold text-gray-700">Nature of Business</label>
              <input
                type="text"
                value={editingMoa.business_type}
                onChange={(e) => setEditingMoa({ ...editingMoa, business_type: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Nature of Business"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-extrabold text-gray-700">Company Address</label>
            <input
              type="text"
              value={editingMoa.address}
              onChange={(e) => setEditingMoa({ ...editingMoa, address: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Company Address"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-extrabold text-gray-700">Contact Person Full Name</label>
              <input
                type="text"
                value={editingMoa.contact_person}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person Full Name"
              />
            </div>

            <div>
              <label className="text-sm font-extrabold text-gray-700">Contact Number</label>
              <input
                type="text"
                value={editingMoa.contact_no}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_no: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Number"
              />
            </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-extrabold text-gray-700">Contact Person Position</label>
              <input
                type="text"
                value={editingMoa.contact_person}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Contact Person Position"
              />
            </div>

            <div>
              <label className="text-sm font-extrabold text-gray-700">Email Address</label>
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
              <label className="text-sm font-extrabold text-gray-700">MOA Status</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
              <label className="text-sm font-extrabold text-gray-700">Validity</label>
              <input
                type="text"
                value={editingMoa.contact_person}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Validity Period"
              />
            </div>

            <div>
              <label className="text-sm font-extrabold text-gray-700">MOA Date Notarized</label>
              <input
                type="date"
                value={editingMoa.date_notarized 
                  ? new Date(editingMoa.date_notarized).toISOString().split("T")[0] 
                  : ""}
                onChange={(e) =>
                  setEditingMoa({ ...editingMoa, date_notarized: parseInt(e.target.value, 10)})
                }
                min="1900" max="2100"
                className="w-full p-2 border rounded border-gray-500"
              />

            </div>

            <div>
              <label className="text-sm font-extrabold text-gray-700">Expiry Date</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <label className="text-sm font-extrabold text-gray-700">Branch</label>
          <select value={editingMoa.moa_status}
                onChange={(e) => setEditingMoa({ ...editingMoa, moa_status: e.target.value })}
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

          <div>
              <label className="text-sm font-extrabold text-gray-700">Course</label>
              <input
                type="text"
                value={editingMoa.contact_person}
                onChange={(e) => setEditingMoa({ ...editingMoa, contact_person: e.target.value })}
                className="w-full p-2 border rounded border-gray-500"
                placeholder="Course"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-extrabold text-gray-700">Remarks</label>
            <textarea
              value={editingMoa.remarks}
              onChange={(e) => setEditingMoa({ ...editingMoa, remarks: e.target.value })}
              className="w-full p-2 border rounded border-gray-500"
              placeholder="Remarks"
            />
          </div>
        </div>

 {/* Upload File Section with Drag and Drop */}
 <div
        className={`border-2 border-dashed mt-4 rounded-lg p-6 text-center cursor-pointer transition-all ${
          dragActive ? "border-maroon-500 bg-maroon-50" : "border-gray-300 hover:border-maroon-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
        
        {editingMoa.file ? (
          <div className="flex items-center justify-center space-x-2">
            <FileText size={24} className="text-maroon-600" />
            <p className="text-gray-700 text-sm font-medium">{editingMoa.file.name}</p>
          </div>
        ) : (
          <label htmlFor="fileInput" className="flex flex-col items-center space-y-2">
            <Upload size={32} className="text-gray-500" />
            <p className="text-gray-600 text-sm">
              Drag & drop a file here, or <span className="text-maroon-600 font-semibold cursor-pointer">click to browse</span>
            </p>
            <p className="text-xs text-gray-400">Accepted formats: PDF, DOCX, JPG, PNG</p>
          </label>
        )}
      </div>

        {/* NDA Checkbox */}
        <div className="flex items-center mt-2 space-x-2">
              <input
                type="checkbox"
                id="hasNDA"
                name="hasNDA"
                className="w-4 h-4 text-maroon border-gray-300 rounded focus:ring-maroon"
              />
              <label htmlFor="hasNDA" className="font-medium text-gray-700 text-sm sm:text-base">
                Has Non-Disclosure Agreement (NDA)
              </label>
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