import React from "react";

import { FaUserAlt } from "react-icons/fa";
// import { FaCar, FaUserAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const AdminHome = () => {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
};

export default AdminHome;

const Section1 = () => {
  return (
    <section className="w-full rounded-lg ">
      <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="p-2 rounded-lg bg-gray-50 lg:px-4">
          <p className="text-sm ">Drive Statistic:</p>
          <p>
            <span className="text-lg font-medium ">Today's Drive: </span>{" "}
            <span className="text-xl text-gray-800"> 4 </span>
          </p>
          <p>
            <span className="text-lg font-medium ">Total Drive: </span>{" "}
            <span className="text-xl text-gray-800"> 10 </span>
          </p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50 lg:px-4">
          <p>Drivers Statistic</p>
          <p>
            <span className="text-lg font-bold text-green-600">
              Available:{" "}
            </span>{" "}
            <span className="text-xl text-gray-800"> 10 </span>
          </p>

          <p>
            <span className="text-lg font-bold text-red-600">Driving: </span>{" "}
            <span className="text-xl text-gray-800"> 4 </span>
          </p>
        </div>
        <div className="lg:col-span-2 group">
          <p className="pb-2 text-2xl font-light text-gray-500/80 md:text-3xl group-hover:text-blue-600">
            Actions
          </p>
          <div className="flex flex-wrap gap-4 whitespace-nowrap lg:gap-2">
            <button
              aria-label="Start"
              className="flex items-center justify-center gap-2 p-2 text-white bg-blue-800 rounded-lg md:px-4 hover:shadow-xl lg:w-52"
            >
              <FaUserAlt />
              <span className="text-sm">Add New Driver</span>
            </button>
            <button
              aria-label="Start"
              className="flex items-center justify-center gap-2 p-2 text-white bg-blue-800 rounded-lg shadow-blue-900 md:px-4 hover:shadow-xl lg:w-52"
            >
              <MdEdit className="lg:text-lg" />
              <span className="text-sm"> Update Profile</span>
            </button>
            {/* <button
              aria-label="Start"
              className="flex items-center gap-2 p-2 text-white bg-blue-800 rounded-lg md:px-4 "
            >
              <FaCar />
              Start New Drive
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

const Section2 = () => {
  return (
    <section className="grid w-full gap-2 mt-2 rounded-lg md:grid-cols-2 ">
      <div className="p-2 border rounded-lg h-1/2 min-h-60 bg-blue-200/30 ">
        Colum 1
      </div>
      <div className="p-2 border rounded-lg h-1/2 min-h-60 bg-blue-200/30 ">
        Colum 2
      </div>
      <div className="p-2 border rounded-lg h-1/2 min-h-60 bg-blue-200/30 ">
        Colum 3
      </div>
      <div className="p-2 border rounded-lg h-1/2 min-h-60 bg-blue-200/30 ">
        Colum 4
      </div>
    </section>
  );
};

const Section3 = () => {
  return (
    <section className="w-full h-full p-2 mt-2 rounded-lg bg-blue-200/30 min-h-32">
      Section 3
    </section>
  );
};
