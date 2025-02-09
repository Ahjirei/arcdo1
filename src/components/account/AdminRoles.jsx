import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle, RefreshCw } from "lucide-react";

const AdminRoles = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/admin/");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleRefresh = () => {
        fetchUsers();
    };

    const filteredUsers = users.filter((user) =>
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-gray-50 p-7 min-h-400 overflow-hidden">
            <h2 className="text-xl font-semibold">Admin Roles</h2>
            <div className="flex flex-col md:flex-row my-4">
                <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-full md:w-1/2 border rounded mb-4 md:mb-0"
                />
                <div className="flex items-center space-x-2 ml-auto">
                    <button onClick={handleRefresh} className="px-2 py-2 text-gray-700 rounded hover:bg-gray-300 flex items-center">
                        <RefreshCw size={18} className="mr-2" /> Refresh
                    </button>
                    <button onClick={() => console.log("Add Admin clicked")} className="px-2 py-2 bg-[#800101] hover:bg-red-400 text-white rounded ml-2 flex items-center">
                        <PlusCircle className="mr-2" size={18} /> Add Admin
                    </button>
                </div>
            </div>
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
                                <td className="px-4 py-2 border-t">{user.name || "N/A"}</td>
                                <td className="px-4 py-2 border-t">{user.email || "N/A"}</td>
                                <td className="px-4 py-2 border-t">{user.role || "N/A"}</td>
                                <td className="px-4 py-2 border-t">{user.lastLogin || "Never"}</td>
                                <td className="px-4 py-2 border-t">
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRoles;
