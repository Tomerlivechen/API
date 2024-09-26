import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";

function Register() {
  const [viewPassword, setviewPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const viewPass = () => {
    setviewPassword((prevviewPassword) =>
      prevviewPassword === "password" ? "text" : "password"
    );
  };
  const validationScheme = Yup.object({
    email: Yup.string()
      .email("Bad Email")
      .required("The email address is required"),
    userName: Yup.string().min(2).max(25).required("The user name is required"),
    password: Yup.string()
      .min(8)
      .max(30)
      .required("The password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Must match password"
    ),
    prefix: Yup.string().min(2).max(5),
    first_Name: Yup.string().min(2).max(25).required("First name is required"),
    last_Name: Yup.string().min(2).max(30).required("Last name is required"),
    pronouns: Yup.string().min(2).max(10),
    permissionLevel: Yup.string()
      .required("Please select an option")
      .notOneOf([""], "Please select a valid option"),
  });
  const initalValues = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    prefix: "",
    first_Name: "",
    last_Name: "",
    pronouns: "",
    imageURL: "",
    permissionLevel: "",
  };
  return (
    <>
      <Formik
        initialValues={initalValues}
        validationSchema={validationScheme}
        onSubmit={(o) => {
          setIsLoading(true);
          auth
            .register(
              o.email,
              o.userName,
              o.password,
              o.prefix,
              o.first_Name,
              o.last_Name,
              o.pronouns,
              "https://i.imgur.com/5O66TYJ.gif",
              o.permissionLevel
            )
            .then((response) => {
              dialogs.success("Register Succefull").then(() => {
                navigate("/");
              });
            })
            .catch((error) => {
              if (error && error.response && error.response.data) {
                const errorMessages = error.response.data["Register Failed"];
                if (Array.isArray(errorMessages)) {
                  const message = errorMessages.join(" & ");
                  dialogs.error(message);
                } else {
                  dialogs.error("An unknown error occurred.");
                }
              } else {
                dialogs.error("An error occurred. Please try again.");
              }
            })
            .finally(() => {
              setIsLoading(false);
              console.log();
            });
        }}
      >
        <Form className="mt-5">
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="email">Email Address</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="email"
              name="email"
              type="text"
              placeholder="Email Address"
              required
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="userName">User Name</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="userName"
              name="userName"
              type="text"
              placeholder="User Name"
              required
            />
            <ErrorMessage
              name="userName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="password">Password</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="password"
              name="password"
              type={viewPassword}
              placeholder="Password"
              required
            />
            <FaRegEye onClick={viewPass} />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="confirmPassword"
              name="confirmPassword"
              type={viewPassword}
              placeholder="Confirm Password"
              required
            />

            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="prefix">Prefix</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="prefix"
              name="prefix"
              type="text"
              placeholder="Prefix"
              required
            />
            <ErrorMessage
              name="prefix"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="first_Name">First Name</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="first_Name"
              name="first_Name"
              type="text"
              placeholder="First Name"
              required
            />

            <ErrorMessage
              name="first_Name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="last_Name">Last Name</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="last_Name"
              name="last_Name"
              type="text"
              placeholder="Last Name"
              required
            />

            <ErrorMessage
              name="last_Name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="pronouns">Pronouns</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="pronouns"
              name="pronouns"
              type="text"
              placeholder="Pronouns"
            />

            <ErrorMessage
              name="pronouns"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label htmlFor="premissionLevel">User Type</label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="permissionLevel"
              name="permissionLevel"
              as="select"
              required
            >
              <option value="">Select a user type</option>
              <option value="User">Basic User</option>
              <option value="PowerUser">Power User</option>
            </Field>
            <ErrorMessage
              name="permissionLevel"
              component="div"
              className="text-red-500"
            />
          </div>

          {isLoading && (
            <>
              <div className=" flex flex-col items-center">
                <ClimbBoxSpinner /> <br />
              </div>
            </>
          )}
          <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <button
              disabled={isLoading}
              type="submit"
              className="text-red-300 bg-green-700 font-bold p-3"
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default Register;
