import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; 
import { Trash2, FilePenLine, MoreVertical, PlusCircle } from "lucide-react";

export default function OJTCoordinators() {
  const initialCoordinators = [
    { id: "001", name: "John Doe", campus: "Main", contact: "john.doe@example.com", college: "Engineering", office: "Room 101", assignedStudents: 25, status: "Active" },
    { id: "002", name: "Jane Smith", campus: "West", contact: "jane.smith@example.com", college: "Information Technology", office: "Room 201", assignedStudents: 18, status: "On Leave" },
    { id: "003", name: "Mark Lee", campus: "East", contact: "mark.lee@example.com", college: "Engineering", office: "Room 303", assignedStudents: 30, status: "Retired" },
    { id: "004", name: "Alice Brown", campus: "Main", contact: "alice.brown@example.com", college: "Engineering", office: "Room 102", assignedStudents: 22, status: "Active" },
    { id: "005", name: "Robert White", campus: "South", contact: "robert.white@example.com", college: "Engineering", office: "Room 104", assignedStudents: 15, status: "Active" },
  ];

  // Main state for coordinators data
  const [coordinators, setCoordinators] = useState(initialCoordinators);
  const [editingCoordinator, setEditingCoordinator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ campus: "" });
  
  const [newCoordinator, setNewCoordinator] = useState({
    name: '',
    campus: '',
    contact: '',
    college: '',
    office: '',
    assignedStudents: '',
    status: 'Active'
  });
  

  const handleEdit = (coordinator) => {
    setEditingCoordinator({...coordinator});
    setIsModalOpen(true);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setCoordinators(coordinators.filter((coordinator) => coordinator.id !== id));
    setOpenDropdown(null);
  };

  const handleSave = () => {
    setCoordinators(coordinators.map(coord => 
      coord.id === editingCoordinator.id ? editingCoordinator : coord
    ));
    setIsModalOpen(false);
    setEditingCoordinator(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const itemsPerPage = 8;
  const filteredCoordinators = coordinators.filter((coordinator) => {
    return filters.campus
      ? coordinator.campus.toLowerCase() === filters.campus.toLowerCase()
      : true;
  });

  const totalPages = Math.ceil(filteredCoordinators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoordinators = filteredCoordinators.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const resetFilters = () => {
    setFilters({ campus: "" });
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "On Leave":
        return "bg-yellow-100 text-yellow-600";
      case "Retired":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  

  return (
    <div className="bg-gray-50 md:ml-[250px] mt-10 p-7 min-h-screen overflow-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 mt-3 text-center sm:text-left">
        OJT Coordinators
      </h1>
      
      {/* Filter Section */}
      <div className="mb-3">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 bg-gray-50 border border-gray-200 rounded-lg p-2 w-full sm:w-fit">
          <div className="flex items-center">
            <i className="fas fa-filter text-black mr-2"></i>
            <span className="text-sm text-black">Filter by</span>
          </div>
          <div className="hidden sm:block h-6 border-r border-gray-300"></div>
          <div className="w-full sm:w-auto">
            <select
              value={filters.campus}
              onChange={(e) => setFilters({ campus: e.target.value })}
              className="w-full sm:min-w-[120px] px-3 py-2 border rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Campus</option>
              <option value="Main">Main</option>
              <option value="West">West</option>
              <option value="East">East</option>
              <option value="South">South</option>
            </select>
          </div>
          <div className="hidden sm:block h-6 border-r border-gray-300"></div>
          <button 
            onClick={resetFilters} 
            className="w-full sm:w-auto px-4 py-2 text-red-700 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <i className="fas fa-undo mr-2 text-red-700"></i>  
            Reset Filters
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-blue-600 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Coordinator
          </button>
        </div>
        </div>
     

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Add New Coordinator</h2>
      <div>
        <label htmlFor="ojtCoordinator.Name" className="block text-gray-700">Name</label>
      <input
        type="text"
        value={editingCoordinator?.name || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, name: e.target.value })}
        className="w-full p-2 border mb-2"
        placeholder="Name"
      />
      </div>
      <div>
      <label>Campus</label>
      <select
        value={editingCoordinator?.campus || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, status: e.target.value })}
        className="w-full p-2 border mb-2"
      >
        <option value="">Select</option>
        <option value="MAIN">PUP Main</option>
        <option value="TAGUIG">PUP Taguig</option>
        <option value="QUEZON CITY">PUP Quezon City</option>
        <option value="SAN JUAN">PUP San Juan</option>
        <option value="PARANAQUE ">PUP Paranaque</option>
      </select>
      </div>
      <div>
      <label>Email Address</label>
      <input
        type="text"
        value={editingCoordinator?.contact || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, contact: e.target.value })}
        className="w-full p-2 border mb-2"
        placeholder="Email"
      />
      </div>
      <div>
      <label>College</label>
      <input
        type="text"
        value={editingCoordinator?.college || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, college: e.target.value })}
        className="w-full p-2 border mb-2"
        placeholder="College"
      />
      </div>
      <div>
      <label>Office</label>
      <input
        type="text"
        value={editingCoordinator?.office || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, office: e.target.value })}
        className="w-full p-2 border mb-2"
        placeholder="Office"
      />
      </div>
      <div>
      <label>Assigned Students</label>
      <input
        type="number"
        value={editingCoordinator?.assignedStudents || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, assignedStudents: e.target.value })}
        className="w-full p-2 border mb-2"
        placeholder="Assigned Students"
      />
      </div>
      <div>
      <label>Status</label>
      <select
        value={editingCoordinator?.status || ''}
        onChange={(e) => setNewCoordinator({ ...newCoordinator, status: e.target.value })}
        className="w-full p-2 border mb-2"
      >
        <option value="">Select</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Retired">Retired</option>
      </select>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            setIsModalOpen(false);
            setEditingCoordinator(null); // Reset the form
          }}
          className="px-4 py-2 text-gray-700 border rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setCoordinators([...coordinators, { ...newCoordinator, id: String(coordinators.length + 1) }]);
            setIsModalOpen(false);
            setEditingCoordinator(null); // Reset the form
          }}
          className="px-4 py-2 text-white bg-blue-700 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {/* Table Section */}
      <div className="flex-grow h-full mt-1 overflow-x-auto">
        <table className="min-w-full h-auto border-collapse mt-3 hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="px-4 py-2 text-left border-b">ID</th>
              <th className="px-4 py-2 text-left border-b">NAME</th>
              <th className="px-4 py-2 text-left border-b">CAMPUS</th>
              <th className="px-4 py-2 text-left border-b">COLLEGE</th>
              <th className="px-4 py-2 text-left border-b">EMAIL</th>
              <th className="px-4 py-2 text-left border-b">OFFICE</th>
              <th className="px-4 py-2 text-left border-b">ASSIGNED STUDENTS</th>
              <th className="px-4 py-2 text-left border-b">STATUS</th>
              <th className="px-4 py-2 text-left border-b"></th>
            </tr>
          </thead>
          <tbody>
            {currentCoordinators.map((coordinator, index) => (

              <tr
                key={coordinator.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 border-t">{coordinator.id}</td>
                <td className="px-4 py-2 border-t">{coordinator.name}</td>
                <td className="px-4 py-2 border-t">{coordinator.campus}</td>
                <td className="px-4 py-2 border-t">{coordinator.college}</td>
                <td className="px-4 py-2 border-t">{coordinator.contact}</td>
                <td className="px-4 py-2 border-t">{coordinator.office}</td>
                <td className="px-4 py-2 border-t">{coordinator.assignedStudents}</td>
                <td className={`px-4 border-t rounded-full inline-block py-1 mt-1 mb-2 text-center ${getStatusColor(coordinator.status)}`}>
                  {coordinator.status}
                </td>
                <td className="px-6 py-2 border-t relative">
                  <button onClick={() => toggleDropdown(coordinator.id)} className="text-gray-600">
                    <MoreVertical size={20} />
                  </button>

                  {openDropdown === coordinator.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(coordinator)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <FilePenLine size={16} className="inline-block mr-2" />
                        Edit File
                      </button>
                      <button
                        onClick={() => handleDelete(coordinator.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 size={16} className="inline-block mr-2" />
                        Delete File
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       {/* mobile view section */}
        <div className="md:hidden">
          {currentCoordinators.map((coordinator, index) => (
            <div key={coordinator.id} className={`border border-gray-200 p-4 mb-4 relative ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="font-bold">{coordinator.name}</div>
                  <div className={`px-3 rounded-full py-1 text-sm ${getStatusColor(coordinator.status)}`}>
                    {coordinator.status}
                  </div>
                </div>
                <div className="relative ml-4">
                  <button 
                    onClick={() => toggleDropdown(coordinator.id)} 
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {openDropdown === coordinator.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(coordinator)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <FilePenLine size={16} className="inline-block mr-2" />
                        Edit File
                      </button>
                      <button
                        onClick={() => handleDelete(coordinator.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 size={16} className="inline-block mr-2" />
                        Delete File
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <strong>ID:</strong> {coordinator.id}
              </div>
              <div className="mt-2">
                <strong>Campus:</strong> {coordinator.campus}
              </div>
              <div className="mt-2">
                <strong>College</strong> {coordinator.college}
              </div>
              <div className="mt-2">
                <strong>Contact:</strong> {coordinator.contact}
              </div>
              <div className="mt-2">
                <strong>Office:</strong> {coordinator.office}
              </div>
              <div className="mt-2">
                <strong>Assigned Students:</strong> {coordinator.assignedStudents}
              </div>
            </div>
          ))}
        </div>


      {/* Edit Modal */}
      {isModalOpen && editingCoordinator && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Coordinator</h2>
            <input
              type="text"
              value={editingCoordinator.name}
              onChange={(e) => setEditingCoordinator({ ...editingCoordinator, name: e.target.value })}
              className="w-full p-2 border mb-2"
              placeholder="Name"
            />
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
            <input
              type="text"
              value={editingCoordinator.contact}
              onChange={(e) => setEditingCoordinator({ ...editingCoordinator, contact: e.target.value })}
              className="w-full p-2 border mb-2"
              placeholder="Contact Email"
            />
            <input
              type="text"
              value={editingCoordinator.office}
              onChange={(e) => setEditingCoordinator({ ...editingCoordinator, office: e.target.value })}
              className="w-full p-2 border mb-2"
              placeholder="Office"
            />
            <input
              type="number"
              value={editingCoordinator.assignedStudents}
              onChange={(e) => setEditingCoordinator({ ...editingCoordinator, assignedStudents: parseInt(e.target.value) })}
              className="w-full p-2 border mb-2"
              placeholder="Assigned Students"
            />
            <select
              value={editingCoordinator.status}
              onChange={(e) => setEditingCoordinator({ ...editingCoordinator, status: e.target.value })}
              className="w-full p-2 border mb-4"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Retired">Retired</option>
            </select>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-start items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg hover:bg-gray-200"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg hover:bg-gray-200 mr-2"
        >
          →
        </button>
        <span className="text-gray-500">
          Showing <b>{startIndex + 1}</b> to <b>{Math.min(endIndex, filteredCoordinators.length)}</b> of{" "}
          <b>{filteredCoordinators.length}</b>
        </span>
      </div>
    </div>

  );
}