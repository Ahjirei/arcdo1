import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle, RefreshCw, X, AlertTriangle, XCircle } from "lucide-react";

const AdminRoles = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
    
            return () => clearTimeout(timer);
        }
    }, [error]);    

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/api/admin/", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddAdmin = async () => {
        try {
            setIsLoading(true); 
            setError("");
            const token = localStorage.getItem("token");
    
            // Determine if input is email or name
            const isEmail = inputValue.includes('@');
            const payload = isEmail ? { email: inputValue } : { name: inputValue };
    
            // Check if the user exists first
            const checkResponse = await fetch("http://localhost:3001/api/admin/checkUserExists", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
    
            const checkData = await checkResponse.json();
    
            if (!checkResponse.ok || !checkData.exists) {
                setError("User not found. Please enter a valid name or email.");
                return;
            }
    
            // If user exists, proceed to set admin role
            const response = await fetch("http://localhost:3001/api/admin/setAdmin", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Failed to update user role");
            }
    
            setInputValue("");
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error("Error setting admin role:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
    
            const payload = userToDelete.email 
                ? { email: userToDelete.email } 
                : { name: userToDelete.name };
    
            const response = await fetch("http://localhost:3001/api/admin/removeAdminRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Failed to remove admin role");
            }
    
            setUsers(users.filter((u) => u.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("Error removing admin role:", error);
            setError(error.message);
        }
    };

    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            await fetchUsers(); 
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredUsers = users.filter(
        (user) =>
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
                        <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Refreshing...' : 'Refresh'}
                    </button>

                    <button onClick={() => setShowModal(true)} className="px-2 py-2 bg-[#800101] hover:bg-red-400 text-white rounded ml-2 flex items-center">
                        <PlusCircle className="mr-2" size={18} /> Add Admin
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
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
                                <td className="px-4 py-2 border-t">
                                    {user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}
                                </td>

                                <td className="px-4 py-2 border-t">
                                <button onClick={() => confirmDelete(user)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={18} />
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Admin Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Add Admin</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-800">
                                <X size={20} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter name or email"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-4 py-2 border rounded mt-4"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button
                            disabled={isLoading} 
                            onClick={handleAddAdmin}
                            className={`w-full mt-4 px-4 py-2 bg-[#800101] hover:bg-red-400 text-white rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Adding User' : 'Set as Admin'}
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center">
                                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                                <h3 className="text-lg font-medium">Confirm Deletion</h3>
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XCircle className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="mt-3">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to remove admin privileges from <b>{userToDelete?.name || userToDelete?.email}</b>? 
                                This action cannot be undone.
                            </p>
                        </div>

                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Remove Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRoles;