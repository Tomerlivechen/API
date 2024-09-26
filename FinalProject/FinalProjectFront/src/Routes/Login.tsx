import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";

function login() {
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
    password: Yup.string()
      .min(8)
      .max(30)
      .required("The password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
  });
  const initalValues = {
    email: "",
    password: "",
  };
  return (
    <>
      <Formik
        initialValues={initalValues}
        validationSchema={validationScheme}
        onSubmit={(o) => {
          setIsLoading(true);
          auth
            .login(o.email, o.password)
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
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default login;
