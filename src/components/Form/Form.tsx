"use client";

import {
  createElement,
  ComponentClass,
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Form, Field } from "react-final-form";
import { Dropdown } from "primereact/dropdown";
import "./Form.scss";

export interface FormItemDescribe {
  label?: string;
  props?: any;
  children?: Array<FormItemDescribe>;
  name: string;
  required?: boolean;
  component: FunctionComponent | ComponentClass | string;
}

export type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
} & Omit<T, K>;

export type FormItemDescribeRequired = CustomRequired<
  FormItemDescribe,
  "name" | "component"
>;

// export function FormDropdown({ optionsFunction, run, ...props }: any) {
//   // TODO 考虑是否需要放进来，还是就在业务页面完成
//   const [options, setOptions] = useState([]);

//   const memoAsync = useMemo(() => {
//     return (next: (data: any) => void) => {
//       optionsFunction(next);
//     };
//   }, [run]);

//   useEffect(() => {
//     const p = new Promise((resolve, reject) => {
//       if (typeof optionsFunction !== "function") {
//         resolve(props.options || []);
//       }
//       if (run) memoAsync(resolve);
//     });
//     p.then((data: any) => {
//       setOptions(data);
//     });
//   }, [memoAsync, run]);

//   return <Dropdown options={options} {...props} />;
// }

export function FormItem( { label, component, props, children = [], name, required,}) {
  // const { label, component, props, children = [], name, required } = describe;
  debugger;
  const ifValid = (meta: any) => !(meta.touched && meta.error);
  const getFormErrorMessage = (meta: any) => {
    return (
      !ifValid(meta) && <small style={{ color: "#FF0000" }}>{meta.error}</small>
    );
  };
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        return (
          <div
            className={`common-form-item flex flex-col ${
              !ifValid(meta) ? "invalid" : ""
            }`}
            style={{ gap: "13px" }}
          >
            <label
              htmlFor={label}
              className="common-form-label flex items-center"
            >
              {required && <i className="pi pi-asterisk" />}
              {label}
            </label>
            {createElement(
              component,
              {
                ...props,
                ...input,
                onChange: e => {
                  props?.onChange(e.value ?? e)
                  input.onChange(e.value ?? e)
                }
              }
            )}
            <span style={{ marginTop: "-10px" }}>
              {getFormErrorMessage(meta)}
            </span>
          </div>
        );
      }}
    ></Field>
  );
}

export const useForm = (Content: FunctionComponent | ComponentClass): any => {
  const _form = useRef(null);
  const render = useMemo(() => {
    return function Form({ form, ...props }: any) {
      useEffect(() => {
        _form.current = form;
      }, []);
      return <Content {...props} />;
    };
  }, [Content]);
  return [_form, render];
};

export default function CommonForm(props: any) {
  return (
    <>
      <Form
        {...props}
        onSubmit={props.onSubmit}
        validate={props.validate}
        render={props.render}
      ></Form>
    </>
  );
}
