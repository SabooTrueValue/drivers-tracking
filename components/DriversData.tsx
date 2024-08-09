import React, { useState } from "react";
import AddNewDriver from "./AddNewDriver";
import DriversDetails from "./DriversDetails";

interface DriverData {
  id: number;
  [key: string]: any; // Replace with actual fields in your data
}

interface DriversDetailsProps {
  error: string;
  loading: boolean;
  data: DriverData[];
  columns: any[];
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  refreshing: boolean;
}

const DriversData: React.FC<DriversDetailsProps> = ({
  error,
  loading,
  data,
  columns,
  setRefreshing,
  refreshing,
}) => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  return (
    <div className="">
      {showAddUserForm && (
        <AddNewDriver
          setShowAddUserForm={setShowAddUserForm}
          showAddUserForm={showAddUserForm}
          setRefreshing={setRefreshing}
          refreshing={refreshing}
        />
      )}
      <div className="flex justify-end gap-2  mb-4 text-sm">
        <button
          type="submit"
          onClick={() => setShowAddUserForm(true)}
          aria-label="Add Driver"
          className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-sm hover:bg-blue-700 md:px-6 lg:px-10"
        >
          Add New Driver
        </button>
        {/* <button
              type="button"
              onClick={() => setShowAddUserForm(true)}
              aria-label="Update Driver"
              className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-sm md:px-6 lg:px-10 "
            >
              Upate Driver
            </button> */}
      </div>{" "}
      <DriversDetails
        error={error}
        loading={loading}
        columns={columns}
        data={data}
      />
    </div>
  );
  // return (
  //   <div className="">
  //     {showAddUserForm ? (
  //       <AddNewDriver
  //         setShowAddUserForm={setShowAddUserForm}
  //         showAddUserForm={showAddUserForm}
  //         setRefreshing={setRefreshing}
  //         refreshing={refreshing}

  //       />
  //     ) : (
  //       <>
  //         <div className="flex justify-end gap-2  mb-4 text-sm">
  //           <button
  //             type="submit"
  //             onClick={() => setShowAddUserForm(true)}
  //             aria-label="Add Driver"
  //             className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-sm hover:bg-blue-700 md:px-6 lg:px-10"
  //           >
  //             Add New Driver
  //           </button>
  //           {/* <button
  //             type="button"
  //             onClick={() => setShowAddUserForm(true)}
  //             aria-label="Update Driver"
  //             className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-sm md:px-6 lg:px-10 "
  //           >
  //             Upate Driver
  //           </button> */}
  //         </div>{" "}
  //         <DriversDetails
  //           error={error}
  //           loading={loading}
  //           columns={columns}
  //           data={data}
  //         />
  //       </>
  //     )}
  //   </div>
  // );
};

export default DriversData;
