import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IoMdDownload } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";

interface DriverData {
  id: number;
  employeeId: string;
  isDriving: boolean;
  name: string;
  phone: string;
  isVerified: boolean;
}

const DriversDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DriverData[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/listDriverData");
        const driverData: DriverData[] = res.data.data.map(
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

        setData(driverData);
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
    <Box m="8px 0 0 0">
      <Box
        height="80vh"
        border={1}
        borderColor="grey.300"
        borderRadius="10px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "1",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `black`,
          },
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full gap-4 text-xl ">
            <ImSpinner2 className="text-2xl animate-spin " />
            Wait fetching the data from backend.
          </div>
        ) : error ? (
          <div>Error ~ {error}</div>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
            sx={{
              backgroundColor: "white",
              fontSize: 15,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DriversDetails;
