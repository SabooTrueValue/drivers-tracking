// Import necessary modules from Next.js and React
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import Cookies from "js-cookie";

// Define props interface for MenuItem component
interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  open: boolean;
}

// MenuItem component
const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  isSelected,
  onClick,
  open,
}) => {
  return (
    <div
      className={`mx-2 mb-2 flex cursor-pointer gap-2 rounded-xl p-2 border-r-4 duration-75 lg:mb-2  border items-center text-sm md:text-base lg:px-4 lg:py-2.5 ${
        isSelected
          ? "border-r-blue-950 bg-blue-800 text-white"
          : "text-blue-800 border bg-white hover:shadow-lg hover:font-medium"
      }`}
      onClick={onClick}
    >
      <Icon className="text-base md:text-xl" />
      <span className={`${open ? "visible " : "hidden"}`}>{label}</span>
    </div>
  );
};

// Props interface for LogoutButton component
interface LogoutButtonProps {
  onClick: () => void;
  open: boolean;
}

// LogoutButton component
const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick, open }) => (
  <div
    className="mx-2 mb-2 flex cursor-pointer gap-2 rounded-xl p-2  duration-75 lg:mb-2  border border-r-4 items-center text-sm md:text-base lg:px-4 lg:py-2.5  hover:bg-blue-800  text-blue-800  hover:text-white bg-white"
    onClick={onClick}
  >
    <AiOutlineLogout className="text-xl" />
    <span className={`${open ? "visible" : "hidden"}`}> Logout</span>
  </div>
);

// Props interface for SidePanel component
interface SidePanelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  menuItems: { icon: React.ElementType; label: string }[];
}

// SidePanel component
const SidePanel: React.FC<SidePanelProps> = ({
  open,
  setOpen,
  selectedItem,
  setSelectedItem,
  menuItems,
}) => {
  // const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  // // const router = useRouter(); // Use useRouter hook from Next.js

  // // Handle resize event
  // useEffect(() => {
  //   const handleResize = () => setScreenSize(window.innerWidth);

  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // // Update open state based on screen size
  // useEffect(() => {
  //   if (screenSize && screenSize <= 1400) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }, [screenSize, setOpen]);

  // Handle logout action
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("driverId");
    Cookies.remove("_id");
    Cookies.remove("journeyId");
    Cookies.remove("isAdmin");
    toast.success("Logout Successfully");
    window.location.href = "/login";
    // router.push("/login"); // Use router for navigation
  };

  return (
    <div className="flex h-screen">
      <div
        className={`fixed h-screen bg-white duration-500 md:hidden min-w-60  ${
          open ? "left-0" : "-left-[100%]"
        } flex flex-col justify-between`}
      >
        <div>
          <div
            onClick={() => setOpen(false)}
            className="mt-2 mb-6 border-b py-4 px-2 text-right "
          >
            {/* Replace with Next.js Link */}
            Close
          </div>
          <div className="text-lg lg:text-xl">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isSelected={selectedItem === item.label}
                onClick={() => setSelectedItem(item.label)}
                open={open} // Pass open prop to MenuItem
              />
            ))}
          </div>
        </div>
        <LogoutButton onClick={handleLogout} open={open} />
      </div>
      <div
        className={`hidden md:block ${
          open ? "min-w-[250px]" : "w-20"
        } justify-between bg-gray-100  `}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className=" mx-2 mb-2 flex cursor-pointer gap-2 rounded-xl p-2  duration-75 lg:mb-2    text-sm md:text-base    items-center ">
              <CgMenuGridR
                className="hidden text-4xl cursor-pointer md:block text-blue-800"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isSelected={selectedItem === item.label}
                  onClick={() => setSelectedItem(item.label)}
                  open={open} // Pass open prop to MenuItem
                />
              ))}
            </div>
          </div>
          <LogoutButton onClick={handleLogout} open={open} />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
