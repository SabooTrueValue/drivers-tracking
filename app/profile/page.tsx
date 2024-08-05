"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";

const Home: React.FC = () => {
  // const { driverData, setDriverData } = useData();
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
  location: Location[];
  createdAt: Date;
  updatedAt: Date;
  // Add other properties as needed
}

 const [journyData, setJournyData] = useState<JourneyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [driverData, setDriverData] = useState<DriverData | null>(null);

  useEffect(() => {
    const getDriverData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/driver/user`);
        console.log(response.data?.data);
        setDriverData(response.data?.data);
        // setJournyData(response.data.journy);
        setIsDriving(response.data.isDriving);
        if(response.data?.journeyData?.length > 0){
          setJournyData(response.data?.journeyData);
        }
        console.log(
          "🚀 ~ file: page.tsx:Home ~ getDriverData ~ response.data:",
          response.data
        );
      } catch (error: any) {
        console.error("Error fetching data in:", error);
        toast.error("Profile not found");
        window.location.href = "/login";
      }finally{
        setLoading(false);
      }
    };
    getDriverData();
  }, []);

  useEffect(() => {
    setIsDriving(driverData?.isDriving ?? false);
  }, [driverData]);

  const formik = useFormik({
    initialValues: {
      vehicleNumber: "",
      modeOfTransPort: "",
    },
    validationSchema: Yup.object({
      vehicleNumber: Yup.string()
        .required("Vehicle Number is required")
        .min(4, "Vehicle Number must be at least 4 characters")
        .max(14, "Vehicle Number must be at most 10 characters"),
      modeOfTransPort: Yup.string().required("Mode of TransPort is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);

        // Example API call
        // const response = await axios.post("http://localhost:8000/login", {
        //   phone: values.phone,
        //   password: values.password,
        // });

        // console.log("API response:", response.data.data.message);
      } catch (error) {
        console.error("Error adding driver:", error);
      }
    },
  });
  const handleLogout = () => {
    Cookies.remove("token");
    setDriverData(null);
    toast.success("Logout Successfully");
    window.location.href = "/login";
  };

  const convertTo12HourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert 0 hours to 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <main className="w-full min-h-screen bg-[#6C63FF]  ">
      <div className="relative h-full  ">
        <div className="flex justify-between px-4 py-5 text-white ">
          <div className="">
            <span className="">Welcome back </span>
            <p className="flex mt-1 text-3xl md:text-4xl">
              {driverData?.name}{" "}
              {isDriving && (
                <span className="relative flex w-3 h-3">
                  <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
                </span>
              )}
            </p>
          </div>
          <div className="text-right ">
            <p className="text-xs md:text-base ">{driverData?.phone}</p>
            <p className="mb-1 text-xs md:text-base md:mb-2">
              {driverData?.employeeId}
            </p>

            <div
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 text-sm duration-200 md:border rounded cursor-pointer hover:text-white py-0.5 select-none md:px-4 bg-white text-indigo-500 hover:bg-indigo-500"
            >
              <span>Logout</span>
              <IoIosLogOut className="text-xl ml-0.5 lg:text-2xl" />
            </div>
          </div>
        </div>
        <div className="w-full h-full p-4 pt-10 bg-white md:p-8 rounded-t-3xl min-h-[90vh] ">
          <div>
            {!isDriving ? (
              <>
                {" "}
                <p className="text-2xl text-indigo-500">Start New Drive</p>
                <p className="pb-6 text-xs ">
                  Enter vehicle number & mode of travel to start drive.
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full max-w-md"
                >
                  <div className="mb-6 ">
                    <label
                      className="block mb-2 text-indigo-500"
                      htmlFor="vehicleNumber"
                    >
                      Vehicle Number*
                    </label>{" "}
                    <input
                      className={`appearance-none  w-full py-2.5  leading-tight focus:outline-none focus:shadow-outline bg-none border-b-2 text-sm bg-transparent border-b-black focus:bg-transparent uppercase  ${
                        formik.touched.vehicleNumber &&
                        formik.errors.vehicleNumber
                          ? "border-red-500 text-red-600 "
                          : "text-gray-900 "
                      }`}
                      id="vehicleNumber"
                      type="text"
                      required
                      // maxLength={14}
                      // minLength={4}
                      autoComplete="off"
                      {...formik.getFieldProps("vehicleNumber")}
                      placeholder="Enter pickup or drop vehicle number"
                    />
                    {formik.touched.vehicleNumber &&
                    formik.errors.vehicleNumber ? (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.vehicleNumber}
                      </div>
                    ) : null}
                  </div>
                  <div className="relative mb-3">
                    <label
                      className="block mb-2 text-indigo-500 "
                      htmlFor="modeOfTransPort"
                    >
                      Transportation Method*
                    </label>
                    <select
                      className={`appearance-none w-full py-2.5 leading-tight focus:outline-none focus:shadow-outline bg-none border-b-2 text-sm bg-transparent border-b-black ${
                        formik.touched.modeOfTransPort &&
                        formik.errors.modeOfTransPort
                          ? "border-red-500 text-red-600"
                          : "text-gray-700"
                      }`}
                      id="modeOfTransPort"
                      required
                      {...formik.getFieldProps("modeOfTransPort")}
                    >
                      <option value="" label="Select transportation method" />
                      <option value="Auto" label="Auto" />
                      <option value="Bike" label="Bike" />
                      <option value="Car" label="Car" />
                      <option value="Bus" label="Bus" />
                      <option value="Metro" label="Metro" />
                      <option value="Train" label="Train" />
                      <option value="Walk" label="Walk" />
                      <option value="Other" label="Other" />
                    </select>
                    {formik.touched.modeOfTransPort &&
                    formik.errors.modeOfTransPort ? (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.modeOfTransPort}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    {!loading && (
                      <button
                        className="w-full h-full p-4 text-white bg-[#6C63FF] rounded-lg shadow-xl shadow-black/50 max-w-md mx-auto text-lg text-center"
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting
                          ? "Starting..."
                          : " Start Drive Now"}
                      </button>
                    )}
                  </div>

                  {/* <div className="fixed left-0 z-10 flex justify-center w-full px-4 bottom-4">
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className={`w-full h-full p-4 text-white bg-[#6C63FF] rounded-lg shadow-xl shadow-black/50 max-w-md mx-auto text-lg text-center`}
                    >
                      Start Drive Now
                    </button>
                  </div> */}
                </form>
              </>
            ) : (
              <>
                <p className="pb-2 text-2xl text-indigo-500">
                  Ongoing Drive for
                </p>
                {/* <p className="pb-2 text-2xl ">{journyData[0]?.vehicleNumber}</p> */}
                {/* Mode of Transport: {journyData[0]?.modeOfTransPort} */}
                <p className="pb-6 text-xs ">
                  Once reached to the destination, please click dropped button
                  or picked button to update status.
                </p>
                {/* {journyData[0]?.status === "Picked up" ||
                journyData[0]?.status === "Dropped" ? ( */}
                <div className="fixed left-0 z-10 flex justify-center w-full gap-4 px-4 bottom-4">
                  <button
                    type="button"
                    // onClick={() =>
                    //   handleWithoutPermission({
                    //     type: "End",
                    //     detail: "Drive Ended",
                    //   })
                    // }
                    className={`w-full h-full p-3 text-white bg-red-500 rounded-lg shadow-xl shadow-black/50 max-w-md mx-auto text-lg`}
                  >
                    End Drive
                  </button>
                </div>
                {/* ) : ( */}
                <div className="fixed left-0 z-10 flex justify-center w-full gap-4 px-4 bottom-4">
                  <button
                    type="button"
                    // onClick={() =>
                    // handleWithoutPermission({
                    //   type: "Update",
                    //   detail: "Picked up",
                    // })
                    // }
                    className={`w-full h-full p-3 text-white bg-[#6C63FF] rounded-lg shadow-xl shadow-black/50 max-w-md mx-auto text-lg`}
                  >
                    Picked up
                  </button>
                  <button
                    type="button"
                    // onClick={() =>
                    // handleWithoutPermission({
                    //   type: "Update",
                    //   detail: "Dropped",
                    // })
                    // }
                    className={`w-full h-full p-3 text-white bg-[#6C63FF] rounded-lg shadow-xl shadow-black/50 max-w-md mx-auto text-lg`}
                  >
                    Dropped
                  </button>
                </div>
                {/* )} */}
              </>
            )}

            <div className={`${!isDriving ? " mt-20" : " mt-8  "} pb-20`}>
              <p className="pb-2 text-xl text-indigo-500 ">
                Todays Drive History
              </p>

              {journyData.length > 0 ? (
                <div className="flex flex-col gap-4 pt-4 md:flex-wrap md:flex-row ">
                  {journyData.map((journey, index) => (
                    <div
                      key={index}
                      className="max-h-[50vh] p-4  bg-white border rounded-lg shadow-sm shadow-black/50 relative max-w-sm"
                    >
                      <div className="flex justify-between py-2 mb-5 bg-white border-b md:flex-row">
                        <p className="text-indigo-500 ">
                          {journey.vehicleNumber}
                        </p>

                        <p className="text-sm text-indigo-500">
                          {/* <strong>Date:</strong>{" "}  */}
                          {journey.date}
                        </p>
                      </div>

                      {journey.location.map((loc, index) => (
                        <div key={index} className="flex gap-1 -mt-1 ">
                          <div className="flex flex-col items-center justify-start w-4 pt-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                            {index < 2 && (
                              <div className="w-1 h-full border-r-2 border-r-indigo-500 border-dashed -ml-0.5 " />
                            )}
                          </div>
                          <div className="">
                            <p className="text-indigo-500">
                              {loc.detail} -{" "}
                              {loc.time ? convertTo12HourFormat(loc.time) : ""}
                            </p>
                            <p className="pb-3 text-xs">
                              {loc.formattedLocation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent drive history.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
