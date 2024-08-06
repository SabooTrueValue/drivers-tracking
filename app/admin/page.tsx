"use client";
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
import { useAppContext } from "@/context";

// import { IoCarSportOutline } from "react-icons/io5";
// import { HiOutlineDocumentCheck } from "react-icons/hi2";
// import { CiUser } from "react-icons/ci";

// import DriversDetails from "./DriversDetails";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Home");
  const {
    driverData,
    setDriverData,
    journyData,
    // setJournyData,
    isDriving,
    setIsDriving,
    getDriverData,
    journeyData,
  } = useAppContext();

  const menuItems = [
    { label: "Home", icon: BiHomeAlt2 },
    { label: "Drives", icon: AiOutlineFileSearch },
    // { label: "Available Drivers", icon: BsPeople },
    // { label: "Driving Drivers", icon: BsPeople },
    { label: "Drivers", icon: BsPeople },
    // { label: "New Driver", icon: CiUser },
  ];

  return (
    <div className="flex h-screen  bg-gray-100">
      <div className="z-20">
        <SidePanel
          open={open}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOpen={setOpen}
          menuItems={menuItems}
        />
      </div>

      <div className="flex-auto h-screen overflow-x-scroll font-roboto md:overflow-x-hidden relative lg:min-h-screen pt-14">
        <div className=" absolute left-0 top-0 w-full py-4  text-blue-800 flex justify-between ">
          <AiOutlineMenu
            className={` cursor-pointer text-3xl  md:hidden`}
            onClick={() => setOpen(!open)}
          />
          <p className="text-lg ">{driverData?.name}</p>
          <p className="hidden md:block text-sm">{driverData?.phone}</p>
        </div>
        <div className="  bg-white     rounded-tl-2xl px-2 lg:px-4 pt-6 h-full   ">
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
