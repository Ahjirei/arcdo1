import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { Trash2, FilePenLine, MoreVertical, PlusCircle } from "lucide-react";
import AddHTE from "../hte/AddHTE";
import EditHTE from "../hte/EditHTE";



export default function HTEDashboard() {

  const [hte, sethte] = useState([ ]);
  const [editingHTE, setEditingHTE] = useState(null);
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

  const [newHTE, setNewHTE] = useState({
      company_name: '',
      year_submitted: '',
      business_type: '',
      moa_status: 'Processing',
      contact_person: '',
      contact_number: '',
      remarks: '',
      year_included: '',
      position_department: '',
      course: '',
      campus: '',
      college: '',
      email_address: '',
      office_address: '',
      with_moa_date_notarized: '',
      expiry_date: '',
      status: 'Active'
    });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchHte();
      } catch (error) {
        console.error("Error fetching hte:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const fetchHte = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/hte/getHte"
      );
      sethte(response.data);
    } catch (error) {
      console.error("Error fetching hte:", error);
    }
  };

  const handleEdit = (hte) => {
    setEditingHTE({...hte}); 
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/hte/deleteHte/${id}`);
      fetchHte();
      setOpenDropdown(null);
    } catch (error) {
      console.error("Error deleting hte:", error);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const htesPerPage = 5;

  // Apply filters
  const filteredHte = hte.filter((hte) => {
    const matchesDate = filters.date
      ? hte.year_submitted === filters.date  // Compare exact year
      : true;
    const matchesBusiness = filters.business
      ? hte.business_type.toLowerCase().includes(filters.business.toLowerCase())
      : true;
    const matchesValidity = filters.moa_status
      ? hte.moa_status === filters.moa_status
      : true;

    return matchesDate && matchesBusiness && matchesValidity;
  });

  const totalPages = Math.ceil(filteredHte.length / htesPerPage);
  const startIndex = (currentPage - 1) * htesPerPage;
  const endIndex = startIndex + htesPerPage;
  const currentHte = filteredHte.slice(startIndex, endIndex);

  const handleNext = () => {
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
        Host Training Establishments
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
              onChange={(date) => setFilters({ ...filters, date: date ? date.getFullYear().toString() : "" })}
              dateFormat="yyyy"
              showYearPicker
              className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              placeholderText="Select Year"
              customInput={
                <button className="flex htes-center w-full md:w-auto px-3 py-2 border rounded-md justify-end sm:justify-start">
                  {filters.date ? filters.date : 'Select Year'}
                  <i className="ml-2 fas fa-chevron-down"></i>
                </button>
              }
            />
            </div>

        {/* Business Filter */}
        <input
          placeholder="Nature of Business"
          type="text"
          value={filters.business}
          onChange={(e) => setFilters({ ...filters, business: e.target.value })}
          className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
        />

        {/* Validity Filter */}
        <select
          value={filters.moa_status}
          onChange={(e) => setFilters({ ...filters, moa_status: e.target.value })}
          className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
        >
          <option value="" disabled>MOA Validity</option>
          <option value="Completed">Completed</option>
          <option value="Processing">Processing</option>
          <option value="On Hold">On Hold</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Divider (Visible only on larger screens) */}
        <div className="hidden md:block h-6 border-r border-gray-300 mx-2"></div>

        {/* Reset Filters Button */}
        <button onClick={resetFilters} 
        className="w-full sm:w-auto px-4 py-2 text-red-700 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center">
          <i className="fas fa-undo mr-2 text-red-700"></i>
          Reset Filters
        </button>

        <button
            onClick={() => {
              setEditingHTE(null);
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-2 text-blue-600 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add HTE
          </button>

        </div>
      </div>

      {/* Table Section */}
    <div className="flex-grow h-full mt-1 overflow-x-auto">
      {/* Responsive Wrapper for Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full h-auto border-collapse mt-3 hidden md:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center border-b">ID</th>
              <th className="px-4 py-2 text-center border-b">COMPANY NAME</th>
              <th className="px-4 py-2 text-center border-b">COURSE</th>
              <th className="px-4 py-2 text-center border-b">COLLEGE</th>
              <th className="px-4 py-2 text-center border-b">CAMPUS</th>
              <th className="px-2 py-2 text-center border-b">YEAR SUBMITTED</th>
              <th className="px-2 py-2 text-center border-b">MOA NOTORIZED</th>
              <th className="px-2 py-2 text-center border-b">EXPIRY DATE</th>
              <th className="px-4 py-2 text-center border-b">NATURE OF BUSINESS</th>
              <th className="px-4 py-2 text-center border-b border-r">MOA VALIDITY</th>
              <th className="px-4 py-2 text-center border-b">CONTACT PERSON</th>
              <th className="px-4 py-2 text-center border-b">CONTACT NUMBER</th>
              <th className="px-2 py-2 text-center border-b">YEAR INCLUDED</th>
              <th className="px-4 py-2 text-center border-b">POSITION</th>
              <th className="px-4 py-2 text-center border-b">EMAIL ADDRESS</th>
              <th className="px-4 py-2 text-center border-b">OFFICE ADDRESS</th>
              <th className="px-2 py-2 text-center border-b">REMARKS</th>
              <th className="px-1 py-2 text-center border-b"></th>
              
            </tr>
          </thead>
          <tbody>
            {currentHte.map((hte, index) => (
              <tr 
                key={hte.id} 
                className={`md:table-row block w-full ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                
                <td className="px-4 py-2 border-t block md:table-cell">{hte.id}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.company_name}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.course}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.college}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.campus}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.year_submitted}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{new Date(hte.with_moa_date_notarized).toLocaleDateString("en-CA")}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{new Date(hte.expiry_date).toLocaleDateString("en-CA")}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.business_type}</td>
                <td className="px-4 py-2 border-t block md:table-cell">
                  <span className={`rounded-full px-2 py-1 ${getValidityColor(hte.moa_status)}`}>
                    {hte.moa_status}
                  </span>
                </td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.contact_person}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.contact_number}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.year_ncluded}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.position_department}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.email_address}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.office_address}</td>
                <td className="px-4 py-2 border-t block md:table-cell">{hte.remarks}</td>

                <td className="px-6 py-2 border-t relative">
                  <button onClick={() => toggleDropdown(hte.id)} className="text-gray-600">
                    <MoreVertical size={20} />
                  </button>

                  {openDropdown === hte.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(hte)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <FilePenLine size={16} className="inline-block mr-2" />
                        Edit File
                      </button>
                      <button
                        onClick={() => handleDelete(hte.id)}
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
      </div>

       {/* Mobile View (Cards) */}
        <div className="md:hidden">
          {currentHte.map((hte, index) => (
            <div key={hte.id} className={`border border-black p-4 mb-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 flex-1">
                <div className="font-bold">{hte.company_name}</div>
                <div className={`px-3 rounded-full py-1 text-sm ${getValidityColor(hte.moa_status)}`}>
                  {hte.moa_status}
                </div>
              </div>
              
              <div className="relative ml-4">
                <button 
                  onClick={() => toggleDropdown(hte.id)} 
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical size={20} />
                </button>
                {openDropdown === hte.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                    <button
                      onClick={() => handleEdit(hte)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <FilePenLine size={16} className="inline-block mr-2" />
                      Edit File
                    </button>
                    <button
                      onClick={() => handleDelete(hte.id)}
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
                <strong>ID:</strong> {hte.id}
              </div>
              <div className="mt-2">
                <strong>Nature of Business:</strong> {hte.business_type}
              </div>
              <div className="mt-2">
                <strong>Course:</strong> {hte.course}
              </div>
              <div className="mt-2">
                <strong>College:</strong> {hte.college}
              </div>
              <div className="mt-2">
                <strong>Campus:</strong> {hte.campus}
              </div>
              <hr className="my-2" />
              <div className="mt-2 text-center">
                <strong>MOA</strong> 
              </div> <hr className="my-2" />
              <div className="mt-2">
                <strong>Year Included:</strong> {hte.yearIncluded}
              </div>
              <div className="mt-2">
                <strong>Year Submitted:</strong> {hte.yearSubmitted}
              </div>
              <div className="mt-2">
                <strong>Moa Notorized:</strong> {hte.moaNotorized}
              </div>
              <div className="mt-2">
                <strong>Expiry Date:</strong> {hte.expiryDate}
              </div>
              <hr className="my-2" />
              <div className="mt-2 text-center">
                <strong>Contact Person</strong> 
              </div> <hr className="my-2" />
              <div className="mt-2">
                <strong>Name:</strong> {hte.contactPerson}
              </div>
              <div className="mt-2">
                <strong>Contact Number:</strong> {hte.number}
              </div>
              <div className="mt-2">
                <strong>Email Address:</strong> {hte.email}
              </div>
              <div className="mt-2">
                <strong>Position:</strong> {hte.position}
              </div>
              <div className="mt-2">
                <strong>Office Address:</strong> {hte.officeAddress}
              </div>
              <div className="mt-2">
                <strong>Remarks:</strong> {hte.remarks}
              </div>
              
            </div>
          ))}
        </div>
      </div>


      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-3">
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevious} 
            disabled={currentPage === 1} 
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            ←
          </button>

          <button 
            onClick={handleNext} 
            disabled={currentPage === totalPages} 
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            →
          </button>
        

          <AddHTE
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onHTEAdded={() => {
              fetchHte();
              setIsAddModalOpen(false);
            }}
          />

          <EditHTE
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingHTE(null);
            }}
            editingHTE={editingHTE}
            setEditingHTE={setEditingHTE}
            onHteEdited={() => {
              fetchHte();
              setIsEditModalOpen(false);
              setEditingHTE(null);
            }}
          />

        {/* Showing Results Info */}
        <span className="text-gray-500 text-sm mt-2 md:mt-0">
          Showing <b>{startIndex + 1}</b> to <b>{Math.min(endIndex, filteredHte.length)}</b> of <b>{filteredHte.length}</b>
        </span>
      </div>
    </div>
  </div>
  

    
  );
  
}
