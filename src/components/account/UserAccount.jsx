import { useState, useEffect } from "react";

const UserAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contact_number: "",
    college: "",
    campus: "",
  });

  const fetchUserDetails = async () => {
    setLoading(true);
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/auth/userDetails/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserDetails(data);
      setFormData({
        name: data.name,
        position: data.position,
        contact_number: data.contact_number,
        college: data.college,
        campus: data.campus,
      });

      setTimeout(() => setLoading(false), 250);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        name: userDetails.name,
        position: userDetails.position,
        contact_number: userDetails.contact_number,
        college: userDetails.college,
        campus: userDetails.campus,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const user_id = localStorage.getItem("user_id");
  
    if (!user_id) {
      setError("User not logged in");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/auth/updateUserDetails/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setIsEditing(false);
      await fetchUserDetails();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-50 p-7 min-h-400 overflow-hidden ">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <main className="w-full overflow-hidden">
          <h2 className="text-2xl font-semibold mb-6 ">My Profile</h2>
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col sm:flex-row items-center sm:items-start space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl">{userDetails.name?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    userDetails.name
                  )}
                </h3>
                <p className="text-gray-500">
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    userDetails.position
                  )}
                </p>
              </div>
              <button
                onClick={handleEditToggle}
                className="ml-auto text-blue-500 hover:underline"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">College</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <p className="text-lg">{userDetails.college}</p>
                )}
              </div>
              <div>
                <p className="text-gray-600">Campus</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <p className="text-lg">{userDetails.campus}</p>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Contact Number</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <p className="text-lg">{userDetails.contact_number}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            )}
          </section>
        </main>
      )}
    </div>
  );
};

export default UserAccount;
