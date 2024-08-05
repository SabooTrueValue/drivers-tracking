"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface AddNewDriverProps {
  showAddUserForm: boolean;
  setShowAddUserForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Phone number must be a 10-digit Indian number"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password must be at most 20 characters"),
  employeeId: Yup.string()
    .min(4, "Employee ID must be 4 characters")
    .max(4, "Employee ID must be 4 characters")
    .matches(/^\d{4}$/, "Employee ID must be a 4-digit number"),
});

const handleSubmit = async (
  values: any,
  { resetForm }: { resetForm: () => void }
) => {
  try {
    // Example API call
    const response = await axios.post("/api/driver/user", {
      name: values.name,
      phone: values.phone,
      password: values.password,
      employeeId: values.employeeId ? values.employeeId : "NA",
      isVerified: true,
    });

    console.log("API response:", response);
    if (response.status === 201) {
      toast.success("Driver added successfully!");
      resetForm();
    } else {
      console.log(response);
      // toast.error(response.message);
    }
  } catch (error: any) {
    console.error("Error adding driver:", error);
    toast.error(error.response.data.message || "Error adding driver");
  }
};

const AddNewDriver: React.FC<AddNewDriverProps> = ({
  showAddUserForm,
  setShowAddUserForm,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-full p-2 bg-white rounded-lg md:mt-4">
      <p className="mb-4 text-lg md:text-xl lg:text-2xl">Add New Driver</p>

      <Formik
        initialValues={{
          name: "",
          phone: "",
          password: "",
          employeeId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="grid gap-4 md:grid-cols-4 lg:gap-6 lg:grid-cols-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter driver's name"
                  className="block w-full px-2 py-2 border rounded-md shadow-sm bg-gray-50 border-blue-500/50 lg:py-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  id="phone"
                  name="phone"
                  autoComplete="off"
                  placeholder="Enter driver's phone number"
                  className="block w-full px-2 py-2 border rounded-md shadow-sm bg-gray-50 border-blue-500/50 lg:py-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee ID
                </label>
                <Field
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter driver's employee ID"
                  className="block w-full px-2 py-2 border rounded-md shadow-sm bg-gray-50 border-blue-500/50 lg:py-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="employeeId"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Enter password"
                  className="block w-full px-2 py-2 border rounded-md shadow-sm bg-gray-50 border-blue-500/50 lg:py-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute  right-0 flex items-center pr-3 text-lg leading-5 cursor-pointer top-9"
                >
                  {showPassword ? (
                    <VscEye className="text-gray-800" />
                  ) : (
                    <VscEyeClosed className="text-gray-800" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                aria-label="Add Driver"
                className="px-4 py-2 mt-6 text-white bg-blue-800 rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 md:px-6 lg:px-10"
              >
                Add Now
              </button>
              {showAddUserForm && (
                <button
                  type="button"
                  onClick={() => setShowAddUserForm(false)}
                  aria-label="Cancel"
                  className="px-4 py-2 mt-6 text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 focus:ring-2 md:px-6 lg:px-10"
                >
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewDriver;
