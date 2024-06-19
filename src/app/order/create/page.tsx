"use client";

import CommonForm, { FormItem, useForm } from "@/components/Form/Form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Link from "next/link";

const FormContent = ({ handleSubmit }: any) => {
  const side_Options = [
    {
      name: "Buy",
      code: "Buy",
    },
    {
      name: "Sell",
      code: "Sell",
    },
  ];
  const priceType_options = [
    {
      name: "Percentage",
      code: "Percentage",
    },
    {
      name: "Per Unit",
      code: "Per Unit",
    },
    {
      name: "Fixed Amount",
      code: "Fixed Amount",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormItem name="orderID" component={InputText} label="Order ID" />
      <FormItem
        name="clientOrderID"
        component={InputText}
        label="Client Order ID"
      />
      <FormItem
        required
        name="orderStatus"
        component={InputText}
        label="Order Status"
        props={{
          disabled: true,
          variant: "filled",
        }}
      />
      <FormItem
        required
        name="orderQuantity"
        component={InputText}
        label="Order Quantity"
      />
      <FormItem
        required
        name="side"
        component={Dropdown}
        label="Side"
        props={{
          optionLabel: "name",
          options: side_Options,
        }}
      />
      <FormItem
        required
        name="orderType"
        component={Dropdown}
        label="Order Type"
        props={{
          optionLabel: "name",
          options: [],
        }}
      />
      <FormItem required name="price" component={InputText} label="Price" />
      <FormItem
        required
        name="priceType"
        component={Dropdown}
        label="Price Type"
        props={{
          optionLabel: "name",
          options: priceType_options,
        }}
      />
      <FormItem
        required
        name="currency"
        component={Dropdown}
        label="Currency"
        props={{
          optionLabel: "name",
        }}
      />
      <FormItem
        required
        name="instrument"
        component={Dropdown}
        label="Instrument"
        props={{
          optionLabel: "name",
        }}
      />
      <FormItem
        name="settleType"
        component={Dropdown}
        label="Settle Type"
        props={{
          optionLabel: "name",
        }}
      />
      <FormItem
        required
        name="settleDate"
        component={Calendar}
        label="Settle Date"
        props={{
          selectionMode: "range",
          readOnlyInput: true,
          hideOnRangeSelection: true,
          onChange: () => {},
        }}
      />
      <FormItem
        required
        name="interestedParty"
        component={InputText}
        label="Interested Party"
      />
    </form>
  );
};

export default function CreateOrderPage() {
  const [instance, render] = useForm(FormContent as any);

  const onSubmit = (data: any, form: any) => {
    console.info("submit data:", data);
    alert("in submit!!!");
  };

  const validate = (data: any) => {
    let errors: { [k: string]: string } = {};
    const required = [
      "orderStatus",
      "orderQuantity",
      "side",
      "orderType",
      "price",
      "priceType",
      "currency",
      "instrument",
      "settleDate",
      "interestedParty",
    ];
    required.forEach((item) => {
      if (!data[item]) {
        errors[item] = "required";
      }
    });
    if (data.orderID && data.orderID.length > 255) {
      errors.orderID = "no longer than 255 characters ";
    }
    if (data.clientOrderID && data.clientOrderID.length > 255) {
      errors.clientOrderID = "no longer than 255 characters ";
    }
    return errors;
  };

  return (
    <>
      <div className="main-card-light">
        <div className="main-title-contaienr no-border mb-8">
          <p className="main-title">Create Order</p>
        </div>

        <div style={{ margin: "0px 14px" }}>
          <CommonForm
            onSubmit={onSubmit}
            validate={validate}
            render={render}
          ></CommonForm>
          <div className="operate-footer">
            <Button severity="secondary" rounded>
              <Link href={"/order"} className="button-for-link">
                Cancel
              </Link>
            </Button>
            <Button
              label="Create"
              severity="help"
              rounded
              onClick={() => {
                instance?.current?.submit?.();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
