import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import CommonForm, { FormItem, useForm } from "@/components/Form/Form";

interface IAddCashDialogProps {
  visible: boolean;
  onClose: () => void;
  callback?: () => void;
}

export default function AddCashDialog(props: IAddCashDialogProps) {
  const FormContent = ({ handleSubmit }: any) => {
    return (
      <form onSubmit={handleSubmit}>
        <FormItem
          required
          name="instrumentName"
          component={Dropdown}
          label="Instrument name"
          props={{
            optionLabel: "name",
            options: [],
          }}
        />
        <FormItem
          required
          name="quantity"
          component={InputText}
          label="Quantity"
        />
        <FormItem
          required
          name="transactionType"
          component={Dropdown}
          label="Transaction Type"
          props={{
            optionLabel: "name",
            options: [],
          }}
        />
      </form>
    );
  };

  const onSubmit = (data: any, form: any) => {
    console.info("submit data:", data);
    alert("in submit!!!");
  };

  const validate = (data: any) => {
    let errors: { [k: string]: string } = {};
    const required = ["instrumentName", "quantity", "transactionType"];
    required.forEach((item) => {
      if (!data[item]) {
        errors[item] = "required";
      }
    });
    return errors;
  };

  const [instance, render] = useForm(FormContent as any);

  return (
    <Dialog
      visible={props.visible}
      style={{ width: "60vw" }}
      onHide={props.onClose}
      header={
        <div
          className="main-title-contaienr no-border"
          style={{ padding: "0px" }}
        >
          <p className="main-title">Add Cash Transaction</p>
        </div>
      }
    >
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
          onClick={props.onClose}
        />
        <Button rounded label="Create" severity="help" />
      </div>
    </Dialog>
  );
}
