import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Left,
  Right,
  Button,
  Input,
  Item,
  StyleProvider,
} from "native-base";
import { Text, View, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import Hook from "@/wrapper";
import { useTable, usePagination } from "react-table";

function Table() {
  const data = React.useMemo(
    () => [
      {
        col1: "1",
        nama: "Sample-Code",
        address: "Sample-Gold",
        nomor: "Sample-weight",
        birthday: "2020-02-20",
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
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Alamat",
        accessor: "address",
      },
      {
        Header: "Nomor Handphone",
        accessor: "nomor",
      },
      {
        Header: "Ulang Tahun",
        accessor: "birthday",
      },
    ],
    []
  );
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
    <>
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
    </>
  );
}

let NewsBirthday = () => {
  let { Client } = Hook.useClientState();
  let [data, setData] = useState([]);
  useEffect(() => {
    let birthdayFetch = async () => {
      let newsServices = Client.service("news");
      let { birthday } = await newsServices.find();
      console.log(birthday);
      return birthday;
    };
    let data = birthdayFetch();
    setData(data);
  }, []);
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Grid>
          <Row size={100} style={{ backgroundColor: "#f2e3c6" }}>
            <Grid style={{ padding: 10 }}>
              <Col size={2}></Col>
              <Col size={75} style={{ backgroundColor: "#c2eec7" }}>
                <Table></Table>
                {/*section 3.2.2 - total harga */}
              </Col>
              {/* section 3.3 Tombol Aksi*/}
              <Col size={2}></Col>
            </Grid>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default NewsBirthday;
