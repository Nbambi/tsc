"use client";

import { useEffect, useReducer, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Table from "@/components/Table/Table";
import TableAction from "@/components/Table/TableAction";
import AddSecDialog from "./AddSecDialog";
import AddCashDialog from "./AddCashDialog";
import CreateAccDialog from "./CreateAccDialog";
import AccountDetailSidebar from "./DetailSidebar";

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

export default function AccountsPage() {
  const [accountId, setAccountId] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [accDialogVisible, setAccDialogVisible] = useState(false);
  const [secDialogVisible, setSecDialogVisible] = useState(false);
  const [cashDialogVisible, setCashDialogVisible] = useState(false);

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

  const handleDetail = (row: any) => {
    setAccountId(row?.accountId);
    setSidebarVisible(true);
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
          <p className="main-title">ACCOUNT LIST</p>
          <Button
            label="Create Account"
            severity="help"
            rounded
            onClick={() => setAccDialogVisible(true)}
          />
        </div>

        <div className="search-form-container mb-8">
          <InputText value={undefined} placeholder="Account Nickname" />
          <Dropdown
            value={[]}
            options={[]}
            optionLabel="name"
            placeholder="Account Status"
          />
        </div>

        <Table
          dataList={state.dataList}
          totalNum={state.total}
          onPageChange={handlePageChange}
          empty={
            <>
              <p>No Account Right Now</p>
            </>
          }
          sortField={state.sortField}
          sortOrder={state.sortOrder}
          onSort={(event: any) => {
            dispatch({ type: "onSortChange", payload: event });
          }}
        >
          <Column field="" header="Account ID" sortable></Column>
          <Column field="" header="Account Number" sortable></Column>
          <Column field="" header="Account Nickname" sortable></Column>
          <Column field="" header="User's Full Name"></Column>
          <Column field="" header="User's Email"></Column>
          <Column field="" header="Account Status"></Column>
          <Column field="" header="Created Date" sortable></Column>
          <Column
            header="Action"
            bodyStyle={{ textAlign: "center" }}
            body={(rowData: any) => {
              return (
                <TableAction>
                  {rowData.accountStatus === "Active" && <div>Suspended</div>}
                  <div onClick={() => setSecDialogVisible(true)}>
                    Add security transaction
                  </div>
                  <div onClick={() => setCashDialogVisible(true)}>
                    Add cash transaction
                  </div>
                  <div onClick={() => handleDetail(rowData)}>View Detail</div>
                </TableAction>
              );
            }}
          ></Column>
        </Table>
      </div>

      <AccountDetailSidebar
        id={accountId}
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
      />

      <CreateAccDialog
        visible={accDialogVisible}
        onClose={() => setAccDialogVisible(false)}
        callback={getTableList}
      />

      <AddSecDialog
        visible={secDialogVisible}
        onClose={() => setSecDialogVisible(false)}
        callback={getTableList}
      />

      <AddCashDialog
        visible={cashDialogVisible}
        onClose={() => setCashDialogVisible(false)}
        callback={getTableList}
      />
    </>
  );
}
