import React, { useMemo, useState } from "react";

const CustomTable = ({
  columns = [],
  data = [],
  loading = false,
  pageSizeOptions = [10, 20, 50],
  maxHeight = 800,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSizeOptions[0]);

  // pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      {/* top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-b">
        <p className="text-sm text-gray-600">
          Showing {paginatedData.length} of {data.length}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* table */}
      <div
        className="overflow-x-auto"
        style={{
          maxHeight: data.length * 56 > maxHeight ? maxHeight : "auto",
          overflowY: data.length * 56 > maxHeight ? "auto" : "hidden",
        }}
      >
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-semibold text-gray-700"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No details found
                </td>
              </tr>
            )}

            {!loading &&
              paginatedData.map((row, index) => (
                <tr
                  key={row._id || index}
                  className="border-b hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
