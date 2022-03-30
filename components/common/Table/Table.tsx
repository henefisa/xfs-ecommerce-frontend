import React from "react";
import { useTable, ColumnInstance, TableOptions } from "react-table";

interface TableProps<T extends Record<string, unknown>>
  extends TableOptions<T> {}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>): React.ReactElement => {
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable<T>({ columns, data });

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, idx) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={`header-group-${idx}`}
          >
            {headerGroup.headers.map((column, idx) => (
              <th {...column.getHeaderProps()} key={`column-${idx}`}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell, idx) => (
                <td {...cell.getCellProps()} key={row.id + idx}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
