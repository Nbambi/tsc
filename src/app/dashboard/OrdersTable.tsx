"use client"

import Table from "@/components/Table/Table";
import TableAction from "@/components/Table/TableAction";
import { Column } from "primereact/column";

export default function OrderTable() {
  const dataList = [
    {
      orderId: "001",
    },
  ];

  return (
    <Table dataList={dataList} totalNum={1} onPageChange={() => {}}>
      <Column field="orderId" header="Order ID" sortable></Column>
      <Column field="" header="Order Status"></Column>
      <Column field="" header="Order Quantity"></Column>
      <Column field="" header="Side"></Column>
      <Column field="" header="Price" sortable></Column>
      <Column field="" header="Instrument Name"></Column>
      <Column field="" header="Settle Date" sortable></Column>
      <Column field="" header="System Creation Date" sortable></Column>
      <Column
        header="Action"
        bodyStyle={{ textAlign: "center" }}
        body={(rowData: any) => {
          return (
            <TableAction>
              <div>Delete</div>
              <div>Update</div>
              <div>Order Matching</div>
            </TableAction>
          );
        }}
      ></Column>
    </Table>
  );
}
