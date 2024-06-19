import Table from "@/components/Table/Table";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useReducer } from "react";

interface IMatchDialogProps {
  orderId: string;
  visible: boolean;
  onClose: () => void;
  callback?: () => void;
}

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

export default function MatchDialog(props: IMatchDialogProps) {
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
    <Dialog
      visible={props.visible}
      closable={false}
      style={{ width: "80vw" }}
      onHide={props.onClose}
      header={
        <div
          className="main-title-contaienr no-border"
          style={{ padding: "0px" }}
        >
          <p className="main-title">Order Matching</p>
          <div>
            <Button
              rounded
              label="Cancel"
              severity="secondary"
              onClick={props.onClose}
            />
            <Button rounded label="Match" severity="help" />
          </div>
        </div>
      }
    >
      <div className="search-form-container mb-4">
        <InputText placeholder="order ID" />
      </div>

      <Table
        dataList={state.dataList}
        totalNum={state.total}
        onPageChange={handlePageChange}
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
      </Table>
    </Dialog>
  );
}
