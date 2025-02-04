import React, { useState } from "react";
import { Trash2, PlusCircle, RefreshCw } from "lucide-react";

const AdminProfile = ({ isOpen, onClose }) => {
  const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Main Admin", lastLogin: "2025-01-30" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Research Admin", lastLogin: "2025-02-01" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Employment Admin", lastLogin: "2025-01-28" },
    { id: 4, name: "Alice Davis", email: "alice@example.com", role: "Practicum Admin", lastLogin: "Never" },
  ];

  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen) return null;

  const UserAccessTab = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [userRole, setUserRole] = useState("Main Admin"); // Assume the logged-in user is Main Admin
  
    // Handle delete user
    const handleDelete = (id) => {
      setUsers(users.filter(user => user.id !== id));
    };
  
    // Handle refresh
    const handleRefresh = () => {
      setUsers([...initialUsers]); // Refresh users to initial state
    };

    // Filter users based on the search term
    const filteredUsers = users.filter(user => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Function to format date to American format
    const formatDate = (dateString) => {
      if (dateString === "Never") return "Never";
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    // Function to get the status dot based on the last login date
    const getLoginStatus = (lastLogin) => {
      if (lastLogin === "Never") return "gray"; // No login
      const today = new Date();
      const loginDate = new Date(lastLogin);
      if (today.toDateString() === loginDate.toDateString()) {
        return "green"; // Same day login
      }
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (yesterday.toDateString() === loginDate.toDateString()) {
        return "red"; // Yesterday login
      }
      return "gray"; // Default to gray if it's neither today nor yesterday
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-6xl md:max-w-7xl shadow-lg rounded-lg relative p-6 flex flex-col overflow-y-auto overflow-x-hidden max-h-screen sm:max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-3xl"
          >
            &times;
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="rounded-lg w-full md:w-1/5 bg-gray-100 p-4 flex flex-col">
              <button
                onClick={() => setActiveTab("profile")}
                className={`block w-full text-left px-4 py-2 ${activeTab === "profile" ? "bg-gray-200 font-semibold rounded-lg" : ""}`}
              >
                Admin Profile
              </button>
              <button
                onClick={() => setActiveTab("user-access")}
                className={`block w-full text-left px-4 py-2 ${activeTab === "user-access" ? "bg-gray-200 font-semibold rounded-lg" : ""}`}
              >
                Main Admin Access
              </button>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-4/5 p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Business Name</label>
                      <input
                        type="text"
                        placeholder="Ex. ABC Pvt. Ltd."
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#800101] text-white py-2 px-4 rounded-md hover:bg-red-400 w-full"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
              {activeTab === "user-access" && (
                <div>
                  <h2 className="text-xl font-semibold">Main Admin Access</h2>
                   {/* Search bar moved above buttons in mobile view */}
                   <div className="flex flex-col md:flex-row my-4">
                    <input
                      type="text"
                      placeholder="Search admins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 w-full md:w-1/2 border rounded mb-4 md:mb-0" // Adjusted for mobile
                    />
                     <div className="flex items-center space-x-2 ml-auto">
                    <button
                      onClick={handleRefresh}
                      className="px-2 py-2 text-gray-700 rounded hover:bg-gray-300 flex items-center"
                    >
                      <RefreshCw size={18} className="mr-2" />
                      Refresh
                    </button>
                    
                      <button
                        onClick={() => console.log("Add Admin clicked")}
                        className="px-2 py-2 bg-[#800101] hover:bg-red-400 text-white rounded ml-2 flex items-center"
                      >
                        <PlusCircle className="mr-2" size={18} />
                        Add Admin
                      </button>
                    
                  </div>
                  </div>

                  {/* Table/Responsive Cards */}
                  <div className="hidden md:block">
                    {/* Desktop View - Table */}
                    <table className="min-w-full border-collapse mt-3">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left border-b">Name</th>
                          <th className="px-4 py-2 text-left border-b">Email</th>
                          <th className="px-4 py-2 text-left border-b">Role</th>
                          <th className="px-4 py-2 text-left border-b w-64">Last Login</th>
                          {userRole === "Main Admin" && (
                            <th className="px-4 py-2 text-left border-b"></th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-t">{user.name}</td>
                            <td className="px-4 py-2 border-t">{user.email}</td>
                            <td className="px-4 py-2 border-t">{user.role}</td>
                            <td className="px-4 py-2 border-t w-64">{formatDate(user.lastLogin)}</td>
                            {userRole === "Main Admin" && (
                              <td className="px-4 py-2 border-t">
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View - Cards */}
                  <div className="md:hidden">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="border p-4 my-4 rounded-lg shadow-md">
                        <div className="font-semibold text-lg">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-600">Role: {user.role}</div>
                        <p className="text-sm text-gray-500">Last Login: {formatDate(user.lastLogin)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${getLoginStatus(user.lastLogin) === "green" ? "bg-green-500" : getLoginStatus(user.lastLogin) === "red" ? "bg-red-500" : "bg-gray-400"}`}
                          ></span>
                        
                        {userRole === "Main Admin" && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <UserAccessTab />;
};

export default AdminProfile;
