import React, { useState, useRef, useEffect } from "react";
import {
  Sun,
  RotateCcw,
  Search,
  Settings,
  FileText, // You can add this if needed for the Export icon
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarTopConfigurationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false); // For controlling the export dropdown
  const settingsMenuRef = useRef(null);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const defaultPage = "ARCDO";
  const currentPage =
    pathSegments.length > 0 ? pathSegments[pathSegments.length - 1].toUpperCase() : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setIsSettingsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddClick = () => {
    navigate("/add ");
  };

  const handleExportClick = (type) => {
    // Handle export logic here (e.g., download Excel or PDF file)
    console.log(`Export as ${type}`);
    setIsExportOpen(false); // Close dropdown after selection
  };

  return (
    <nav className="fixed bg-[#800101] sm:shadow-md shadow-none top-0 flex items-center px-3 sm:px-10 z-50 h-[4rem] w-full text-white">
      {/* Address Bar */}
      <div
        className={`flex items-center text-sm font-medium text-gray-200 ${
          currentPage ? "ml-16 sm:ml-[250px] mr-2 sm:mr-0" : "ml-16 sm:ml-0 mr-2 sm:mr-0"
        }`}
      >
        <span className="mr-2 ">{decodeURIComponent(defaultPage)}</span>
        {currentPage && (
          <>
            <span className="text-white">/</span>
            <span className="ml-2 font-bold">{decodeURIComponent(currentPage)}</span>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center text-white">
        {/* Search Bar for Desktop */}
        <div className="hidden lg:flex items-center rounded-2xl border border-gray-300 mr-5">
          <Search
            className="h-5 w-5 mr-2 ml-2 hover:text-gray-400 transition duration-300"
            onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle search visibility
          />
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-2xl text-md text-black focus:outline-none focus:ring-2 focus:ring-red-800-400"
            />
          )}
        </div>

        {/* Icons for Desktop */}
        <ul className="hidden lg:flex items-center space-x-5 text-white">
          <li>
            <button className="text-md hover:text-gray-400 transition duration-300">
              <Sun className="h-5 w-5" />
            </button>
          </li>
          <li>
            <button className="text-md hover:text-gray-400 transition duration-300">
              <RotateCcw className="h-5 w-5" />
            </button>
          </li>
          <li>
            {/* Export Dropdown for Desktop */}
            <div className="relative">
              <button
                className="text-md hover:text-gray-400 transition duration-300 flex items-center"
                onClick={() => setIsExportOpen(!isExportOpen)}
              >
                <FileText className="h-5 w-5 mr-1" />
                <span>Export</span>
              </button>
              {isExportOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2">
                  <button
                    className="inline-flex items-center space-x-1 text-black hover:text-red-800 transition duration-300"
                    onClick={() => handleExportClick("Excel")}
                  >
                    <span>as</span>
                    <span>Excel</span>
                  </button>
                  <button
                    className="inline-flex items-center space-x-1 text-black hover:text-red-800 transition duration-300"
                    onClick={() => handleExportClick("PDF")}
                  >
                    <span>as</span>
                    <span>PDF</span>
                  </button>
                </div>
              )}


            </div>
          </li>
        </ul>

        {/* Settings Menu for Small Devices */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
            className="text-md text-white hover:text-gray-400 transition duration-300"
          >
            <Settings className="h-6 w-6" />
          </button>
          {isSettingsMenuOpen && (
            <div
              ref={settingsMenuRef}
              className="absolute right-3 top-12 bg-white rounded-lg shadow-lg p-3"
            >
              <ul className="space-y-3">
                <li>
                  <button className="flex items-center text-black hover:text-red-800 transition duration-300">
                    <Sun className="h-5 w-5 mr-2" />
                    <span>Light Mode</span>
                  </button>
                </li>
                <li>
                  <button className="flex items-center text-black hover:text-red-800 transition duration-300">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    <span>Reset</span>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center text-black hover:text-red-800 transition duration-300"
                    onClick={handleAddClick}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Add Item</span>
                  </button>
                </li>
                {/* Search icon inside settings */}
                <li>
                  <button
                    className="flex items-center text-black hover:text-red-800 transition duration-300"
                    onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle search visibility on click
                  >
                    <Search className="h-5 w-5 mr-2" />
                    <span>Search</span>
                  </button>
                  {isSearchOpen && (
                    <input
                      type="text"
                      placeholder="Search..."
                      className="mt-2 px-4 py-2 rounded-2xl text-md text-black focus:outline-none focus:ring-2 focus:ring-red-800-400"
                    />
                  )}
                </li>
                {/* Export options inside settings menu */}
                <li>
                  <div className="relative">
                    <button
                      className="flex items-center text-black hover:text-red-800 transition duration-300"
                      onClick={() => setIsExportOpen(!isExportOpen)}
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      <span>Export</span>
                    </button>
                    {isExportOpen && (
                      <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg p-2">
                        <button
                          className="block w-full text-black hover:text-red-800 transition duration-300"
                          onClick={() => handleExportClick("Excel")}
                        >
                           as Excel
                        </button>
                        <button
                          className="block w-full text-black hover:text-red-800 transition duration-300"
                          onClick={() => handleExportClick("PDF")}
                        >
                           as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
