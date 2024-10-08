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
import { GridRowParams } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { FiRefreshCw } from "react-icons/fi";

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
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [columns2, setColumns2] = useState<any[]>([]);
  const [driversData, setDriversData] = useState<DriverData[]>([]);
  const [totalDriver, setTotalDriver] = useState(0);
  const [totalJourney, setTotalJourney] = useState(0);
  const [totalAvailableDriver, setTotalAvailableDriver] = useState(0);
  const [totalUnavailble, setTotalUnavailable] = useState(0);

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

  interface RowData {
    id: number;
    employeeId: string;
    isDriving: boolean;
    name: string;
    phone: string;
    _id: string;
  }

  const [rows, setRows] = React.useState<RowData[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleUpdate = async (id: number) => {
    try {
      const response = await axios.put(`/api/update/${id}`, {
        /* your update payload */
      });
      console.log("Update successful", response.data);
      // Optionally, update state to reflect changes
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (id: string) => {
    // Show a confirmation dialog to the user
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) {
      // If the user did not confirm, exit the function
      return;
    }

    try {
      toast.loading("Deleting...");

      const response = await axios.delete(`/api/admin?id=${id}`);
      toast.dismiss();
      console.log("Delete successful", response.data);
      toast.success("Deleted successfully");

      // Refresh the state or update it accordingly
      setRefreshing(!refreshing);

      // Optionally, update state to remove the deleted row
      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      toast.dismiss();
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin");

        if (res.data.data) {
          setTotalDriver(res.data.data.length);

          let totalAvailable = 0;
          let totalUnavailable = 0;

          // Transform driver data and count available drivers
          const driverData: DriverData[] = res.data.data.map(
            (item: any, index: number) => {
              if (item.isDriving === false) {
                totalAvailable += 1;
              } else {
                totalUnavailable += 1;
              }

              return {
                ...item,
                id: index + 1,
                isDriving: item.isDriving === true,
              };
            }
          );

          setTotalAvailableDriver(totalUnavailable);

          setTotalUnavailable(totalAvailable);

          // Set driver columns
          setColumns([
            { field: "id", headerName: "Sr. No", flex: 0.5 },
            { field: "employeeId", headerName: "Emp ID", flex: 0.5 },
            {
              field: "isDriving",
              headerName: "Status",
              flex: 0.5,
              renderCell: (params: GridRowParams<RowData>) => (
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

            {
              field: "update",
              headerName: "Update",
              flex: 0.5,
              renderCell: (params: GridRowParams<RowData>) => (
                <button
                  onClick={() => handleUpdate(params.row.id)}
                  className="px-2 py-1 text-blue-500 rounded"
                >
                  <GoPencil className="text-xl" />
                </button>
              ),
            },
            {
              field: "delete",
              headerName: "Delete",
              flex: 0.5,
              renderCell: (params: GridRowParams<RowData>) => (
                <button
                  onClick={() => handleDelete(params.row._id)}
                  className="px-2 py-2 text-red-500  rounded"
                >
                  <MdDelete className="text-2xl" />
                </button>
              ),
            },
          ]);

          setDriversData(driverData);
        }

        if (res.data.journeyData) {
          setTotalJourney(res.data.journeyData.length);

          // Transform journey data
          const journeyData: DriverData[] = res.data.journeyData.map(
            (item: any, index: number) => {
              // Add separate fields for location entries
              const locations = item.location || [];
              return {
                ...item,
                id: index + 1,
                location1: locations[0]
                  ? `${locations[0].formattedLocation} - (${locations[0].time}) `
                  : "",
                location2: locations[1]
                  ? `${locations[1].formattedLocation} - (${locations[1].time}) (${locations[1].detail}) `
                  : "",
                location3: locations[2]
                  ? `${locations[2].formattedLocation} - (${locations[2].time}) `
                  : "",
              };
            }
          );

          // Set journey columns
          setColumns2([
            // { field: "id", headerName: "Sr No" },
            { field: "date", headerName: "Date" },
            // { field: "time", headerName: "Time" },
            { field: "employeeId", headerName: "Emp ID" },
            {
              field: "status",
              headerName: "Status",
              width: 150,
              renderCell: (params: any) => (
                <div className="flex items-center">
                  <span
                    className={`text-sm rounded px-4 py-1 mt-1 text-black font-medium ${
                      params.row.status === "Drive Ended"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {params.row.status}
                  </span>
                </div>
              ),
            },
            { field: "driverName", headerName: "Driver Name", width: 150 },
            {
              field: "vehicleNumber",
              headerName: "Vehicle Number",
              width: 150,
            },
            {
              field: "modeOfTransport",
              headerName: "Mode ",
              // width: 150,
            },

            { field: "location1", headerName: "Start ", flex: 0.5 },
            {
              field: "location2",
              headerName: "Picked Up/Drop ",
              flex: 0.5,
            },
            {
              field: "location3",
              headerName: "End ",
              flex: 0.5,
            },
          ]);

          setJournyData(journeyData);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        toast.error("Token expired, Please login again");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshing]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get("/api/admin");
  //       if (res.data.data) {
  //         setTotalDriver(res.data.data.length);
  //       }
  //       let totalAvailable = 0;

  //       // First pass: Map and update the counter
  //       const driverData: DriverData[] = res.data.data.map(
  //         (item: any, index: number) => {
  //           // Check the condition and update the counter
  //           if (item.isDriving === "true") {
  //             totalAvailable += 1;
  //           }

  //           // Return the transformed item
  //           return {
  //             ...item,
  //             id: index + 1,
  //             isDriving: item.isDriving === "true",
  //           };
  //         }
  //       );

  //       // Update the state or handle the totalAvailable value as needed
  //       setTotalAvailable(totalAvailable);
  //       if (res.data.journeyData) {
  //         setTotalJourney(res.data.journeyData.length);
  //       }
  //       const journeyData: DriverData[] = res.data.journeyData.map(
  //         (item: any, index: number) => ({
  //           ...item,
  //           id: index + 1,
  //           isDriving: item.isDriving === "true", // Adjust as per your data structure
  //         })
  //       );

  //       setColumns([
  //         { field: "id", headerName: "Sr. No" },
  //         { field: "employeeId", headerName: "Emp ID" },
  //         {
  //           field: "isDriving",
  //           headerName: "Status",
  //           flex: 0.5,
  //           renderCell: (params: any) => (
  //             <div className="flex items-center">
  //               <span
  //                 className={`text-sm rounded px-4 py-1 mt-1 text-black font-medium ${
  //                   params.row.isDriving ? "bg-red-100" : "bg-green-100"
  //                 }`}
  //               >
  //                 {params.row.isDriving ? "Driving" : "Available"}
  //               </span>
  //             </div>
  //           ),
  //         },
  //         { field: "name", headerName: "Name", flex: 1 },
  //         { field: "phone", headerName: "Phone Number", flex: 1 },
  //       ]);

  //      setColumns2([
  //        { field: "id", headerName: "ID" }, // If you have an ID field; this may be added as an auto-incremented field
  //        { field: "date", headerName: "Date" },
  //        { field: "time", headerName: "Time" },
  //        { field: "employeeId", headerName: "Emp ID" },
  //        {
  //          field: "status",
  //          headerName: "Status",
  //          renderCell: (params: any) => (
  //            <div className="flex items-center">
  //              <span
  //                className={`text-sm rounded px-4 py-1 mt-1 text-black font-medium ${
  //                  params.row.status === "completed"
  //                    ? "bg-green-100"
  //                    : "bg-red-100"
  //                }`}
  //              >
  //                {params.row.status}
  //              </span>
  //            </div>
  //          ),
  //        },
  //        { field: "driverName", headerName: "Driver Name" },
  //        { field: "vehicleNumber", headerName: "Vehicle Number" },
  //        { field: "modeOfTransport", headerName: "Mode of Transport" },
  //        { field: "totalTime", headerName: "Total Time" },
  //        { field: "isDeleted", headerName: "Is Deleted", type: "boolean" },
  //        { field: "deletedAt", headerName: "Deleted At", type: "date" },
  //       //  {
  //       //    field: "pickupOrDrop",
  //       //    headerName: "Pickup/Drop",
  //       //    renderCell: (params: any) => (
  //       //      <div>{params.row.pickupOrDrop.isPickup ? "Pickup" : "Drop"}</div>
  //       //    ),
  //       //  },
  //        {
  //          field: "location",
  //          headerName: "Location",
  //          renderCell: (params: any) => (
  //            <div>
  //              {params.row.location.map((loc: any, index: number) => (
  //                <div key={index}>
  //                  {loc.formattedLocation} ({loc.lat}, {loc.lng})
  //                </div>
  //              ))}
  //            </div>
  //          ),
  //        },
  //      ]);

  //       setDriversData(driverData);
  //       setJournyData(journeyData);
  //     } catch (err: any) {
  //       setError(err.message || "Something went wrong");
  //       toast.error("Token expired, Please login again");
  //       window.location.href = "/login";
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex  bg-gray-100">
      <div className="z-20">
        <SidePanel
          open={open}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOpen={setOpen}
          menuItems={menuItems}
        />
      </div>

      <div className="flex-auto   font-roboto relative  ">
        <div className=" w-full py-4 text-blue-800 flex justify-between select-none h-14 items-center">
          <AiOutlineMenu
            className="cursor-pointer text-3xl md:hidden"
            onClick={() => setOpen(!open)}
          />
          <div
            onClick={() => setRefreshing(!refreshing)}
            className="text-sm px-4 hover:bg-blue-700 rounded-full  py-1 text-white mr-2 bg-blue-800 flex gap-2 items-center group cursor-pointer"
          >
            <FiRefreshCw className="group-hover:animate-spin " />
            <p> Refresh</p>
          </div>{" "}
          <p className="text-lg">{driverData?.name}</p>
          {/* <p className="hidden md:block text-sm px-4">{driverData?.phone}</p> */}
        </div>
        <div className="bg-white rounded-tl-2xl px-2 lg:px-4 py-6 h-[calc(100vh-56px)]  ">
          {selectedItem === "Home" ? (
            <AdminHome
              totalDriver={totalDriver}
              totalJourney={totalJourney}
              setSelectedItem={setSelectedItem}
              totalAvailableDriver={totalAvailableDriver}
              totalUnavailble={totalUnavailble}
            />
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
              setRefreshing={setRefreshing}
              refreshing={refreshing}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
