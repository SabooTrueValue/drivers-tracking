"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch, AiOutlineMenu } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";
import SidePanel from "@/components/SidePanel";
import AdminHome from "@/components/AdminHome";
import DrivesDetails from "@/components/DrivesDetails";
import DriversData from "@/components/DriversData";
import { useAppContext } from "@/context";
import axios from "axios";
import toast from "react-hot-toast";
import DrivesData from "@/components/DrivesData";

interface DriverData {
  id: number;
  employeeId: string;
  isDriving: boolean;
  name: string;
  phone: string;
  isVerified: boolean;
}

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Home");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [columns2, setColumns2] = useState<any[]>([]);
  const [driversData, setDriversData] = useState<DriverData[]>([]);

  const {
    driverData,
    setJournyData,

    journyData,
  } = useAppContext();

  const menuItems = [
    { label: "Home", icon: BiHomeAlt2 },
    { label: "Drives", icon: AiOutlineFileSearch },
    { label: "Drivers", icon: BsPeople },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin");
        const driverData: DriverData[] = res.data.data.map(
          (item: any, index: number) => ({
            ...item,
            id: index + 1,
            isDriving: item.isDriving === "true", // Adjust as per your data structure
            isVerified: item.isVerified === "true", // Adjust as per your data structure
          })
        );
        const journeyData: DriverData[] = res.data.journeyData.map(
          (item: any, index: number) => ({
            ...item,
            id: index + 1,
            isDriving: item.isDriving === "true", // Adjust as per your data structure
            isVerified: item.isVerified === "true", // Adjust as per your data structure
          })
        );

        setColumns([
          { field: "id", headerName: "Sr. No" },
          { field: "employeeId", headerName: "Emp ID" },
          {
            field: "isDriving",
            headerName: "Status",
            flex: 0.5,
            renderCell: (params: any) => (
              <div className="flex items-center">
                <span
                  className={`text-sm rounded px-4 py-1 mt-1 text-black font-medium ${
                    params.row.isDriving ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {params.row.isDriving ? "Driving" : "Available"}
                </span>
              </div>
            ),
          },
          { field: "name", headerName: "Name", flex: 1 },
          { field: "phone", headerName: "Phone Number", flex: 1 },
        ]);
        setColumns2([
          { field: "id", headerName: "Sr. No" },
          { field: "employeeId", headerName: "Emp ID" },
          {
            field: "isDriving",
            headerName: "Status",
            flex: 0.5,
            renderCell: (params: any) => (
              <div className="flex items-center">
                <span
                  className={`text-sm rounded px-4 py-1 mt-1 text-black font-medium ${
                    params.row.isDriving ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {params.row.isDriving ? "Driving" : "Available"}
                </span>
              </div>
            ),
          },
          { field: "name", headerName: "Name", flex: 1 },
          { field: "phone", headerName: "Phone Number", flex: 1 },
        ]);

        setDriversData(driverData);
        setJournyData(journeyData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        toast.error("Token expired, Please login again");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
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
        <div className="absolute left-0 top-0 w-full py-4 text-blue-800 flex justify-between">
          <AiOutlineMenu
            className="cursor-pointer text-3xl md:hidden"
            onClick={() => setOpen(!open)}
          />
          <p className="text-lg">{driverData?.name}</p>
          <p className="hidden md:block text-sm px-4">{driverData?.phone}</p>
        </div>
        <div className="bg-white rounded-tl-2xl px-2 lg:px-4 pt-6 h-full">
          {selectedItem === "Home" ? (
            <AdminHome />
          ) : selectedItem === "Drives" ? (
            <DrivesData
              error={error}
              loading={loading}
              columns={columns2}
              data={journyData}
            />
          ) : selectedItem === "Drivers" ? (
            <DriversData
              error={error}
              loading={loading}
              columns={columns}
              data={driversData}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
