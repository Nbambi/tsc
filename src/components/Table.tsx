import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import "./Table.scss";

interface IProps {
  sizeOptions?: number[];
  dataList?: any;
  emptyCustom?: string | React.ReactNode;
  [T: string | number]: any;
}

const Table: React.FC<IProps> = ({
  sizeOptions = [3, 10, 20, 50, 100],
  children,
  ...props
}) => {
  const sizeArr = sizeOptions;
  const [firstIndex, setFirstIndex] = useState(0);
  const [pageSize, setPageSize] = useState(sizeOptions[0]);
  const [totalNum, setTotalNum] = useState(10);

  // const [data, setData] = useState([]);
  const [data, setData] = useState([
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
  ]);

  /** 切页码/切页大小 */
  const onPageChange = (param: any) => {
    const { first, rows, page, totalPages } = param;
    // TODO 需要对一下 api 文档，目前好像是只需要传一个 pageNum 就可以
    const pageNum = Math.ceil((first + 1) / rows);
    console.info("----> pageNum", pageNum);

    setFirstIndex(first);
    setPageSize(rows);

    debugger;
  };

  return (
    <div className="table-container">
      <DataTable
        value={data}
        dataKey={props.dataKey}
        onRowSelect={props.onRowSelect}
        onRowUnselect={props.onRowUnselect}
        selectionMode="single"
        emptyMessage={() => (
          <div className="table-empty-box">
            <i className="pi pi-exclamation-circle"></i>
            {props.emptyCustom ? (
              props.emptyCustom
            ) : (
              <p>No available options</p>
            )}
          </div>
        )}
      >
        {children}
      </DataTable>
      {totalNum > 0 && data?.length > 0 ? (
        <div className="table-paginator-container">
          <Paginator
            first={firstIndex}
            rows={pageSize}
            totalRecords={totalNum}
            rowsPerPageOptions={sizeArr}
            onPageChange={onPageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
