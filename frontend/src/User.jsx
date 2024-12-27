import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function User() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then((result) => setUser(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4 shadow-lg" style={{ minWidth: "350px", maxWidth: "600px" }}>
        <h3 className="text-center mb-4 text-primary">User Information</h3>
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((users, index) => (
              <tr key={index}>
                <td>
                  {users.image && (
                    <img
                      src={`http://localhost:3001${users.image}`}
                      alt={users.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                    />
                  )}
                </td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.age}</td>
                <td>
                  <Link to={`/update/${users._id}`} className="btn btn-sm btn-success mx-1">Update</Link>
                  <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(users._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-3">
          <Link to="/create" className="btn btn-success">Add New User</Link>
        </div>
      </div>
    </div>
  );
}

export default User;





// import React, { useEffect, useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function User() {
//   const [user, setUser] = useState([])


//   useEffect(()=>{
//     axios.get('http://localhost:3001/')
//     .then(result=>(setUser(result.data)))
//     .catch(err=> console.log(err))
//   },[])
   
//   const handleDelete  = (id)=>{

//      axios.delete(`http://localhost:3001/deleteUser/`+id)
//      .then(res => {console.log(res)
//       window.location.reload();
//      })
//      .catch(err =>console.log(err))
//   }
 
  

//   return (    
//   <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

//       {/* Container with responsive styling */}
//       <div
//         className="w-50 bg-white rounded p-4 shadow-lg"
//         style={{ minWidth: "350px", maxWidth: "600px" }}
//       >
//         <h3 className="text-center mb-4 text-primary">User Information</h3>
//         <table className="table table-hover">
//           <thead className="table-primary">
//             <tr>

//               <th>Name</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {user.map((users, index) => (
//               <tr key={index}>
//                 <td>{users.name}</td>
//                 <td>{users.email}</td>
//                 <td>{users.age}</td>
//                 <td>
//                 <Link to={`/update/${users._id}`} className="btn btn-sm btn-success mx-1">Update</Link>
//                <button className="btn btn-sm btn-danger mx-1" onClick={()=>{handleDelete(users._id)}}>Delete</button>

                  
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="text-center mt-3">
//         <Link to="/create" className="btn btn-success">Add New User</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;
