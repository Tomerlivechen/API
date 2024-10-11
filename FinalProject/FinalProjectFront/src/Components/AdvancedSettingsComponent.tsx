import { useEffect, useState } from "react";
import { IAppUserEdit, IEditUser } from "../Models/UserModels";
import ElementFrame from "../Constants/Objects/ElementFrame";
import {
  FormikElementBuilder,
  MYFormikValues,
} from "../Constants/FormikElementBuilder";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { colors } from "../Constants/Patterns";
import { useUser } from "../CustomHooks/useUser";
import { dialogs } from "../Constants/AlertsConstant";
import { auth } from "../Services/auth-service";
import { useNavigate } from "react-router-dom";
export interface AdvancedSettingsComponentProps {
  userToEdit: IAppUserEdit;
  show: boolean;
}

const confirmPasswordValues: MYFormikValues = {
  Title: "Confirm Password",
  element: "confirmPassword",
  type: "text",
  placeholder: "Confirm Password",
  textbox: true,
  required: false,
  hidden: false,
  width: "full",
};

const oldPasswordValues: MYFormikValues = {
  Title: "Old Password",
  element: "oldPassword",
  type: "text",
  placeholder: "Old Password",
  textbox: true,
  required: false,
  hidden: false,
  width: "full",
};

const newPasswordValues: MYFormikValues = {
  Title: "New Password",
  element: "newPassword",
  type: "text",
  placeholder: "New Password",
  textbox: true,
  required: false,
  hidden: false,
  width: "full",
};

const AdvancedSettingsComponent: React.FC<AdvancedSettingsComponentProps> = (
  props
) => {
  const { userToEdit, show } = props;
  const [open, setOpen] = useState(show);
  const [viewPassword, setviewPassword] = useState("password");
  newPasswordValues.type = viewPassword;
  confirmPasswordValues.type = viewPassword;
  oldPasswordValues.type = viewPassword;
  const userContex = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const viewPass = () => {
    setviewPassword((prevviewPassword) =>
      prevviewPassword === "password" ? "text" : "password"
    );
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);
  const validationScheme = Yup.object({
    oldPassword: Yup.string()
      .min(8)
      .max(30)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
    newPassword: Yup.string()
      .min(8)
      .max(30)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must between 8 to 30 characters, have uppercase and lowecase letter, number and special character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Must match password"
    ),
    permissionLevel: Yup.string()
      .required("Please select an option")
      .notOneOf([""], "Please select a valid option"),
  });
  const handleClick = () => {
    // eslint-disable-next-line no-debugger
    debugger; // Execution will pause here
    console.log("Button clicked");
  };

  const userValues: IEditUser = {
    oldPassword: "",
    newPassword: "",
    permissionLevel: userContex.userInfo.PermissionLevel ?? "",
  };

  const handleSubmit = async (values) => {
    console.log("Form submitted with values: ", values);
    handleClick();
    await auth.manage(values);
  };

  return (
    <>
      {open && (
        <>
          {" "}
          <ElementFrame height="350xp" width="700xp" padding="2">
            <Formik
              initialValues={userValues}
              validationSchema={validationScheme}
              onSubmit={handleSubmit}
            >
              <Form className="mt-5">
                <div>
                  {" "}
                  <div className="flex flex-wrap justify-between">
                    <div className="w-3/12 pl-2 pr-2">
                      <FormikElementBuilder {...oldPasswordValues} />
                    </div>
                    <div className="w-1/12  mt-6 -ml-16 ">
                      {viewPassword == "text" ? (
                        <FaRegEye size={25} onClick={viewPass} />
                      ) : (
                        <RxEyeClosed size={25} onClick={viewPass} />
                      )}
                    </div>
                    <div className="w-4/12 pl-2 pr-2">
                      <FormikElementBuilder {...newPasswordValues} />
                    </div>
                    <div className="w-3/12 pr-2">
                      <FormikElementBuilder {...confirmPasswordValues} />
                    </div>
                  </div>
                </div>
                <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                  <label htmlFor="premissionLevel">User Type</label>
                  <Field
                    className={`rounded-md hover:border-2 border-2 px-2 py-2 ${colors.ElementFrame}`}
                    id="permissionLevel"
                    name="permissionLevel"
                    as="select"
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
                <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
                  <button
                    disabled={isLoading}
                    type="submit"
                    onClick={() => console.log("click")}
                    className={`${colors.Buttons} p-3`}
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </ElementFrame>{" "}
        </>
      )}
    </>
  );
};

export { AdvancedSettingsComponent };
