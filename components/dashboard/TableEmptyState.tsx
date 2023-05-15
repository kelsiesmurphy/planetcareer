import React from "react";

const TableEmptyState = ({ children }: any) => {
  return (
    <tr className="flex justify-center py-12">
      <td className="max-w-xl flex-1">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-lg font-medium text-stone-800">
            No job applications found
          </h2>
          <p className="mb-4 max-w-sm text-stone-500">
            You are not tracking any job applications yet. To do so, click the
            'Create new' button.
          </p>
          {children}
        </div>
      </td>
    </tr>
  );
};

export default TableEmptyState;
