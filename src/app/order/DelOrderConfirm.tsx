import Image from "next/image";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";

interface IDelOrderConfirmProps {
  orderId: string;
  visible: boolean;
  onClose: () => void;
  callback?: () => void;
}

export default function DelOrderConfirm(props: IDelOrderConfirmProps) {
  const handleDelete = () => {
    // TODO Request
    // - DELETE /api/v1/order/{id}
    if (props.orderId) {
      alert("delete success!!!");
      props.onClose();

      if (props.callback && typeof props.callback === "function") {
        props.callback();
      }
    } else {
      alert("delete failed!!! not fount order id");
    }
  };

  return (
    <ConfirmDialog
      visible={props.visible}
      style={{ width: "600px" }}
      header={() => (
        <div className="flex gap-2">
          {/* TODO */}
          {/* <Image src="/warning.png" alt="warning img" width={24} height={24} /> */}
          <span>Warning</span>
        </div>
      )}
      footer={() => (
        <>
          <Button
            label="Cancel"
            severity="secondary"
            rounded
            style={{ height: "32px" }}
            onClick={props.onClose}
          />
          <Button
            label="Delete"
            severity="warning"
            rounded
            style={{ height: "32px" }}
            onClick={handleDelete}
          />
        </>
      )}
      message={() => (
        <div
          className="flex flex-col gap-4"
          style={{
            color: "#172B4D",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "600" }}>
            Are you sure you want to DELETE?
          </p>
          <p>Once you delete, you can not find data back.</p>
        </div>
      )}
      onHide={props.onClose}
    />
  );
}
