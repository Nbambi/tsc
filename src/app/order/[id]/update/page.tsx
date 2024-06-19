"use client";

import CommonForm, { FormItem, useForm } from "@/components/Form/Form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      <FormItem
        name="clientOrderID"
        component={InputText}
        label="Client Order ID"
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

export default function UpdateOrderPage({ params }: any) {
  const [orderId, setOrderId] = useState<string>("");
  const [instance, render] = useForm(FormContent as any);
  const router = useRouter();

  const fetchOrderInfo = async () => {
    // const res = await fetch(`/api/order/${orderId}`);
    // const data = await res.json();
    // instance?.current?.setValues(data);
  };

  const onSubmit = (data: any, form: any) => {
    console.info("submit data:", orderId, data);
    alert("in submit!!!");
  };

  const validate = (data: any) => {
    let errors: { [k: string]: string } = {};
    const required = [
      "orderQuantity",
      "side",
      "price",
      "priceType",
      "currency",
      "instrument",
      "settleDate",
      "interestedParty",
    ];
    required.forEach((item) => {
      if (!data[item]) {
        // errors[item] = "required";
      }
    });
    if (data.clientOrderID && data.clientOrderID.length > 255) {
      errors.clientOrderID = "no longer than 255 characters ";
    }
    return errors;
  };

  useEffect(() => {
    // 从路由获取参数
    const _id = params?.id;
    setOrderId(_id);
    if (_id) {
      fetchOrderInfo();
    } else {
      instance?.current?.setValues({});
    }
  }, [params]);

  return (
    <>
      <div className="main-card-light">
        <div className="main-title-contaienr no-border mb-8">
          <p className="main-title">Order Update</p>
        </div>

        <div style={{ margin: "0px 14px" }}>
          <CommonForm
            onSubmit={onSubmit}
            validate={validate}
            render={render}
          ></CommonForm>
          <div className="operate-footer">
            <Button
              rounded
              label="Cancel"
              severity="secondary"
              onClick={() => router.back()}
            ></Button>
            <Button
              rounded
              label="Save"
              severity="help"
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
