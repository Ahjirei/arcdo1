import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, FilePenLine, MoreVertical, PlusCircle } from "lucide-react";
import AddCoordinator from "../ojt_coordinators/AddCoordinator";
import EditCoordinator from "../ojt_coordinators/EditCoordinator";

export default function OJTCoordinators() {
  const [coordinators, setCoordinators] = useState([]);
  const [editingCoordinator, setEditingCoordinator] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ campus: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

   // Close dropdown when clicking outside
   useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  
  const [newCoordinator, setNewCoordinator] = useState({
    name: '',
    campus: '',
    contact: '',
    college: '',
    office: '',
    assigned_student: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchCoordinators();
      } catch (error) {
        console.error("Error fetching coordinators:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const fetchCoordinators = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/coordinator/getCoordinators"
      );
      setCoordinators(response.data);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    }
  };
  

  
  

  const handleEdit = (coordinator) => {
    setEditingCoordinator({ ...coordinator });
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/coordinator/deleteCoordinator/${id}`);
      fetchCoordinators();
      setOpenDropdown(null);
    } catch (error) {
      console.error("Error deleting coordinator:", error);
    }
  };
  


  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const itemsPerPage = 5;
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
        return "bg-green-100 text-green-600 ";
      case "On Leave":
        return "bg-yellow-100 text-yellow-600 px-0.5";
      case "Retired":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  


  return (
    <div className="bg-gray-50 md:ml-[250px] mt-10 p-7 min-h-screen overflow-hidden">
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
              <option value="Main">PUP Main</option>
              <option value="Taguig">PUP Taguig</option>
              <option value="Quezon City">PUP Quezon City</option>
              <option value="San Juan">PUP San Juan</option>
              <option value="Paranaque">PUP Parañaque</option>
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
            onClick={() => {
              setEditingCoordinator(null);
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-2 text-blue-600 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Coordinator
          </button>

        </div>
      </div>
     
      {/* Table Section */}
      <div className="flex-grow h-full mt-1 overflow-x-auto overflow-y-hidden">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-lg font-semibold text-gray-700">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="min-w-full h-auto border-collapse mt-3 hidden md:table text-center">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="px-4 py-2 text-center border-b">NAME</th>
                <th className="px-4 py-2 text-center border-b">CAMPUS</th>
                <th className="px-4 py-2 text-center border-b">COLLEGE</th>
                <th className="px-4 py-2 text-center border-b">EMAIL</th>
                <th className="px-4 py-2 text-center border-b">OFFICE</th>
                <th className="px-4 py-2 text-center border-b">ASSIGNED STUDENTS</th>
                <th className="px-4 py-2 text-center ">STATUS</th>
                <th className="px-4 py-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {currentCoordinators.map((coordinator, index) => (

                <tr
                  key={coordinator.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border-t">{coordinator.name}</td>
                  <td className="px-4 py-2 border-t">{coordinator.campus}</td>
                  <td className="px-4 py-2 border-t">{coordinator.college}</td>
                  <td className="px-4 py-2 border-t">{coordinator.email}</td>
                  <td className="px-4 py-2 border-t">{coordinator.office}</td>
                  <td className="px-4 py-2 border-t">{coordinator.assigned_student}</td>
                  <td className=' px-2 py-2 border-t text-center block md:table-cell'>
                    <span className={`rounded-full py-2 px-2 ${getStatusColor(coordinator.status)}`}>
                    {coordinator.status}</span>
                  </td>
                  <td className="px-6 py-2 border-t relative" ref={dropdownRef}>
                    <button onClick={() => toggleDropdown(coordinator.id)} className="text-gray-600">
                      <MoreVertical size={20} />
                    </button>

                    {openDropdown === coordinator.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 bottom-0">
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

        )}
      </div>

      <AddCoordinator
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCoordinatorAdded={() => {
          fetchCoordinators();
          setIsAddModalOpen(false);
        }}
      />

      <EditCoordinator 
        isEditModalOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCoordinator(null);
        }} 
        editingCoordinator={editingCoordinator} 
        setEditingCoordinator={setEditingCoordinator}
        onCoordinatorEdited={() => {
          fetchCoordinators();
          setIsEditModalOpen(false);
          setEditingCoordinator(null);
        }}
      />



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
              <strong>Contact:</strong> {coordinator.email}
            </div>
            <div className="mt-2">
              <strong>Office:</strong> {coordinator.office}
            </div>
            <div className="mt-2">
              <strong>Assigned Students:</strong> {coordinator.assigned_student}
            </div>
          </div>
        ))}
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