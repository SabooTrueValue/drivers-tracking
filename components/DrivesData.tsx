import React, { useState } from "react";
import { CiViewTable } from "react-icons/ci";
import { SlGrid } from "react-icons/sl";
import DrivesDetails from "./DrivesDetails";

interface DriverData {
  id: number;
  vehicleNumber: string;
  date: string;
  location: Array<{
    time: string;
    date: string;
    formattedLocation: string;
    lat: number;
    lng: number;
    detail: string;
  }>;
  [key: string]: any; // Replace with actual fields if more are known
}

interface DriversDetailsProps {
  error: string;
  loading: boolean;
  data: DriverData[];
  columns: any[];
}

const DrivesData: React.FC<DriversDetailsProps> = ({
  error,
  loading,
  data,
  columns,
}) => {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <div>
      <div className="flex justify-end gap-2  mb-3 text-sm">
        <button
          type="button"
          onClick={() => setShowGrid(true)}
          aria-label="Grid View"
          className={`px-4 py-2 rounded-md shadow-sm md:px-6 border ${
            showGrid
              ? "bg-blue-800 text-white"
              : "text-blue-800 hover:bg-blue-700 hover:text-white"
          }`}
        >
          <SlGrid className="text-xl" />
        </button>
        <button
          type="button"
          onClick={() => setShowGrid(false)}
          aria-label="Table View"
          className={`px-4 py-2 rounded-md shadow-sm md:px-6 border ${
            !showGrid
              ? "bg-blue-800 text-white"
              : "text-blue-800 hover:bg-blue-700 hover:text-white"
          }`}
        >
          <CiViewTable className="text-xl" />
        </button>
      </div>

      {showGrid ? (
        <GridView journyData={data} />
      ) : (
        <DrivesDetails
          error={error}
          loading={loading}
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
};

const GridView: React.FC<{ journyData: DriverData[] }> = ({ journyData }) => {
  const convertTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
  };

  return (
    <div className=" gap-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[80vh] overflow-y-scroll px-1 py-6">
      {journyData.length > 0 ? (
        journyData.map((journey, index) => (
          <div
            key={index}
            className={` p-4 bg-white border rounded-lg shadow-sm shadow-black/50 relative ${
              journey?.location?.length === 2
                ? " border-indigo-400 "
                : journey?.location?.length === 1 && " border-green-400"
            }`}
          >
            <div className="flex justify-between pt-2    md:flex-row text-sm">
              <p className="text-indigo-500">
                {journey.driverName} -{" "}
                {journey.employeeId && journey.employeeId}
              </p>
              <p className="text-xs text-indigo-500">{journey.date}</p>
            </div>
            <div className="flex justify-between py-2 mb-5 border-b   md:flex-row">
              <p className="text-indigo-500">{journey.vehicleNumber}</p>
              <p className="text-sm text-indigo-500">
                {journey.modeOfTransport}
              </p>
            </div>

            {journey.location.map((loc, locIndex) => (
              <div key={locIndex} className="flex gap-1 -mt-1">
                <div className="flex flex-col items-center justify-start w-4 pt-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      locIndex === 0
                        ? "bg-green-500"
                        : locIndex === 1
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  />
                  {locIndex < 2 && (
                    <div className="w-1 h-full border-r-2 border-r-indigo-500 border-dashed -ml-0.5" />
                  )}
                </div>
                <div>
                  <p className="text-indigo-500">
                    {loc.detail} -{" "}
                    {loc.time ? convertTo12HourFormat(loc.time) : ""}
                  </p>
                  <p className="pb-3 text-xs">{loc.formattedLocation}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No recent drive history.</p>
      )}
    </div>
  );
};

export default DrivesData;
