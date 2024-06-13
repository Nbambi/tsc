import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";

interface IProps {
  sizeOptions?: number[];
  dataList?: any;
  //   dataKey?: string,
  //   onRowSelect: any,
  //   onRowUnselect: any,
  [T: string | number]: any;
}

const Table: React.FC<IProps> = ({
  sizeOptions = [3, 10, 20, 50, 100],
  dataList,
  dataKey,
  onRowSelect,
  onRowUnselect,
  children,
  ...props
}) => {
  const sizeArr = sizeOptions;
  const [firstIndex, setFirstIndex] = useState(0);
  const [pageSize, setPageSize] = useState(sizeOptions[0]);
  const [totalNum, setTotalNum] = useState(10);

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
        dataKey={dataKey}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        selectionMode="single"
      >
        {children}
      </DataTable>
      {totalNum > 0 ? (
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
