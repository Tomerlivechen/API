import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import ElementFrame from "../Constants/Objects/ElementFrame";
import { colors } from "../Constants/Patterns";
import { FormikElementBuilder, MYFormikValues } from "../Constants/FormikElementBuilder";
import { RxEyeClosed } from "react-icons/rx";

const emailValues : MYFormikValues ={
  Title: "Email Address",
  element: "email",
  type: "text",
  placeholder: "Email Address",
  required: true,
  hidden: false,
  width: "full"
}

const userNameValues : MYFormikValues ={
  Title: "User Name",
  element: "userName",
  type: "text",
  placeholder: "User Name",
  required: true,
  hidden: false,
  width: "full"
}

const confirmPasswordValues : MYFormikValues ={
  Title: "Confirm Password",
  element: "confirmPassword",
  type: "text",
  placeholder: "Confirm Password",
  required: true,
  hidden: false,
   width: "full"
}

const passwordValues : MYFormikValues ={
  Title: "Password",
  element: "password",
  type: "text",
  placeholder: "Password",
  required: true,
  hidden: false,
   width: "full"
}

const prefixValues : MYFormikValues ={
  Title: "Prefix",
  element: "prefix",
  type: "text",
  placeholder: "Prefix",
  required: true,
  hidden: false,
  width: "full"
}

const firstNameValues : MYFormikValues ={
  Title: "First Name",
  element: "first_Name",
  type: "text",
  placeholder: "First Name",
  required: true,
  hidden: false,
  width: "full"
}
const lastNameValues : MYFormikValues ={
  Title: "Last Name",
  element: "last_Name",
  type: "text",
  placeholder: "Last Name",
  required: true,
  hidden: false,
  width: "full"
}

const pronounsValues : MYFormikValues ={
  Title: "Pronouns",
  element: "pronouns",
  type: "text",
  placeholder: "Pronouns",
  required: true,
  hidden: false,
  width: "full"
}


function Register() {
  const [viewPassword, setviewPassword] = useState("password");
  passwordValues.type=viewPassword;
  confirmPasswordValues.type=viewPassword;
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
    <div className="flex justify-center">
    <ElementFrame height="750px" width="700px" overflowY="auto" padding="0 pb-4">
    <div className={`text-4xl font-bold  text-center ${colors.ButtonFont}`}>
                        Register
      </div>
      <Formik
        initialValues={initalValues}
        validationSchema={validationScheme}
        onSubmit={(o) => {
          console.log(o);
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
        <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...emailValues} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder {...userNameValues} />
                </div>
              </div>
          <div className="flex flex-wrap justify-between">
                <div className="w-6/12 pl-2 pr-2">
                  <FormikElementBuilder {...passwordValues} />
                </div>
                <div className="w-1/12  mt-6 -ml-16 ">
                {viewPassword == "text" ? <FaRegEye size={25}  onClick={viewPass} /> : <RxEyeClosed size={25}  onClick={viewPass} />}
                </div>
                <div className="w-6/12 pr-2">
                  <FormikElementBuilder {...confirmPasswordValues} />
                </div>
              </div>
          <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...prefixValues} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder {...firstNameValues} />
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 pr-2 pl-2">
                  <FormikElementBuilder {...lastNameValues} />
                </div>
                <div className="w-1/2 pl-2 pr-2">
                  <FormikElementBuilder {...pronounsValues} />
                </div>
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
              onClick={()=>console.log("click")}
              className={`${colors.Buttons} p-3`}
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
      </ElementFrame>
      </div>
    </>
  );
}

export default Register;
