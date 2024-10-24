import * as Yup from "yup";
import { INewSocialGroup } from "../../Models/SocialGroup";
import { Form, Formik, FormikHelpers } from "formik";
import { FormikElementBuilder, MYFormikValues } from "../FormikElementBuilder";
import { useState } from "react";
import { colors } from "../Patterns";
import ElementFrame from "./ElementFrame";
import { BsPatchPlusFill } from "react-icons/bs";
import { Tooltip } from "react-bootstrap";
import { Groups } from "../../Services/group-service";
const nameValues: MYFormikValues = {
  Title: "Group Name",
  element: "name",
  type: "text",
  placeholder: "Group Name",
  required: true,
  hidden: false,
  textbox: true,
  width: "full",
};
const descriptionlValues: MYFormikValues = {
  Title: "Group Description",
  element: "description",
  type: "text",
  placeholder: "Group Description",
  required: true,
  hidden: false,
  textbox: true,
  width: "full",
};
const GroupCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const groupValues: INewSocialGroup = {
    name: "",
    description: "",
  };
  const validationScheme = Yup.object({
    name: Yup.string().min(2).max(25).required("The group name is required"),
    description: Yup.string()
      .min(2)
      .max(200)
      .required("The group description is required"),
  });

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const createGroup = async (submitValues: INewSocialGroup) => {
    setIsLoading(true);
    await Groups.CreateGroup(submitValues);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <div>
        <button
          onClick={toggleOpen}
          className="ml-6 flex items-center p-2 border rounded"
        >
          <Tooltip title="Create Group">
            <div className="flex items-center">
              <span className="mr-2">Create new Group</span>
              <BsPatchPlusFill size={30} />
            </div>
          </Tooltip>
        </button>

        {open && (
          <div className="mt-4">
            <ElementFrame padding={"3"}>
              <Formik
                initialValues={groupValues}
                validationSchema={validationScheme}
                onSubmit={(o) => {
                  createGroup(o);
                }}
              >
                <Form className="mt-5">
                  <div className="w-full">
                    <div className={`w-full pr-2 pl-2 `}>
                      <FormikElementBuilder {...nameValues} />
                    </div>
                    <div className="w-full pl-2 pr-2">
                      <FormikElementBuilder {...descriptionlValues} />
                    </div>
                  </div>

                  <div className="font-extralight rounded-md border-2 form-group flex flex-col  text-lg mt-5">
                    <button
                      disabled={isLoading}
                      type="submit"
                      onClick={() => console.log("click")}
                      className={`${colors.Buttons} p-1`}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </ElementFrame>
          </div>
        )}
      </div>
    </>
  );
};
export { GroupCreation };
