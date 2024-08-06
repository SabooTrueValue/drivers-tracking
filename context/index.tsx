"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface DriverData {
  isDriving: boolean;
  _id: string;
  name: string;
  employeeId: string;
  phone: string;
  // Add other properties as needed
}
interface Location {
  time: string;
  date: string;
  formattedLocation: string;
  lat: number;
  lng: number;
  detail: string;
}

interface JourneyData {
  vehicleNumber: string;
  date: string;
  time: string;
  status: string;
  location: Location[];
  createdAt: Date;
  updatedAt: Date;
  // Add other properties as needed
}

const AppContext = createContext<any>(null);

export function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [driverData, setDriverData] = useState<DriverData | null>(null);
  const [journyData, setJournyData] = useState<JourneyData[]>([]);
  const [isDriving, setIsDriving] = useState(false);
  useEffect(() => {
    getDriverData();
    journeyData();
  }, []);



  const getDriverData = async () => {
    try {
      const response = await axios.get(`/api/driver/user`);
      console.log(response.data?.data);
      setDriverData(response.data?.data);
      // setJournyData(response.data.journy);
      setIsDriving(response.data.isDriving);
      //   if (response.data?.journeyData?.length > 0) {
      //     setJournyData(response.data?.journeyData);
      //   }
      console.log(
        "🚀 ~ file: page.tsx:Home ~ getDriverData ~ response.data:",
        response.data
      );
    } catch (error: any) {
      console.error("Error fetching data in:", error);

      window.location.href = "/login";
    }
  };
  const journeyData = async () => {
    try {
      const response = await axios.get(`/api/journey`);

      if (response.data?.data?.length > 0) {
        setJournyData(response.data?.data);
      }
      console.log(
        "🚀 ~ file: page.tsx:Home ~ getJourneyData ~ response.data:",
        response.data
      );
    } catch (error: any) {
      console.error("Error fetching data in:", error);

      window.location.href = "/login";
    }
  };

  return (
    <AppContext.Provider
      value={{
        driverData,
        setDriverData,
        journyData,
        setJournyData,
        isDriving,
        setIsDriving,
        getDriverData,
        journeyData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
