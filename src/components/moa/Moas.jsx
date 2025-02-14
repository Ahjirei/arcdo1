import React, { useState } from "react";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { Trash2, FilePenLine, MoreVertical, PlusCircle } from "lucide-react";
import AddMoa from "../moa/AddMoa";
import EditMoa from "../moa/EditMoa";


export default function Moas() {
  const allData = [
    { id: "00001", company: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "2019-09-04", business: "Electric", validity: "Active" },
    { id: "00002", company: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "2019-05-28", business: "Book", validity: "Inactive" },
    { id: "00003", company: "Jasmine Lee", address: "452 Main St. Suite 12", date: "2020-01-15", business: "Consulting", validity: "Active" },
    { id: "00004", company: "Michael Harris", address: "301 Elm St. Apt. 22", date: "2019-08-30", business: "Retail", validity: "Inactive" },
    { id: "00005", company: "Sarah Carter", address: "123 Pine Ave. Suite 8B", date: "2020-11-19", business: "Food Services", validity: "Active" },
    { id: "00006", company: "William Jones", address: "984 Maple St. Building 3", date: "2021-02-03", business: "Tech", validity: "Inactive" },
    { id: "00007", company: "Emma Wilson", address: "17 Oak Lane", date: "2021-07-12", business: "Education", validity: "Active" },
    { id: "00008", company: "James Brown", address: "456 Cedar Rd.", date: "2022-03-23", business: "Healthcare", validity: "Inactive" },
    { id: "00009", company: "Alice Johnson", address: "789 Pine St.", date: "2022-12-10", business: "Finance", validity: "Active" },
    { id: "00010", company: "Robert Smith", address: "321 Birch Rd.", date: "2023-01-18", business: "Logistics", validity: "Inactive" },
    ];

  const [Moa, setmoa] = useState([allData]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingmoa, seteditingmoa] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    date: "",
    business: "",
    validity: "",
  });

  const MoasPerPage = 5;
  const totalPages = Math.ceil(allData.length / MoasPerPage);

   // Apply filters
   const filteredData = allData.filter((Moa) => {
    const matchesDate = filters.date
      ? Moa.date.startsWith(filters.date) // Compare YYYY
      : true;
    const matchesBusiness = filters.business
      ? Moa.business.toLowerCase().includes(filters.business.toLowerCase())
      : true;
    const matchesValidity = filters.validity
      ? Moa.validity === filters.validity
      : true;

    return matchesDate && matchesBusiness && matchesValidity;
  });
  

  const startIndex = (currentPage - 1) * MoasPerPage;
  const endIndex = startIndex + MoasPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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
    setFilters({ date: "", business: "", validity: "" });
    setCurrentPage(1);
  };

  const getValidityColor = (validity) => {
    switch (validity) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "Inactive":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleEdit = (Moa) => {
    seteditingmoa(Moa); 
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setmoa(Moa.filter((Moa) => Moa.id !== id));
    setOpenDropdown(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-gray-50 md:ml-[250px] mt-10 p-7 min-h-screen overflow-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 mt-3 text-center sm:text-left">Memorandum of Agreement</h1>
        <div className="mb-3">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 bg-gray-50 border border-gray-200 rounded-lg p-3 w-full md:w-fit">
            
            {/* Filter Icon */}
            <div className="flex items-center">
              <i className="fas fa-filter text-black mr-2"></i>
              <span className="text-sm text-black">Filter by</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-6 border-r border-gray-300 mx-2"></div>

             {/* Year Filter */}
             <div className="md:ml-0 ml-auto"> 
            <DatePicker
              selected={filters.date ? new Date(filters.date) : null}
              onChange={(date) => setFilters({ ...filters, date: date ? date.getFullYear().toString() : "" })}
              dateFormat="yyyy"
              showYearPicker
              className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              placeholderText="Select Year"
              customInput={
                <button className="flex items-center w-full md:w-auto px-3 py-2 border rounded-md">
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
              value={filters.validity}
              onChange={(e) => setFilters({ ...filters, validity: e.target.value })}
              className="block w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none"
            >
              <option value="" disabled>MOA Validity</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              seteditingmoa(null);
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
      {/* Responsive Wrapper for Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full h-auto border-collapse mt-3 hidden md:table">
          <thead>
          <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center border-b">ID</th>
              <th className="px-4 py-2 text-center border-b">COMPANY NAME</th>
              <th className="px-4 py-2 text-center border-b">ADDRESS</th>
              <th className="px-2 py-2 text-center border-b">MOA STRATED</th>
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
        {currentData.map((Moa, index) => (
          <tr key={Moa.id} className={`md:table-row block w-full ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
            {/* ID */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">ID: </span> {Moa.id}
            </td>
            
            {/* Company */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Company: </span> {Moa.company}
            </td>
            
            {/* Address */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Address: </span> {Moa.address}
            </td>
            
            {/* Date */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Date: </span> {Moa.date}
            </td>
            
            {/* Nature of Business */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Business: </span> {Moa.business}
            </td>
            
            {/* MOA Validity */}
            <td className="px-4 border-t py-1 block md:table-cell">
              <span className="md:hidden font-semibold">MOA Validity: </span> 
              <span className={`rounded-full px-2 py-1 ${getValidityColor(Moa.validity)}`}>
                {Moa.validity}
              </span>

            </td>


            {/* Ellipses Action */}
            <td className="px-6 py-2 border-t relative">
                  <button onClick={() => toggleDropdown(Moa.id)} className="text-gray-600">
                    <MoreVertical size={20} />
                  </button>

                  {openDropdown === Moa.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(Moa)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <FilePenLine size={16} className="inline-block mr-2" />
                        Edit File
                      </button>
                      <button
                        onClick={() => handleDelete(Moa.id)}
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
    {currentData.map((Moa, index) => (
      <div key={Moa.id} className={`border border-black p-4 mb-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
       <div className="flex justify-between items-center">
       <div className="flex items-center space-x-3 flex-1">
          <div className="font-bold">{Moa.company}</div>
          <div className={`px-4 rounded-full py-1 ${getValidityColor(Moa.validity)}`}>
            {Moa.validity}
          </div>
        </div>

        <div className="relative ml-4">
          <button 
            onClick={() => toggleDropdown(Moa.id)} 
            className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical size={20} />
          </button>
           {openDropdown === Moa.id && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => handleEdit(Moa)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                  <FilePenLine size={16} className="inline-block mr-2" />
                    Edit File
                    </button>
                <button
                    onClick={() => handleDelete(Moa.id)}
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
                <strong>ID:</strong> {Moa.id}
              </div>
              <div className="mt-2">
                <strong>Address:</strong> {Moa.address}
              </div>
              <div className="mt-2">
                <strong>Nature of Business:</strong> {Moa.business}
              </div>
              <hr className="my-2" />
              <div className="mt-2 text-center">
                <strong>MOA</strong> 
              </div> <hr className="my-2" />
              <div className="mt-2">
                <strong>Moa Started:</strong> {Moa.moaStarted}
              </div>
              <div className="mt-2">
                <strong>Moa Draft Sent:</strong> {Moa.moaDraftSent}
              </div>
              <div className="mt-2">
                <strong>Moa Notorized:</strong> {Moa.moaNotorized}
              </div>
              <div className="mt-2">
                <strong>Expiry Date:</strong> {Moa.expiryDate}
              </div>
              <div className="mt-2">
                <strong>Type of Moa:</strong> {Moa.moaType}
              </div>
              
              <hr className="my-2" />
              <div className="mt-2 text-center">
                <strong>Contact Person</strong> 
              </div> <hr className="my-2" />
              <div className="mt-2">
                <strong>Name:</strong> {Moa.contactPerson}
              </div>
              <div className="mt-2">
                <strong>Contact Number:</strong> {Moa.number}
              </div>
              <div className="mt-2">
                <strong>Email Address:</strong> {Moa.email}
              </div>
              <div className="mt-2">
                <strong>Remarks:</strong> {Moa.remarks}
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

     <AddMoa
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
          />

          <EditMoa
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              seteditingmoa(null);
            }}
            MoaData={editingmoa}
          /> <AddMoa
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <EditMoa
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            seteditingmoa(null);
          }}
          MoaData={editingmoa}
        />
  

  {/* Showing Results Info */}
  <span className="text-gray-500 text-sm mt-2 md:mt-0">
    Showing <b>{startIndex + 1}</b> to <b>{Math.min(endIndex, filteredData.length)}</b> of <b>{filteredData.length}</b>
  </span>
  </div>
</div>

</div>
    
      );
    }
    
