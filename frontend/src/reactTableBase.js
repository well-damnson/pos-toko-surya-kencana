import React, { Component } from "react";
import { useTable } from "react-table";

function Table() {
  const data = React.useMemo(
    () => [
      {
        col1: "1",
        nama: "Sample-Code",
        jenis: "Sample-Gold",
        berat: "Sample-weight",
        kadar: "Sample-rate",
        posisi: "Sample-Position",
        beli: "123456789",
        jual: "987654321",
        col6: "Test",
      },
      {
        col1: "2",
        nama: "Sample",
      },
      {
        col1: "3",
        nama: "Sample",
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Kode Barang",
        accessor: "nama",
      },
      {
        Header: "Jenis",
        accessor: "jenis",
      },
      {
        Header: "Berat",
        accessor: "berat",
      },
      {
        Header: "Kadar",
        accessor: "kadar",
      },
      {
        Header: "Posisi",
        accessor: "posisi",
      },
      {
        Header: "Harga Beli",
        accessor: "beli",
        Cell: (props) => {
          console.log(props);
          return currency(props.row.values.jual);
        },
      },
      {
        Header: "Harga Jual",
        accessor: "jual",
        Cell: (props) => {
          console.log(props);
          return currency(props.row.values.jual);
        },
      },
      {
        Header: "Tools",
        accessor: "col6",
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
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
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
