import React, { useState, useEffect } from "react";
import UserAccount from "./UserAccount";
import AdminRoles from "./AdminRoles";

const AdminProfile = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("profile");
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-6xl md:max-w-7xl shadow-lg rounded-lg relative p-6 flex flex-col overflow-y-hidden overflow-x-hidden max-h-screen sm:max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-3xl"
          >
            &times;
          </button>

          <div className="flex flex-col md:flex-row sm:flex-row">
            {/* Sidebar */}
            <div className="rounded-lg w-30 md:w-1/5 bg-gray-200 p-4 flex flex-col">
              <button
                onClick={() => setActiveTab("profile")}
                className={`block w-full text-left px-4 py-2 ${
                  activeTab === "profile" ? "bg-gray-200 font-semibold rounded-lg" : ""
                }`}
              >
                Account
              </button>
              {role === "Super Admin" && (
                <button
                  onClick={() => setActiveTab("admin-roles")}
                  className={`block w-30 text-left px-4 py-2 ${
                    activeTab === "admin-roles" ? "bg-gray-200 font-semibold rounded-lg" : ""
                  }`}
                >
                  User Access
                </button>
              )}
            </div>

            {/* Main Content */}
            <div className="w-full md:w-4/5">
              {activeTab === "profile" && <UserAccount />}
              {activeTab === "admin-roles" && role === "Super Admin" && <AdminRoles />}
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminProfile;
