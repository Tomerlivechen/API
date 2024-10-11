import { ErrorMessage, Field } from "formik"
import { colors } from "./Patterns"
import { CSSProperties } from "react";

export interface MYFormikValues {
Title? : string,
element: string,
type: string,
placeholder: string,
required: boolean,
hidden: boolean,
value?: string,
style?: CSSProperties,
as? : string,
textbox?: boolean,
width?: string,
classes?: string,
onChange?:  (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const FormikElementBuilder =(initalValues :MYFormikValues)=> {
const divClassName = colors.FormikDiv;
const fieldClassName =colors.ForkikField;
const textboxParams = colors.TextBox;

    return (
        <>
<div className={`${divClassName} ${initalValues.width ? initalValues.width : "w-1/2"}`}>
    {initalValues.Title &&
<label htmlFor={initalValues.element}>{initalValues.Title}</label>}
<Field
  className={`${fieldClassName}${initalValues.textbox && textboxParams} ${initalValues.classes}`}
  id={initalValues.element}
  name={initalValues.element}
  type={initalValues.type}
  placeholder={initalValues.placeholder}
  required = {initalValues.required}
  hidden = {initalValues.hidden}
  style={initalValues.style}
  value={initalValues.value}
  as =  {initalValues.as}
  {...(initalValues.onChange ? { onChange: initalValues.onChange } : {})}
/>
<ErrorMessage
  name={initalValues.element}
  component="div"
  className="text-red-500"
/>
</div>
</>
    )
}

    export {FormikElementBuilder}