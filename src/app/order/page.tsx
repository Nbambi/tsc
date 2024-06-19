"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import Table from "@/components/Table/Table";
import TableAction from "@/components/Table/TableAction";
import DelOrderConfirm from "./DelOrderConfirm";
import MatchDialog from "./MatchDialog";

const initialState = {
  searchParams: {},
  pageNumber: 1,
  pageSize: 10,
  sortField: null,
  sortOrder: null,
  dataList: [],
  total: 0,
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case "onSearchChange":
      return { ...state, payload };
    case "onPageChange":
      const { pageNumber, pageSize } = payload;
      return { ...state, pageNumber, pageSize };
    case "onSortChange":
      const { sortField, sortOrder } = payload;
      return { ...state, sortField, sortOrder };
    case "onDataChange":
      return { ...state, dataList: payload.dataList, total: payload.total };
    default:
      throw new Error();
  }
};

export default function OrderPage() {
  const operatingId = useRef<string>("");
  const [delVisible, setDelVisible] = useState<boolean>(false);
  const [matchVisible, setMatchVisible] = useState<boolean>(false);

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState: any) => initialState
  );

  /** TODO Request Table Data */
  const getTableList = () => {
    setTimeout(() => {
      const params: any = { ...(state.searchParams ?? {}) };
      params.pageNumber = state.pageNumber;
      params.pageSize = state.pageSize;

      if (state.sortField) {
        params.sortCriteria = {
          field: state.sortField,
          isAsc: state.sortOrder === 1,
        };
      }
      console.info("所有请求参数：：", params);
      const list = [
        { orderId: "001", orderStatus: "new" },
        { orderId: "002", orderStatus: "new" },
        { orderId: "003", orderStatus: "partiallyFilled" },
        { orderId: "004", orderStatus: "filled" },
        { orderId: "005", orderStatus: "new" },
        { orderId: "006", orderStatus: "filled" },
        { orderId: "007", orderStatus: "partiallyFilled" },
        { orderId: "008", orderStatus: "new" },
        { orderId: "009", orderStatus: "new" },
        { orderId: "010", orderStatus: "filled" },
      ];

      dispatch({
        type: "onDataChange",
        payload: { dataList: list, total: list.length },
      });
    }, 500);
  };

  const handlePageChange = (params: any) => {
    dispatch({ type: "onPageChange", payload: params });
  };

  const formatOrderStatus = (rowData: any) => {
    let severity: any = "";
    switch (rowData?.orderStatus) {
      case "new":
        severity = "new";
        break;
      case "partiallyFilled":
        severity = "warning";
        break;
      case "filled":
        severity = "success";
        break;
    }
    return <Tag severity={severity} value={rowData?.orderStatus}></Tag>;
  };

  const handleDelete = (id: string) => {
    operatingId.current = id;
    setDelVisible(true);
  };

  const handleMatch = (id: string) => {
    operatingId.current = id;
    setMatchVisible(true);
  };

  useEffect(() => {
    getTableList();
  }, [
    state.pageNumber,
    state.pageSize,
    state.sortField,
    state.sortOrder,
    state.searchParams,
  ]);

  return (
    <>
      <div className="main-card-light">
        <div className="main-title-contaienr mb-8">
          <p className="main-title">ORDER LIST</p>
          <Button severity="help" rounded>
            <Link href={`/order/create`} className="button-for-link">
              Create Order
            </Link>
          </Button>
        </div>

        <div className="search-form-container mb-8">
          <InputText value={undefined} placeholder="order ID" />
          <Calendar
            value={null}
            placeholder="Settle Date Range"
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            showButtonBar
          />
          <Dropdown
            value={[]}
            options={[]}
            optionLabel="name"
            placeholder="Order Status"
          />
          <Dropdown
            value={[]}
            options={[]}
            optionLabel="name"
            placeholder="Instrument Name"
          />
          <Dropdown
            value={[]}
            options={[]}
            optionLabel="name"
            placeholder="Side"
          />
        </div>

        <Table
          dataList={state.dataList}
          totalNum={state.total}
          onPageChange={handlePageChange}
          empty={
            <>
              <p>No Order Right Now</p>
              <p>Please Create New Order or Switch Account Nickname</p>
            </>
          }
          sortField={state.sortField}
          sortOrder={state.sortOrder}
          onSort={(event: any) => {
            dispatch({ type: "onSortChange", payload: event });
          }}
        >
          <Column field="orderId" header="Order ID" sortable></Column>
          <Column header="Order Status" body={formatOrderStatus}></Column>
          <Column field="orderQuantity" header="Order Quantity"></Column>
          <Column field="side" header="Side"></Column>
          <Column field="price" header="Price" sortable></Column>
          <Column field="instrumentName" header="Instrument Name"></Column>
          <Column field="settleDate" header="Settle Date" sortable></Column>
          <Column
            field="systemCreationTime"
            header="System Creation Time"
            sortable
          ></Column>
          <Column
            header="Action"
            bodyStyle={{ textAlign: "center" }}
            body={(rowData: any) => {
              return (
                <TableAction>
                  <div onClick={() => handleDelete(rowData.orderId)}>
                    Delete
                  </div>
                  <div>
                    <Link href={`/order/${rowData.orderId}/update`}>
                      Update
                    </Link>
                  </div>
                  <div onClick={() => handleMatch(rowData.orderId)}>
                    Order Matching
                  </div>
                  <div>
                    <Link href={`/order/${rowData.orderId}`}>View Detail</Link>
                  </div>
                </TableAction>
              );
            }}
          ></Column>
        </Table>
      </div>

      <DelOrderConfirm
        orderId={operatingId.current}
        visible={delVisible}
        onClose={() => setDelVisible(false)}
        callback={getTableList}
      />

      <MatchDialog
        orderId={operatingId.current}
        visible={matchVisible}
        onClose={() => setMatchVisible(false)}
        callback={getTableList}
      />
    </>
  );
}
