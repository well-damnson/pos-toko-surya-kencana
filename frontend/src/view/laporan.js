import React, { Component, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import {
  Container,
  Content,
  ListItem,
  Left,
  Right,
  Radio,
  Button,
  Input,
  Item,
} from "native-base";
import { Text, View, TextInput, Picker } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { currency } from "../utils";
import styled from "styled-components";

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 2 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <Styles>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 1px black",
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
          {page.map((row, i) => {
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
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
}
let Laporan = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "1",
        trx: "Sample-Code",
        jenisjual: "Sample-Gold",
        beratjual: "Sample-weight",
        jenisbeli: "Sample-Gold",
        beratbeli: "Sample-weight",
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
        Header: " ",
        columns: [
          {
            Header: "No",
            accessor: "col1", // accessor is the "key" in the data
          },
          {
            Header: "Kode Transaksi",
            accessor: "trx", // accessor is the "key" in the data
          },
        ],
      },
      {
        Header: "Jual",
        columns: [
          {
            Header: "Jenis",
            accessor: "jenisjual",
          },
          {
            Header: "Berat",
            accessor: "beratjual",
          },
          {
            Header: "Harga Jual",
            accessor: "jual",
            Cell: (props) => {
              console.log(props);
              return currency(props.row.values.jual);
            },
          },
        ],
      },
      {
        Header: "Beli",
        columns: [
          {
            Header: "Jenis",
            accessor: "jenisbeli",
          },
          {
            Header: "Berat",
            accessor: "beratbeli",
          },
          {
            Header: "Harga Beli",
            accessor: "beli",
            Cell: (props) => {
              console.log(props);
              return currency(props.row.values.beli);
            },
          },
        ],
      },
      {
        Header: "Total",
        columns: [{ Header: "transaksi", accessor: "col6" }],
      },
    ],
    []
  );
  return (
    <Container>
      <Content>
        <Table columns={columns} data={data}></Table>
      </Content>
    </Container>
  );
};

export default Laporan;
