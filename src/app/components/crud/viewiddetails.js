"use client";
import { React, useState, useEffect } from "react";

export default function ViewIdDetails() {
  const [compids, setCompids] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Items per page
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });

  const fetchCompids = async () => {
    try {
      const response = await fetch("api/actions");
      const data = await response.json();
      setCompids(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompids();
  }, []);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = compids.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(compids.length / rowsPerPage);

  // Sorting logic
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = [...compids].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setCompids(sortedData);
  };

  return (
    <section className="container mt-10">
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-900 text-white">
              {[
                { key: "id", label: "ID" },
                { key: "fullname", label: "FullName" },
                { key: "designation", label: "Designation" },
                { key: "department", label: "Department" },
                { key: "id_number", label: "ID Number" },
                { key: "employee_id", label: "Employment Number" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="w-1/6 py-2 px-4 cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  {label} {sortConfig.key === key && (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
              ))}
              <th className="w-1/12 py-2 px-4">Profile Image</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {currentRows.map((ids) => (
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
                    alt={`${ids.fullname}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </section>
  );
}
