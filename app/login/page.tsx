"use client";
import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
// import { useRouter } from "next/navigation";

interface Values {
  phone: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  //   const router = useRouter();
  const formik = useFormik<Values>({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone number is required")
        .matches(
          /^[6-9]\d{9}$/,
          "Phone number must be a 10-digit Indian number"
        ),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values: Values, { resetForm }: FormikHelpers<Values>) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const res = await (await fetch("/api/driver/login", options)).json();
        // .then((res) => res.json())
        // .then((data) => {
        //   console.log(data);
        // });
        //  const res = await axios.post("/api/driver/login", values);
        if (res.status === "success") {
          toast.success("Login successful");
          //   cookies().set("token", response.data.token, { expires: 7 }); // Expires in 7 days

          console.log(res);

          resetForm();
          if (res.isAdmin) {
            window.location.href = "/admin";
          } else {
            window.location.href = "/profile";
          }
        } else {
          toast.error(res.message);
          console.log(res);
        }
      } catch (error: any) {
        console.error("Error logging in:", error);
        toast.error("Login failed");
      }
    },
  });

  return (
    <main className="w-full h-screen bg-[#6C63FF] max-h-screen overflow-hidden">
      <p className="flex  text-3xl md:text-4xl text-white py-10 px-2">Login</p>

      <div className="w-full h-full px-6 pb-10  pt-20  bg-white rounded-lg rounded-t-3xl lg:flex lg:flex-col lg:justify-center lg:pt-0 ">
        <Image
          src="/logo.png"
          alt="saboo_rks_logo"
          width={300}
          height={300}
          className="mx-auto mb-6 h-auto w-auto"
        />
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-6">
            <label className="block mb-2 text-sm" htmlFor="phone">
              Phone Number*
            </label>{" "}
            <input
              className={`appearance-none w-full py-2.5 leading-tight focus:outline-none focus:shadow-outline bg-none border-b-2 text-sm bg-transparent border-b-black focus:bg-transparent px-0.5 ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 text-red-600"
                  : "text-gray-900"
              }`}
              id="phone"
              type="text"
              maxLength={10}
              minLength={10}
              autoComplete="off"
              {...formik.getFieldProps("phone")}
              placeholder="Enter your phone number"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="relative mb-8">
            <label className="block mb-2 text-sm" htmlFor="password">
              Password
            </label>
            <input
              className={`appearance-none w-full py-2.5 leading-tight focus:outline-none focus:shadow-outline bg-none border-b-2 text-sm bg-transparent border-b-black px-0.5 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 text-red-600"
                  : "text-gray-700"
              }`}
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              placeholder="Enter your password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 flex items-center pr-3 text-lg leading-5 cursor-pointer top-9"
            >
              {showPassword ? (
                <VscEye className="text-gray-800" />
              ) : (
                <VscEyeClosed className="text-gray-800" />
              )}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full p-4 text-white bg-[#6C63FF] rounded-lg select-none focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>
          <p className="pt-4 text-xs text-center">
            Don&apos;t have an account? <br /> Contact your Branch Manager
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
