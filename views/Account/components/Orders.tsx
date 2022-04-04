import * as React from "react";

import Table from "components/common/Table/Table";

const Orders: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        orderId: "123",
        date: new Date().toLocaleString(),
        status: "Inprogress",
        total: 100000,
        actions: (
          <>
            <button>hello</button>
          </>
        ),
      },
      {
        orderId: "123",
        date: new Date().toLocaleString(),
        status: "Inprogress",
        total: 100000,
        actions: (
          <>
            <button>hello</button>
          </>
        ),
      },
      {
        orderId: "123",
        date: new Date().toLocaleString(),
        status: "Inprogress",
        total: 100000,
        actions: (
          <>
            <button>hello</button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <div className="my-account-page__orders">
      <h2 className="my-account-page__title">Orders</h2>
      <div className="my-account-page__content"></div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Orders;
