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
import { Text, View, TextInput, Picker, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { currency } from "../utils";
import styled from "styled-components";

import Pastel from "../context/color";

import Hook from "@/wrapper";

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
      <table {...getTableProps()} style={{ border: "solid 1px black" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    // borderBottom: 'solid 1px black',
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
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  let num = (
                    <td
                      key={index}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: Pastel.cell,
                      }}
                    >
                      {rowIndex + 1 + pageSize * pageIndex}
                    </td>
                  );
                  let content = (
                    <td
                      key={index + 1}
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: Pastel.cell,
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );

                  return index === 0 ? num : content;
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
  let { Client } = Hook.useClientState();
  let [state, setState] = useState([]);
  const data = React.useMemo(() => [...state], [state]);
  const data1 = React.useMemo(
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
        Header: "Info Transaksi",
        columns: [
          {
            Header: "No",
            accessor: "col1", // accessor is the "key" in the data
          },
          {
            Header: "Kode Transaksi",
            accessor: "noTransaksi", // accessor is the "key" in the data
          },
        ],
      },
      {
        Header: "Jual",
        columns: [
          {
            Header: "Jumlah",
            accessor: "jumlahjual",
          },
          {
            Header: "Berat",
            accessor: "beratjual",
          },
          {
            Header: "Harga Jual",
            accessor: "jual",
            Cell: (props) => {
              // console.log(props);
              return currency(props.row.values.jual);
            },
          },
        ],
      },
      {
        Header: "Beli",
        columns: [
          {
            Header: "Jumlah",
            accessor: "jumlahbeli",
          },
          {
            Header: "Berat",
            accessor: "beratbeli",
          },
          {
            Header: "Harga Beli",
            accessor: "beli",
            Cell: (props) => {
              // console.log(props);
              return currency(props.row.values.beli);
            },
          },
        ],
      },
      {
        Header: "Total",
        columns: [
          {
            Header: "Transaksi",
            accessor: "total",
            Cell: (props) => {
              // console.log(props);
              return currency(props.row.values.total);
            },
          },
        ],
      },
    ],
    []
  );

  let [start, setStart] = useState(["", "", ""]);
  let [end, setEnd] = useState(["", "", ""]);

  let setter = (time, type, value) => {
    let set;
    let oldData;
    if (time === "start") {
      set = setStart;
      oldData = start;
    } else if (time === "end") {
      set = setEnd;
      oldData = end;
    }
    let newData = [...oldData];
    newData[type] = value;
    set(newData);
  };

  let fetchToState = (fetchData) => {
    if (Array.isArray(fetchData)) {
      return fetchData.map((current) => fetchToState(current));
    }
    let transaction = {};
    transaction.noTransaksi = fetchData.noTransaksi;
    transaction.jumlahjual = fetchData.jual.length;
    transaction.beratjual = fetchData.jual.reduce(
      (total, item) => total + item.berat,
      0
    );
    transaction.jual = fetchData.jual.reduce(
      (total, item) => total + item.jual,
      0
    );
    transaction.jumlahbeli = fetchData.beli.length;
    transaction.beratbeli = fetchData.beli.reduce(
      (total, item) => total + item.berat,
      0
    );
    transaction.beli = fetchData.beli.reduce(
      (total, item) => total + item.beli,
      0
    );
    transaction.total = transaction.jual - transaction.beli;
    console.log(transaction);
    return transaction;

    /**_id: "5eb3e8a6980c774b50e58fc9"
memberBarcode: "916923962085"
noTransaksi: "0000 / 07-05-2020 Jual"
jual: [{…}]
beli: []
total: 500000
paymentMethod: "Tunai"
noRef: ""
createdAt: "2020-05-07T10:53:26.446Z"
updatedAt: "2020-05 */
  };

  useEffect(() => {
    let today = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
    let defaultTime = [
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear(),
    ];
    console.log(defaultTime);

    let query = {};

    let useStart = false;
    for (let index = 0; index < start.length; index++) {
      const time = start[index];
      if (time.length > 0) useStart = true;
    }

    let useEnd = false;
    for (let index = 0; index < end.length; index++) {
      const time = end[index];
      if (time.length > 0) useEnd = true;
    }

    if (useStart) {
      let startTime = [
        parseInt(start[0]) || defaultTime[0],
        parseInt(start[1]) || defaultTime[1],
        parseInt(start[2]) || defaultTime[2],
      ];
      query.start = [...startTime];
    }
    if (useEnd) {
      let endTime = [
        parseInt(end[0]) || defaultTime[0],
        parseInt(end[1]) || defaultTime[1],
        parseInt(end[2]) || defaultTime[2],
      ];
      query.end = [...endTime];
    }
    console.log(query);
    let fetchFunction = async () => {
      let TransactionAreaServices = Client.service("transaction-area");
      let data = await TransactionAreaServices.find({ query });
      console.log(data);
      setState(fetchToState(data));
    };
    fetchFunction();
  }, [start, end]);
  useEffect(() => {
    let fetchFunction = async () => {
      let TransactionAreaServices = Client.service("transaction-area");
      let data = await TransactionAreaServices.find();
      console.log(data);
      setState(fetchToState(data));
    };
    fetchFunction();
  }, []);
  return (
    <Container>
      <Content
        contentContainerStyle={{ flex: 1, backgroundColor: Pastel.back }}
      >
        <Grid>
          <Row size={15} style={{ justifyContent: "center" }}>
            <Grid>
              <Col>
                <Row style={{ justifyContent: "center" }}>
                  <Text style={{ alignSelf: "center" }}>Tgl Mulai: </Text>
                  <View style={{ alignSelf: "center", flexDirection: "row" }}>
                    <TextInput
                      placeholder="DD"
                      style={{
                        textAlign: "center",
                        borderRadius: 2,
                        marginRight: 5,
                        backgroundColor: "white",
                        borderColor: "grey",
                        height: "3vh",
                        borderWidth: 1,
                        width: "5vw",
                      }}
                      value={start[0]}
                      onChangeText={(text) => {
                        setter("start", 0, text);
                      }}
                    />
                    <TextInput
                      placeholder="MM"
                      style={{
                        textAlign: "center",
                        borderRadius: 2,
                        marginRight: 5,
                        backgroundColor: "white",
                        borderColor: "grey",
                        height: "3vh",
                        borderWidth: 1,
                        width: "5vw",
                      }}
                      value={start[1]}
                      onChangeText={(text) => {
                        setter("start", 1, text);
                      }}
                    />
                    <TextInput
                      placeholder="YYYY"
                      style={{
                        textAlign: "center",
                        borderRadius: 2,
                        backgroundColor: "white",
                        borderColor: "grey",
                        height: "3vh",
                        borderWidth: 1,
                        width: "5vw",
                      }}
                      value={start[2]}
                      onChangeText={(text) => {
                        setter("start", 2, text);
                      }}
                    />
                  </View>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Text style={{ alignSelf: "center" }}>Tgl Akhir: </Text>
                  <View style={{ alignSelf: "center", flexDirection: "row" }}>
                    <TextInput
                      placeholder="DD"
                      style={{
                        textAlign: "center",
                        borderRadius: 2,
                        marginRight: 5,
                        backgroundColor: "white",
                        borderColor: "grey",
                        height: "3vh",
                        borderWidth: 1,
                        width: "5vw",
                      }}
                      value={end[0]}
                      onChangeText={(text) => {
                        setter("end", 0, text);
                      }}
                    />
                    <TextInput
                      placeholder="MM"
                      style={{
                        textAlign: "center",
                        borderRadius: 2,
                        marginRight: 5,
                        backgroundColor: "white",
                        borderColor: "grey",
                        height: "3vh",
                        borderWidth: 1,
                        width: "5vw",
                      }}
                      value={end[1]}
                      onChangeText={(text) => {
                        setter("end", 1, text);
                      }}
                    />
                    <TextInput
                      placeholder="YYYY"
                      style={{
                        textAlign: "center",
                        borderRadius: 2,
                        backgroundColor: "white",
                        borderColor: "grey",
                        height: "3vh",
                        borderWidth: 1,
                        width: "5vw",
                      }}
                      value={end[2]}
                      onChangeText={(text) => {
                        setter("end", 2, text);
                      }}
                    />
                  </View>
                </Row>
              </Col>
              <Col
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  padding: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    width: "5vw",
                    padding: 10,
                    backgroundColor: "silver",
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>Print</Text>
                </TouchableOpacity>
              </Col>
            </Grid>
          </Row>
          <Row size={75} style={{ justifyContent: "center" }}>
            <Table columns={columns} data={data}></Table>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default Laporan;
