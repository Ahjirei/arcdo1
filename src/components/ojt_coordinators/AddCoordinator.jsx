import React from "react";

const AddCoordinator = ({ isOpen, onClose, newCoordinator, setNewCoordinator, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Coordinator</h2>
        
        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Name
            </label>
            <input
            type="text"
            value={newCoordinator.name}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, name: e.target.value })}
            className="w-full p-2 border mb-2"
            placeholder="Edwin Berico"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Status
            </label>
            <select
            value={newCoordinator.campus}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, campus: e.target.value })}
            className="w-full p-2 border mb-2"
            >
            <option value="">Select Campus</option>
            <option value="Main">Main</option>
            <option value="West">West</option>
            <option value="East">East</option>
            <option value="South">South</option>
            </select>
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Email
            </label>
            <input
            type="text"
            value={newCoordinator.contact}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, contact: e.target.value })}
            className="w-full p-2 border mb-2"
            placeholder="edwinberico@pup.edu.ph"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                College
            </label>
            <input
            type="text"
            value={newCoordinator.college}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, college: e.target.value })}
            className="w-full p-2 border mb-2"
            placeholder="College"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Office
            </label>
            <input
            type="text"
            value={newCoordinator.office}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, office: e.target.value })}
            className="w-full p-2 border mb-2"
            placeholder="Room 100"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Assigned Students
            </label>
            <input
            type="number"
            value={newCoordinator.assignedStudents}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, assignedStudents: e.target.value })}
            className="w-full p-2 border mb-2"
            placeholder="355"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Status
            </label>
            <select
            value={newCoordinator.status}
            onChange={(e) => setNewCoordinator({ ...newCoordinator, status: e.target.value })}
            className="w-full p-2 border mb-2"
            >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Retired">Retired</option>
            </select>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 border rounded-md mr-2">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 text-white bg-blue-700 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoordinator;