
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTable } from 'react-table';

export default function ViewId() {
  const [compids, setCompids] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search input

  useEffect(() => {
    const fetchCompids = async () => {
      try {
        const response = await fetch("api/actions");
        const data = await response.json();
        setCompids(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompids();
  }, []);

  // Filtered data based on search input
  const filteredData = useMemo(() => {
    return compids.filter(item =>
      item.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.id_number.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.employee_id.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [compids, searchInput]);

  // Memoized columns array
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "FullName", accessor: "fullname" },
      { Header: "Designation", accessor: "designation" },
      { Header: "Department", accessor: "department" },
      { Header: "ID Number", accessor: "id_number" },
      { Header: "Employment Number", accessor: "employee_id" },
      {
        Header: "Profile Image",
        accessor: "profileImage",
        Cell: ({ value }) => (
          <img src={value} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: filteredData }); // Use filtered data

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <section className="container mt-10">
      <h2 className="text-xl font-bold mb-4">Posts</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by Full Name, ID Number, or Employee ID"
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue-900 text-white">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="w-1/6 py-2 px-4">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white text-black">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="text-center">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="border px-4 py-2">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
