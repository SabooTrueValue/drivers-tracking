import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { IoMdDownload } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";

interface DriverData {
  id: number;
  [key: string]: any; // Replace with actual fields in your data
}

interface DriversDetailsProps {
  error: string;
  loading: boolean;
  data: DriverData[];
  columns: GridColDef[];
}

const DriversDetails: React.FC<DriversDetailsProps> = ({
  error,
  loading,
  data,
  columns,
}) => {
  return (
    <Box m="8px 0 0 0">
      <Box
        height="80vh"
        // height={"calc(100vh - 200px)"}
        // height="auto"
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
