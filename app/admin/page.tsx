'use client';
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

// import EnquireDashboard from "./EnquireDashboard";
// import AddNewDriver from "./AddNewDriver";

import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";
import SidePanel from "@/components/SidePanel";
import AdminHome from "@/components/AdminHome";
import DrivesDetails from "@/components/DrivesDetails";
import DriversData from "@/components/DriversData";


// import { IoCarSportOutline } from "react-icons/io5";
// import { HiOutlineDocumentCheck } from "react-icons/hi2";
// import { CiUser } from "react-icons/ci";

// import DriversDetails from "./DriversDetails";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Home");
  const menuItems = [
    { label: "Home", icon: BiHomeAlt2 },
    { label: "Drives", icon: AiOutlineFileSearch },
    // { label: "Available Drivers", icon: BsPeople },
    // { label: "Driving Drivers", icon: BsPeople },
    { label: "Drivers", icon: BsPeople },
    // { label: "New Driver", icon: CiUser },
  ];

  return (
    <div className="flex h-screen gap-1">
      <div className="z-20">
        <SidePanel
          open={open}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOpen={setOpen}
          menuItems={menuItems}
        />
      </div>

      <div className="flex-auto h-screen overflow-x-scroll font-roboto md:overflow-x-hidden ">
        <div className="flex items-center justify-end px-4 py-4 mx-1 my-1 text-white duration-1000 bg-blue-800 rounded-lg md:mx-2 md:justify-between">
          <AiOutlineMenu
            className={`absolute ${
              open ? "left-52 sm:left-60 " : "left-5"
            } cursor-pointer text-3xl  md:hidden`}
            onClick={() => setOpen(!open)}
          />
          <AiOutlineMenu
            className="hidden text-3xl cursor-pointer md:block"
            onClick={() => setOpen(!open)}
          />
          <div>
            {selectedItem === "Home"
              ? "Home"
              : selectedItem === "Drives"
              ? "Drives Details"
              : selectedItem === "Drivers"
              ? "Drivers Details"
              : "New Driver"}
          </div>
          <div className=""></div>
          {/* <div className="font-mono text-white md:text-2xl"> Admin</div> */}
        </div>
        <div className="mx-1 md:mx-2   overflow-x-scroll overflow-y-visible md:overflow-x-hidden  h-[90vh]  ">
          {/* {selectedItem} */}
          {selectedItem === "Home" ? (
            <AdminHome />
          ) : selectedItem === "Drives" ? (
            <DrivesDetails />
          ) : (
            selectedItem === "Drivers" && (
              <DriversData />
              // ) : (
              //   <AddNewDriver />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
