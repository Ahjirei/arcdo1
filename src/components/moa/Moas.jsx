import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, FilePenLine, MoreVertical, PlusCircle } from "lucide-react";
import AddMoa from "../moa/AddMoa";
import EditMoa from "../moa/EditMoa";
import { useLocation } from "react-router-dom";

export default function Moa() {
  const [moa, setMoa] = useState([]);
  const [editingMoa, setEditingMoa] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    date: "",
    business: "",
    moa_status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";
  const searchId = location.state?.searchId || ""; // Get ID from search query
  const [displayedMoa, setDisplayedMoa] = useState([]); 

  const [newMoa, setNewMoa] = useState({
      company_name: "",
      year_moa_started: "",
      business_type: "",
      moa_status: "Active",
      contact_person: "",
      contact_no: "",
      remarks: "",
      email: "",
      address: "",
      date_notarized: "",
      expiration_date: "",
      type_of_moa: "",
      moa_draft_sent: "",
      validity: "Processing"
    });

  useEffect(() => {
      fetchMoa();
    }, []);
  
  useEffect(() => {
    if (searchQuery || searchId) {
      // Show only the matching entry (just like the business type filter)
      setDisplayedMoa(
        moa.filter(item =>
          item.id.toString() === searchId.toString() || 
          item.company_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setDisplayedMoa(moa); // Show all data when there's no search
    }
  }, [searchQuery, searchId, moa]);

  // Fetch MoA data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchMoa();
      } catch (error) {
        console.error("Error fetching moa:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const fetchMoa = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/moa/getMoa"
      );
      setMoa(response.data);
    } catch (error) {
      console.error("Error fetching moa:", error);
    }
  };

  const handleEdit = (moa) => {
    setEditingMoa(moa);
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/moa/deleteMoa/${id}`);
      fetchMoa();
      setOpenDropdown(null);
    } catch (err) {
      console.error("Error deleting Moa:", err);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const MoaPerPage = 5;

  // Filter data based on the selected filters.
  // For the "date" filter, we compare the year of the 'moaStarted' field.
  const filteredMoa = moa.filter((moa) => {
    const matchesDate = filters.date
      ? moa.year_moa_started === filters.date
      : true;
    const matchesBusiness = filters.business
      ? moa.business_type?.toLowerCase().includes(filters.business.toLowerCase())
      : true;
    const matchesValidity = filters.moa_status 
      ? moa.moa_status === filters.moa_status 
      : true;

    return matchesDate && matchesBusiness && matchesValidity;
  });

  const totalPages = Math.ceil(filteredMoa.length / MoaPerPage);
  const startIndex = (currentPage - 1) * MoaPerPage;
  const endIndex = startIndex + MoaPerPage;
  const currentData = filteredMoa.slice(startIndex, endIndex);

  const handleNext = () => {
    const totalPages = Math.ceil((searchQuery || searchId ? displayedMoa.length : filteredMoa.length) / MoaPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetFilters = () => {
    setFilters({ date: "", business: "", moa_status: "" });
    setCurrentPage(1);
  };

  const getValidityColor = (moa_status) => {
    switch (moa_status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Processing":
        return "bg-purple-100 text-purple-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      case "On Hold":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

 

  

  return (
    <div className="bg-gray-50 md:ml-[250px] mt-10 p-7 min-h-screen overflow-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 mt-3 text-center sm:text-left">
        Memorandum of Agreement
      </h1>

      {/* Filter Section */}
      <div className="mb-3">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 bg-gray-50 border border-gray-200 rounded-lg p-3 w-full md:w-fit">
          <div className="flex items-center">
            <i className="fas fa-filter text-black mr-2"></i>
            <span className="text-sm text-black">Filter by</span>
          </div>
          <div className="hidden md:block h-6 border-r border-gray-300 mx-2"></div>
          <div className="md:ml-0 ml-auto">
            <DatePicker
              selected={filters.date ? new Date(filters.date) : null}
              onChange={(date) =>
                setFilters({ ...filters, date: date ? date.getFullYear().toString() : "" })
              }
              dateFormat="yyyy"
              showYearPicker
              className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              placeholderText="Select Year"
              customInput={
                <button className="flex items-center w-full md:w-auto px-3 py-2 border rounded-md">
                  {filters.date ? filters.date : "Select Year"}
                  <i className="ml-2 fas fa-chevron-down"></i>
                </button>
              }
            />
          </div>
          <input
            placeholder="Nature of Business"
            type="text"
            value={filters.business}
            onChange={(e) => setFilters({ ...filters, business: e.target.value })}
            className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
          />
          <select
            value={filters.moa_status}
            onChange={(e) => setFilters({ ...filters, moa_status: e.target.value })}
            className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
          >
            <option value="">MOA Validity</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="On Hold">On Hold</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="hidden md:block h-6 border-r border-gray-300 mx-2"></div>
          <button
            onClick={resetFilters}
            className="w-full sm:w-auto px-4 py-2 text-red-700 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <i className="fas fa-undo mr-2 text-red-700"></i>
            Reset Filters
          </button>
          <button
            onClick={() => {
              setEditingMoa(null);
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-2 text-blue-600 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Moa
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-grow h-full mt-1 overflow-x-auto">
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
          <table className="min-w-full h-auto border-collapse mt-3 hidden md:table">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center border-b">ID</th>
                <th className="px-4 py-2 text-center border-b">COMPANY NAME</th>
                <th className="px-4 py-2 text-center border-b">ADDRESS</th>
                <th className="px-2 py-2 text-center border-b">MOA STARTED</th>
                <th className="px-2 py-2 text-center border-b">MOA NOTORIZED</th>
                <th className="px-2 py-2 text-center border-b">MOA DRAFT SENT</th>
                <th className="px-2 py-2 text-center border-b">EXPIRY DATE</th>
                <th className="px-4 py-2 text-center border-b">TYPE OF MOA</th>
                <th className="px-4 py-2 text-center border-b">NATURE OF BUSINESS</th>
                <th className="px-4 py-2 text-center border-b border-r">MOA VALIDITY</th>
                <th className="px-4 py-2 text-center border-b">CONTACT PERSON</th>
                <th className="px-4 py-2 text-center border-b">CONTACT NUMBER</th>
                <th className="px-4 py-2 text-center border-b">EMAIL ADDRESS</th>
                <th className="px-2 py-2 text-center border-b">REMARKS</th>
                <th className="px-1 py-2 text-center border-b"></th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery || searchId ? displayedMoa : currentData).map((moa, index) => (
                <tr key={moa.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border-t">{moa.id}</td>
                  <td className="px-4 py-2 border-t">{moa.company_name}</td>
                  <td className="px-4 py-2 border-t">{moa.address}</td>
                  <td className="px-2 py-2 border-t">{new Date(moa.year_moa_started).toLocaleDateString("en-CA")}</td>
                  <td className="px-2 py-2 border-t">{moa.date_notarized}</td>
                  <td className="px-2 py-2 border-t">{moa.moa_draft_sent}</td>
                  <td className="px-2 py-2 border-t">{new Date(moa.expiration_date).toLocaleDateString("en-CA")}</td>
                  <td className="px-4 py-2 border-t">{moa.type_of_moa}</td>
                  <td className="px-4 py-2 border-t">{moa.business_type}</td>
                  <td className="px-4 py-2 border-t">
                    <span className={`rounded-full px-2 py-1 ${getValidityColor(moa.moa_status)}`}>
                      {moa.moa_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-t">{moa.contact_person}</td>
                  <td className="px-4 py-2 border-t">{moa.contact_no}</td>
                  <td className="px-4 py-2 border-t">{moa.email}</td>
                  <td className="px-2 py-2 border-t">{moa.remarks}</td>
                  <td className="px-1 py-2 border-t relative">
                    <button onClick={() => toggleDropdown(moa.id)} className="text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                    {openDropdown === moa.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                        <button
                          onClick={() => handleEdit(moa)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          <FilePenLine size={16} className="inline-block mr-2" />
                          Edit File
                        </button>
                        <button
                          onClick={() => handleDelete(moa.id)}
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

      {/* Modals for Adding and Editing */}
      <AddMoa
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onMoaAdded={() => {
          fetchMoa();
          setIsAddModalOpen(false);
        }}
      />
      
      <EditMoa
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMoa(null);
        }}
        editingMoa={editingMoa}
        setEditingMoa={setEditingMoa}
        onMoaEdited={() => {
          fetchMoa();
          setIsEditModalOpen(false);
          setEditingMoa(null);
        }}
      />

      {/* Mobile View */}
      <div className="md:hidden">
        {(searchQuery || searchId ? displayedMoa : currentData).map((moa, index) => (
          <div key={moa.id} className={`border border-black p-4 mb-4 relative ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 flex-1">
                <div className="font-bold">{moa.company_name}</div>
                <div className={`px-4 rounded-full py-1 ${getValidityColor(moa.moa_status)}`}>
                  {moa.moa_status}
                </div>
              </div>
              <div className="relative ml-4">
                <button onClick={() => toggleDropdown(moa.id)} className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical size={20} />
                </button>
                {openDropdown === moa.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={() => handleEdit(moa)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <FilePenLine size={16} className="inline-block mr-2" />
                      Edit File
                    </button>
                    <button
                      onClick={() => handleDelete(moa.id)}
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
              <strong>ID:</strong> {moa.id}
            </div>
            <div className="mt-2">
              <strong>Address:</strong> {moa.address}
            </div>
            <div className="mt-2">
              <strong>Nature of Business:</strong> {moa.business_type}
            </div>
            <hr className="my-2" />
            <div className="mt-2 text-center">
              <strong>MOA Details</strong>
            </div>
            <hr className="my-2" />
            <div className="mt-2">
              <strong>Moa Started:</strong> {new Date(moa.year_moa_started).toLocaleDateString("en-CA")}
            </div>
            <div className="mt-2">
              <strong>Moa Draft Sent:</strong> {moa.moa_draft_sent}
            </div>
            <div className="mt-2">
              <strong>Moa Notorized:</strong> {moa.date_notarized}
            </div>
            <div className="mt-2">
              <strong>Expiry Date:</strong> {new Date(moa.expiration_date).toLocaleDateString("en-CA")}
            </div>
            <div className="mt-2">
              <strong>Type of Moa:</strong> {moa.type_of_moa}
            </div>
            <hr className="my-2" />
            <div className="mt-2 text-center">
              <strong>Contact Details</strong>
            </div>
            <hr className="my-2" />
            <div className="mt-2">
              <strong>Contact Person:</strong> {moa.contact_person}
            </div>
            <div className="mt-2">
              <strong>Contact Number:</strong> {moa.contact_no}
            </div>
            <div className="mt-2">
              <strong>Email Address:</strong> {moa.email}
            </div>
            <div className="mt-2">
              <strong>Remarks:</strong> {moa.remarks}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-3">
        <div className="flex space-x-2">
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
            className="px-3 py-1 border rounded-lg hover:bg-gray-200"
          >
            →
          </button>
          <span className="text-gray-500 text-sm mt-2 md:mt-0">
            {searchQuery || searchId ? (
              <>
                Showing <b>{startIndex + 1}</b> to <b>{Math.min(endIndex, displayedMoa.length)}</b> of <b>{displayedMoa.length}</b> results for your search.
              </>
            ) : (
              <>
                Showing <b>{startIndex + 1}</b> to <b>{Math.min(endIndex, filteredMoa.length)}</b> of <b>{filteredMoa.length}</b>
              </>
            )}
        </span>
        </div>
      </div>
    </div>
  );
}