"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import Cookies from "js-cookie";

export default function Home() {
  const [showVehicle, setShowVehicle] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    setTimeout(() => {
      setShowVehicle(true);
    }, 500);
  }, [showVehicle]);

  return (
    <main>
      <div className=" w-full min-h-screen bg-[#6C63FF] flex flex-col justify-end ">
        <video
          src="https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/nexa/thumbnails/slider_video/Jimny_forward.webm"
          playsInline
          className={` bg-transparent opacity-100  mb-10 md:hidden   duration-1000 ${
            showVehicle ? "" : "translate-x-full"
          }`}
          autoPlay
          muted
        ></video>
        <div
          className={`w-full px-8 pt-16 pb-24  bg-white duration-500 transition-all rounded-t-3xl  `}
        >
          <div className="text-center">
            <p className="font-serif text-3xl font-bold">
              Welcome to <br /> <span className="">Saboo RKS</span>{" "}
            </p>
            <p className="py-4">Your journey starts here</p>
            <Link
              href={token ? "/profile" : "/login"}
             
              className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white uppercase bg-[#6C63FF] rounded-full shadow-sm ring-2 ring-offset-4 ring-violet-300 "
            >
              <MdOutlineNavigateNext className="text-5xl animate-pulse" />
            </Link>{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
