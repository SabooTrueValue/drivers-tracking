import React from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  useGridApiRef,
  gridClasses,
  GridAutosizeOptions,
} from "@mui/x-data-grid";
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

const autosizeOptions: GridAutosizeOptions = {
  includeOutliers: true,
};

const DrivesDetails: React.FC<DriversDetailsProps> = ({
  error,
  loading,
  data,
  columns,
}) => {
    const apiRef = useGridApiRef();

  return (
    <Box
      height="80vh"
      overflow={"auto"}
      border={1}
      // width={"100%"}
      borderColor="grey.300"
      // borderRadius="10px"
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
          apiRef={apiRef}
          columns={columns}
          autosizeOptions={autosizeOptions}
          getRowHeight={() => "auto"}
         
          slots={{ toolbar: GridToolbar }}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 0.5,
            },
          }}
          // sx={{
          //   backgroundColor: "white",
          //   fontSize: 15,
          //   overflow: "auto", // Ensure overflow for horizontal scroll
          // }}
        />
      )}
    </Box>
  );
};

export default DrivesDetails;
