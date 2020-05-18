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
import getTheme from "../native-base-theme/components";
import custom from "../native-base-theme/variables/custom";
import { currency } from "../utils";
import Pastel from "../context/color";

import Hook from "@/wrapper";
import { useTable, usePagination } from "react-table";

function Table(props) {
  console.log("News Table Render");

  const data = React.useMemo(() => [...props.data], [props]);
  const data1 = React.useMemo(
    () => [
      {
        col1: "1",
        nama: "Sample-Code",
        address: "Sample-Gold",
        nomor: "Sample-weight",
        poin: "2020",
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
        Header: 'Alamat',
        accessor: 'alamat',
      },
      {
        Header: 'Nomor Handphone',
        accessor: 'hp',
      },
      {
        Header: "Poin",
        accessor: "poin",
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
      <table {...getTableProps()} style={{ border: "solid 1px black" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 1px black",
                    background: Pastel.dcell,
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
                {row.cells.map((cell, index) => {
                  let ret;
                  if (index === 0)
                    ret = (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {i + 1 + pageSize * pageIndex}
                      </td>
                    );
                  else
                    ret = (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  return ret;
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
let NewsPoin = () => {
  let { Client } = Hook.useClientState();
  let [data, setData] = useState([]);
  useEffect(() => {
    let poinFetch = async () => {
      let newsServices = Client.service("news");
      let { point } = await newsServices.find();
      console.log(point);
      setData(point);
    };
    poinFetch();
  }, []);
  console.log("News Poin Render");
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Grid>
          <Row size={100} style={{ backgroundColor: Pastel.back }}>
            <Grid style={{ padding: 10 }}>
              <Col size={2}></Col>
              <Col size={75} style={{ backgroundColor: Pastel.back }}>
                <Table data={data}></Table>
                {/*section 3.2.2 - total harga */}
              </Col>
              {/* section 3.3 Tombol Aksi*/}
              <Col size={2}></Col>
            </Grid>
          </Row>
          {/* section 4 - white space */}
        </Grid>
      </Content>
    </Container>
  );
};
export default NewsPoin;
