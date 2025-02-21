import React, { useState, useEffect } from "react";

const EditCoordinator = ({ isEditModalOpen, onClose, editingCoordinator, setEditingCoordinator, onCoordinatorEdited }) => {
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

  if (!isEditModalOpen || !editingCoordinator) return null;

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`http://localhost:3001/api/coordinator/updateCoordinator/${editingCoordinator.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingCoordinator.name,
          campus: editingCoordinator.campus,
          email: editingCoordinator.email,
          college: editingCoordinator.college,
          office: editingCoordinator.office,
          assigned_student: editingCoordinator.assigned_student,
          status: editingCoordinator.status,
          updated_at: new Date().toISOString() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update coordinator');
      }

      onCoordinatorEdited();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Coordinator</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

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
            <label className="text-sm font-medium text-gray-700 flex justify-between">
                Email
            </label>
            <input
            type="text"
            value={editingCoordinator.email}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, email: e.target.value })}
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
            value={editingCoordinator.assigned_student}
            onChange={(e) => setEditingCoordinator({ ...editingCoordinator, assigned_student: parseInt(e.target.value) })}
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
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoordinator;