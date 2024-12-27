import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3001/addUser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('User added successfully!');
      navigate('/'); // Redirect to user list page
    } catch (err) {
      console.error(err);
      alert('Error adding user');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
}

export default CreateUser;



// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateUser() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState('');
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('age', age);
//     formData.append('image', image);

//     try {
//       await axios.post('http://localhost:3001/addUser', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('User added successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Error adding user');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3 className="text-center mb-4">Add New User</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Age</label>
//           <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Image</label>
//           <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
//         </div>
//         <button type="submit" className="btn btn-primary">Add User</button>
//       </form>
//     </div>
//   );
// }

// export default CreateUser;



// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function CreateUser() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     age: '',
//   });
//   const Navigate = useNavigate(); 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Sending data to the backend
//     axios
//       .post('http://localhost:3001/createUser', formData)
//       .then((result) => {
//         console.log('User created successfully:', result.data);
//         //alert('User created successfully!');
//         Navigate('/')
//       })
//       .catch((err) => {
//         console.error('Error creating user:', err);
//         alert('Error creating user. Check console for details.');
//       });

//     // Reset form data
//     setFormData({ name: '', email: '', age: '' });
//   };

//   return (
//     <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
//       <div className="w-50 bg-white rounded shadow p-4">
//         <h3 className="text-center text-primary mb-4">Add New User</h3>
//         <form onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Age Input */}
//           <div className="mb-3">
//             <label htmlFor="age" className="form-label">
//               Age
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               id="age"
//               name="age"
//               placeholder="Enter your age"
//               value={formData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="btn btn-success w-30">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateUser;
