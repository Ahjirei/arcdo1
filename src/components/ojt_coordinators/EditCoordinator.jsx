import React from "react";

const EditCoordinator = ({ isOpen, onClose, editingCoordinator, setEditingCoordinator, onSave }) => {
  if (!isOpen || !editingCoordinator) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Coordinator</h2>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Name
            </label>
            <input
            type="text"
            value={editingCoordinator.name}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, name: e.target.value })}
            className="w-full p-2 border mb-2"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Campus
            </label>
            <select
            value={editingCoordinator.campus}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, campus: e.target.value })}
            className="w-full p-2 border mb-2"
            >
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
            value={editingCoordinator.contact}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, contact: e.target.value })}
            className="w-full p-2 border mb-2"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                College
            </label>
            <input
            type="text"
            value={editingCoordinator.college}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, college: e.target.value })}
            className="w-full p-2 border mb-2"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Office
            </label>
            <input
            type="text"
            value={editingCoordinator.office}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, office: e.target.value })}
            className="w-full p-2 border mb-2"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Assigned Students
            </label>
            <input
            type="number"
            value={editingCoordinator.assignedStudents}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, assignedStudents: parseInt(e.target.value) })}
            className="w-full p-2 border mb-2"
            />
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Status
            </label>
            <select
            value={editingCoordinator.status}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, status: e.target.value })}
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

export default EditCoordinator;