import React, { useState } from "react";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { Trash2, FilePenLine, MoreVertical, PlusCircle } from "lucide-react";
import AddIndustryPartner from "../industry_partners/AddIndustryPartner";
import EditIndustryPartner from "../industry_partners/EditIndustryPartner";


export default function industrypartnerDashboard() {
  const allData = [
    { id: "00001", company: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "2019-09-04", business: "Electric", validity: "Completed" },
    { id: "00002", company: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "2019-05-28", business: "Book", validity: "Processing" },
    { id: "00003", company: "Jasmine Lee", address: "452 Main St. Suite 12", date: "2020-01-15", business: "Consulting", validity: "Completed" },
    { id: "00004", company: "Michael Harris", address: "301 Elm St. Apt. 22", date: "2019-08-30", business: "Retail", validity: "On Hold" },
    { id: "00005", company: "Sarah Carter", address: "123 Pine Ave. Suite 8B", date: "2020-11-19", business: "Food Services", validity: "Rejected" },
    { id: "00006", company: "William Jones", address: "984 Maple St. Building 3", date: "2021-02-03", business: "Tech", validity: "Processing" },
    { id: "00007", company: "Emma Wilson", address: "17 Oak Lane", date: "2021-07-12", business: "Education", validity: "Completed" },
    { id: "00008", company: "James Brown", address: "456 Cedar Rd.", date: "2022-03-23", business: "Healthcare", validity: "Processing" },
    { id: "00009", company: "Alice Johnson", address: "789 Pine St.", date: "2022-12-10", business: "Finance", validity: "Completed" },
    { id: "00010", company: "Robert Smith", address: "321 Birch Rd.", date: "2023-01-18", business: "Logistics", validity: "On Hold" },
    ];

  const [industrypartner, setindstrypartner] = useState([allData]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndustryPratner, seteditingIndustryPratner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    date: "",
    business: "",
    validity: "",
  });

  const industrypartnersPerPage = 5;
  const totalPages = Math.ceil(allData.length / industrypartnersPerPage);

   // Apply filters
   const filteredData = allData.filter((industrypartner) => {
    const matchesDate = filters.date
      ? industrypartner.date.startsWith(filters.date) // Compare YYYY
      : true;
    const matchesBusiness = filters.business
      ? industrypartner.business.toLowerCase().includes(filters.business.toLowerCase())
      : true;
    const matchesValidity = filters.validity
      ? industrypartner.validity === filters.validity
      : true;

    return matchesDate && matchesBusiness && matchesValidity;
  });
  

  const startIndex = (currentPage - 1) * industrypartnersPerPage;
  const endIndex = startIndex + industrypartnersPerPage;
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

  const handleEdit = (industrypartner) => {
    seteditingIndustryPratner(industrypartner); 
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setindstrypartner(industrypartner.filter((industrypartner) => industrypartner.id !== id));
    setOpenDropdown(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-gray-50 md:ml-[250px] mt-10 p-7 min-h-screen overflow-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 mt-3 text-center sm:text-left">Industry Partners</h1>
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
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="On Hold">On Hold</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Divider (Visible only on larger screens) */}
            <div className="hidden md:block h-6 border-r border-gray-300 mx-2"></div>

            {/* Reset Filters Button */}
            <button onClick={resetFilters} 
              className="w-full sm:w-auto px-2 py-2 text-red-700 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center">
              <i className="fas fa-undo mr-2 text-red-700"></i>
              Reset Filters
            </button>

            <button
            onClick={() => {
              seteditingIndustryPratner(null);
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto px-2 py-2 text-blue-600 rounded-md shadow-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Industry Partner
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
              <th className="px-4 py-2 text-center border-b">TELEPONE NUMBER</th>
              <th className="px-4 py-2 text-center border-b">FAX NUMBER</th>
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
        {currentData.map((industrypartner, index) => (
          <tr key={industrypartner.id} className={`md:table-row block w-full ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
            {/* ID */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">ID: </span> {industrypartner.id}
            </td>
            
            {/* Company */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Company: </span> {industrypartner.company}
            </td>
            
            {/* Address */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Address: </span> {industrypartner.address}
            </td>
            
            {/* Date */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Date: </span> {industrypartner.date}
            </td>
            
            {/* Nature of Business */}
            <td className="px-4 py-2 border-t block md:table-cell">
              <span className="md:hidden font-semibold">Business: </span> {industrypartner.business}
            </td>
            
            {/* MOA Validity */}
            <td className="px-4 border-t py-1 block md:table-cell">
              <span className="md:hidden font-semibold">MOA Validity: </span> 
              <span className={`rounded-full px-2 py-1 ${getValidityColor(industrypartner.validity)}`}>
                {industrypartner.validity}
              </span>

            </td>


            {/* Ellipses Action */}
            <td className="px-6 py-2 border-t relative">
                  <button onClick={() => toggleDropdown(industrypartner.id)} className="text-gray-600">
                    <MoreVertical size={20} />
                  </button>

                  {openDropdown === industrypartner.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(industrypartner)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <FilePenLine size={16} className="inline-block mr-2" />
                        Edit File
                      </button>
                      <button
                        onClick={() => handleDelete(industrypartner.id)}
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
    {currentData.map((industrypartner, index) => (
      <div key={industrypartner.id} className={`border border-gray-200 p-4 mb-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
       <div className="flex justify-between items-center">
       <div className="flex items-center space-x-3 flex-1">
          <div className="font-bold">{industrypartner.company}</div>
          <div className={`px-4 rounded-full py-1 ${getValidityColor(industrypartner.validity)}`}>
            {industrypartner.validity}
          </div>
        </div>

        <div className="relative ml-4">
          <button 
            onClick={() => toggleDropdown(industrypartner.id)} 
            className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical size={20} />
          </button>
           {openDropdown === industrypartner.id && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => handleEdit(industrypartner)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                  <FilePenLine size={16} className="inline-block mr-2" />
                    Edit File
                    </button>
                <button
                    onClick={() => handleDelete(industrypartner.id)}
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
                <strong>ID:</strong> {industrypartner.id}
              </div>
              <div className="mt-2">
                <strong>Telephone Number:</strong> {industrypartner.telephoneNumber}
              </div>
              <div className="mt-2">
                <strong>Fax Number:</strong> {industrypartner.faxNumber}
              </div>
              <div className="mt-2">
                <strong>Nature of Business:</strong> {industrypartner.business}
              </div>
              <div className="mt-2">
                <strong>Course:</strong> {industrypartner.course}
              </div>
              <div className="mt-2">
                <strong>College:</strong> {industrypartner.college}
              </div>
              <div className="mt-2">
                <strong>Campus:</strong> {industrypartner.campus}
              </div>
              <hr className="my-2" />
              <div className="mt-2 text-center">
                <strong>MOA</strong> 
              </div> <hr className="my-2" />
              <div className="mt-2">
                <strong>Year Included:</strong> {industrypartner.yearIncluded}
              </div>
              <div className="mt-2">
                <strong>Year Submitted:</strong> {industrypartner.yearSubmitted}
              </div>
              <div className="mt-2">
                <strong>Moa Notorized:</strong> {industrypartner.moaNotorized}
              </div>
              <div className="mt-2">
                <strong>Expiry Date:</strong> {industrypartner.expiryDate}
              </div>
              <hr className="my-2" />
              <div className="mt-2 text-center">
                <strong>Contact Person</strong> 
              </div> <hr className="my-2" />
              <div className="mt-2">
                <strong>Name:</strong> {industrypartner.contactPerson}
              </div>
              <div className="mt-2">
                <strong>Contact Number:</strong> {industrypartner.number}
              </div>
              <div className="mt-2">
                <strong>Email Address:</strong> {industrypartner.email}
              </div>
              <div className="mt-2">
                <strong>Position:</strong> {industrypartner.position}
              </div>
              <div className="mt-2">
                <strong>Office Address:</strong> {industrypartner.officeAddress}
              </div>
              <div className="mt-2">
                <strong>Remarks:</strong> {industrypartner.remarks}
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

     <AddIndustryPartner
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
          />

          <EditIndustryPartner
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              seteditingIndustryPratner(null);
            }}
            industrypartnerData={editingIndustryPratner}
          /> <AddIndustryPartner
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <EditIndustryPartner
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            seteditingIndustryPratner(null);
          }}
          industrypartnerData={editingIndustryPratner}
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
    
