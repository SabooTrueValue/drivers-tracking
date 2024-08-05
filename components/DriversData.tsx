import React, { useState } from "react";
import AddNewDriver from "./AddNewDriver";
import DriversDetails from "./DriversDetails";

const DriversData = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  return (
    <div className="">
      {showAddUserForm ? (
        <AddNewDriver
          setShowAddUserForm={setShowAddUserForm}
          showAddUserForm={showAddUserForm}
        />
      ) : (
        <div className="flex justify-end gap-2 mt-2 mb-3 text-sm">
          <button
            type="submit"
            onClick={() => setShowAddUserForm(true)}
            aria-label="Add Driver"
            className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-sm hover:bg-blue-700 md:px-6 lg:px-10"
          >
            Add New Driver
          </button>
          <button
            type="button"
            onClick={() => setShowAddUserForm(true)}
            aria-label="Update Driver"
            className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-sm md:px-6 lg:px-10 "
          >
            Upate Driver
          </button>
        </div>
      )}
      <DriversDetails />
    </div>
  );
};

export default DriversData;
