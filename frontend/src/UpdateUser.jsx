import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams(); // Extract 'id' from the URL
  const navigate = useNavigate(); // Navigate back to home

  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the user data when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getUser/${id}`)
      .then((result) => {
        console.log("Fetched Data:", result.data);
        setName(result.data.name || ""); // Set fallback values
        setEmail(result.data.email || "");
        setAge(result.data.age || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle form submission to update user
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    console.log("Submitting Updated Data:", updatedUser);

    axios
      .put(`http://localhost:3001/updateUser/${id}`, updatedUser)
      .then((result) => {
        console.log("User Updated Successfully:", result);
        navigate("/"); // Redirect to home
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  // Display loading spinner until the data is fetched
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Render the form
  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 bg-white rounded shadow p-4">
        <h3 className="text-center text-primary mb-4">Update User</h3>
        <form onSubmit={handleUpdate}>
          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Age Input */}
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
