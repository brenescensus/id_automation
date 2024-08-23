"use client"
import {React,useState,useEffect }from 'react'


export default function ViewIdDetails() {
  const [compids, setcompids] = useState([]);
// const [formData, setFormData] = useState({
//   name: "",
//   designation: "",
//   department: "",
//   id_number: "",
//   employee_id: "",
// });


const fetchCompids = async () => {
  try {
    const response = await fetch('api/actions');
    const data = await response.json();
    setcompids(data);
  }
  catch (error) {
    console.error(error);
  }
}
useEffect(() => {
  fetchCompids();},[]);    


  return (
    
    <section className="container mt-10">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="w-1/6 py-2 px-4">ID</th>
                <th className="w-1/6 py-2 px-4">FullName</th>
                <th className="w-1/6 py-2 px-4">Designation</th>
                <th className="w-1/6 py-2 px-4">Department</th>
                <th className="w-1/6 py-2 px-4">ID Number</th>
                <th className="w-1/6 py-2 px-4">Employment Number</th>
                <th className="w-1/12 py-2 px-4">Profile Image</th>
              </tr>
            </thead>
            <tbody className='bg-white text-black'>
              {compids.map((ids) => (
                <tr key={ids.id} className="text-center">
                  <td className="border px-4 py-2">{ids.id}</td>
                  <td className="border px-4 py-2">{ids.fullname}</td>
                  <td className="border px-4 py-2">{ids.designation}</td>
                  <td className="border px-4 py-2">{ids.department}</td>
                  <td className="border px-4 py-2">{ids.id_number}</td>
                  <td className="border px-4 py-2">{ids.employee_id}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={ids.profileImage}
                      alt={`${ids.name}'s profile`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
  )
}
