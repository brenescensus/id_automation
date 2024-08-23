"use client"
import React from "react";
import { useEffect, useState } from 'react';


export default  function Addid() {
  const[profileImage, setProfileImage] = useState(null);
const [compids, setcompids] = useState([]);
const [formData, setFormData] = useState({
  fullname: "",
  designation: "",
  department: "",
  id_number: "",
  employee_id: "",
  profileImage: null,
});


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

const handleChange = (e) => {
  const { name, value, type, files } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: type === 'file' ? files[0] : value, // Handle file input
  }));

  // const { name, value } = e.target;
  // setFormData((prevState) => ({
  //   ...prevState,
  //   [name]: value,
  // }));
};

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formDataSend = new FormData();
    formDataSend.append('fullname', formData.fullname);
    formDataSend.append('designation', formData.designation);
    formDataSend.append('department', formData.department);
    formDataSend.append('id_number', formData.id_number);
    formDataSend.append('employee_id', formData.employee_id);
    if (formData.profileImage) {
      formDataSend.append('profileImage', formData.profileImage); // Ensure profileImage is appended correctly
  }
  console.log(formDataSend);
  for (let [key, value] of formDataSend.entries()) {
    console.log(`${key}:`, value);
  }
    try {
      const response = await fetch('/api/actions', {
        method: 'POST',
        body: formDataSend,
      });
      if (response.ok) {
        const data = await response.json();
        fetchCompids();
        console.log(data);

        // Clear form fields after successful submission
        setFormData({
            fullname: "",
            designation: "",
            department: "",
            id_number: "",
            employee_id: "",
            profileImage: null,
          });
          setProfileImage(null); // Reset the image file
      } else {
          const errorText = await response.text();
          console.error("Submission failed:", errorText);
      }
  } catch (error) {
      console.error("Error submitting form:", error);
  }
};
    

useEffect(() => {
  fetchCompids();},[]);    


  // const compids=await prisma.CompanyId.findMany()
  
  return (
    <>
    <section className="container flex items-center justify-center  bg-white text-black">
      <div className="my-5 rounded-xl border ">
      <div className="bg-blue-900  w-full p-4 ">
            <h1 className="capitalize mb-4 font-bold text-center text-white">Please Fill the form below</h1>

            </div>
        <form onSubmit={handleSubmit} className="bg-blue  flex flex-col mx-5 px-4 ">
           

          <div className="flex flex-col  mb-2 ">
            <label className="font-bold"> FullName:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Name"
              className="border-b-2 border-gray focus:border-b-2 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-2">
            <label className="font-bold">Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="border-b-2 border-gray focus:border-b-2 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-2">
            <label className="font-bold">Department: </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              className="border-b-2 border-gray focus:border-b-2 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-2">
            <label className="font-bold">Id Number</label>
            <input
              type="text"
              name="id_number"
              value={formData.id_number}
              onChange={handleChange}
              placeholder="ID Number"
              className="border-b-2 border-gray focus:border-b-2 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-4">
            <label className="font-bold">Employment no:</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              placeholder="Employment Number"
              className="border-b-2 border-gray-200 focus:border-b-2 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div className="flex flex-col  mb-4">
            <input type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
           
             required />
          </div>
          <div className="bg-blue-900 w-full rounded-lg text-center">
            {" "}
            <button type="submit" className=" text-3xl  text-white rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </section>

    
    </>
  );
}
