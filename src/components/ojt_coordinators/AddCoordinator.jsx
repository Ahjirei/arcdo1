import React, { useState } from "react";
import axios from "axios";

const AddCoordinator = ({ isOpen, onClose, onCoordinatorAdded }) => {
  const [newCoordinator, setNewCoordinator] = useState({
    name: "",
    campus: "",
    email: "",
    college: "",
    office: "",
    assigned_student: "",
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
    const requiredFields = ['name', 'campus', 'email', 'college', 'office', 'assigned_student'];
    const missingFields = requiredFields.filter(field => !newCoordinator[field]);
    
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
        "http://localhost:3001/api/coordinator/addCoordinator",
        newCoordinator
      );

      if (response.status === 201) {
        onCoordinatorAdded(response.data);
        setNewCoordinator({
          name: "",
          campus: "",
          email: "",
          college: "",
          office: "",
          assigned_student: "",
          status: "Active"
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding coordinator:", error);
      setError(error.response?.data?.error || "Failed to add coordinator");
    }
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:top-0 top-16">
<div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Coordinator</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newCoordinator.name}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Edwin Berico"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Campus
            </label>
            <select
              value={newCoordinator.campus}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, campus: e.target.value })}
              className="w-full p-2 border rounded"
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
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={newCoordinator.email}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, email: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="edwinberico@pup.edu.ph"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              College
            </label>
            <input
              type="text"
              value={newCoordinator.college}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, college: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="College"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Office
            </label>
            <input
              type="text"
              value={newCoordinator.office}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, office: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Room 100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Assigned Students
            </label>
            <input
              type="number"
              value={newCoordinator.assigned_student}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, assigned_student: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="355"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={newCoordinator.status}
              onChange={(e) => setNewCoordinator({ ...newCoordinator, status: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Retired">Retired</option>
            </select>
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
            onClick={handleSave} 
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoordinator;