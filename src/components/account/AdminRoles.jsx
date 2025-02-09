import React, { useState } from "react";
import { Trash2, PlusCircle, RefreshCw } from "lucide-react";

const AdminRoles = () => {
    const initialUsers = [
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Research Admin", lastLogin: "2025-02-01" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Employment Admin", lastLogin: "2025-01-28" },
        { id: 4, name: "Alice Davis", email: "alice@example.com", role: "Practicum Admin", lastLogin: "Never" },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle delete user
    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    // Handle refresh
    const handleRefresh = () => {
        setUsers([...initialUsers]); // Reset to initial state
    };

    // Filter users based on the search term
    const filteredUsers = users.filter((user) => {
        return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="bg-gray-50 p-7 min-h-400 overflow-hidden ">
            <h2 className="text-xl font-semibold">Admin Roles</h2>

            {/* Search bar & Actions */}
            <div className="flex flex-col md:flex-row my-4">
                <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-full md:w-1/2 border rounded mb-4 md:mb-0"
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

            {/* Table for larger screens */}
            <div className="hidden md:block">
                <table className="min-w-full border-collapse mt-3">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">Email</th>
                    <th className="px-4 py-2 text-left border-b">Role</th>
                    <th className="px-4 py-2 text-left border-b">Last Login</th>
                    <th className="px-4 py-2 text-left border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-t">{user.name}</td>
                        <td className="px-4 py-2 border-t">{user.email}</td>
                        <td className="px-4 py-2 border-t">{user.role}</td>
                        <td className="px-4 py-2 border-t">{user.lastLogin}</td>
                        <td className="px-4 py-2 border-t">
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 size={18} />
                        </button>
                        </td>
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
                    <p className="text-sm text-gray-500">Last Login: {user.lastLogin}</p>
                    <div className="flex items-center space-x-2 mt-2">
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 size={18} />
                    </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRoles
