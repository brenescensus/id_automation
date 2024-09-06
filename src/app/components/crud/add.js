"use client";
import React, { useState } from 'react';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    designation: "",
    department: "",
    id_number: "",
    employee_id: "",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    // Upload image to Cloudinary
    setIsUploading(true);
    const formDataImage = new FormData();
    formDataImage.append("file", imageFile);
    formDataImage.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formDataImage,
    });

    // const data = await response.json();
    // if (data.secure_url) {
    //   // Store image URL in the form data
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     imageUrl: data.secure_url,
    //   })); 

      const data = await response.json();
      if (data.secure_url) {
        // Store image URL in the form data
        const profileImage = data.secure_url;
  

      // Now submit the form data with imageUrl to your backend
      const formSubmitResponse = await fetch('/api/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(
          body: JSON.stringify({
            fullname: formData.fullname,
            designation: formData.designation,
            department: formData.department,
            id_number: formData.id_number,
            employee_id: formData.employee_id,
            profileImage: profileImage, // Add the image URL here
          }),
          // formData),
      });

      if (formSubmitResponse.ok) {
        const result = await formSubmitResponse.json();
        console.log("Form submitted successfully:", result);
        // Reset the form
        setFormData({
          fullname: "",
          designation: "",
          department: "",
          id_number: "",
          employee_id: "",
          profileImage: "",
        });
        setImageFile(null);
      } else {
        console.error("Error submitting the form");
      }
    } else {
      console.error("Image upload failed");
    }

    setIsUploading(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="mt-1 p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="mt-1 p-2 border w-full"
          required
        />
      </div>      
      <div className="mb-4">
        <label className="block text-sm font-medium">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="mt-1 p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">ID Number</label>
        <input
          type="text"
          name="id_number"
          value={formData.id_number}
          onChange={handleChange}
          className="mt-1 p-2 border w-full"
          required  />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Employee no</label>
        <input
          type="text"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          className="mt-1 p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 p-2 border w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 w-full"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </form>
   </>
  );
}
