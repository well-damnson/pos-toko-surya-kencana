import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Content,
  Left,
  Right,
  Button,
  Input,
  Item,
} from "native-base";
import styled from "styled-components";

import { Text, View, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { currency } from "../utils";

import Hook from "@/wrapper";
import { useTable, usePagination } from "react-table";
import ConfirmModal from "../modals/modalConfirm";
import Modal from "modal-enhanced-react-native-web";
// TODO: belajar cara make styled ini
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

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

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Table({ dat, setShowConfirm }) {
  console.log(dat);
  const data = React.useMemo(() => [...dat], [dat]);
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
        Header: "No Hp.",
        accessor: "hp",
      },
      {
        Header: "Tanggal Lahir",
        accessor: "lahir",
        Cell: (props) => {
          console.log(props);
          return props.row.values.lahir.join("-");
        },
      },
      {
        Header: "Alamat",
        accessor: "alamat",
      },
      {
        Header: "Poin",
        accessor: "poin",
      },
      {
        Header: "Tools",
        accessor: "col6",
      },
    ],
    []
  );
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

  //TODO: apus style dalam tabel dan ganti make styled

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
            //beda coding pagination basically ada disini, rows yang buat map diganti sama page
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
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        {i + 1 + pageSize * pageIndex}
                      </td>
                    );
                  else if (index === row.cells.length - 1)
                    ret = (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                          textAlign: "center",
                        }}
                      >
                        <button onClick={() => {}}>Pilih</button>
                      </td>
                    );
                  else
                    ret = (
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
        TODO: reposition the pagination tab dan bikin lebih keliatan rapi
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

let ModalSearchMember = () => {
  let { Client } = Hook.useClientState();
  let [state, setState] = useState([]);
  let [confirmShow, setConfirmShow] = useState(false);
  let [selectedData, setSelectedData] = useState(0);

  let setShowConfirm = (value, index) => {
    setConfirmShow(value);
    setSelectedData(index);
  };

  let removeData = (index) => {
    let removeFunction = async () => {
      try {
        let MemberAreaServices = Client.service("member-area");
        let removed = await MemberAreaServices.remove(filtered[index]._id);
        console.log(removed);
        if (removed._id) {
          let newState = [];
          for (let index = 0; index < state.length; index++) {
            let element = state[index];
            if (element._id !== removed._id) newState.push({ ...element });
          }
          console.log("NewState =", newState);
          setState(newState);
        }
      } catch (e) {}
    };
    removeFunction();
  };

  let [filtered, setFiltered] = useState([]);
  let [query, setQuery] = useState({
    barcode: "",
    nama: "",
    hp: "",
    dd: "",
    mm: "",
    yyyy: "",
  });
  let querySetter = (key, value) => {
    setQuery((old) => ({ ...old, [key]: value }));
  };
  useEffect(() => {
    let fetchFunction = async () => {
      let MemberAreaServices = Client.service("member-area");
      let data = await MemberAreaServices.find();
      console.log(data);
      setState(data);
      setFiltered(data);
    };
    fetchFunction();
  }, []);

  useEffect(() => {
    console.log("Query Changed");
    let filtered = [];
    let { barcode, nama, hp, dd, mm, yyyy } = query;
    for (let index = 0; index < state.length; index++) {
      const member = state[index];
      if (barcode && !member.barcode.includes(barcode)) {
        continue;
      }
      if (nama && !member.nama.toLowerCase().includes(nama)) {
        continue;
      }
      if (hp && !member.hp.includes(hp)) {
        continue;
      }
      if (dd && !member.lahir[0].toString().includes(dd)) {
        continue;
      }
      if (mm && !member.lahir[1].toString().includes(mm)) {
        continue;
      }
      if (yyyy && !member.lahir[2].toString().includes(yyyy)) {
        continue;
      }
      filtered.push(member);
    }
    console.log(filtered);
    setFiltered(filtered);
  }, [state, query]);

  console.log("filter", filtered);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Modal
          style={{ alignSelf: "center" }}
          isVisible={confirmShow}
          onBackdropPress={() => setConfirmShow(false)}
        >
          <ConfirmModal
            function={() => removeData(selectedData)}
            close={() => setConfirmShow(false)}
          ></ConfirmModal>
        </Modal>
        <Grid>
          {/* section 1 - Header */}
          <Row
            size={15}
            style={{ backgroundColor: "#d3ece1", justifyContent: "center" }}
          >
            <Grid>
              <Col size={50}>
                <Row
                  style={{
                    backgroundColor: "#d3ece1",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>Barcode: </Text>
                  <Item
                    style={{
                      alignSelf: "center",
                      height: "3vh",
                      backgroundColor: "#FFF",
                      width: "15vw",
                    }}
                    regular
                  >
                    <Input
                      style={{ height: "3vh" }}
                      onChangeText={(text) => {
                        querySetter("barcode", text);
                      }}
                      value={query.barcode}
                    />
                  </Item>
                </Row>
                <Row
                  style={{
                    backgroundColor: "#d3ece1",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center", marginRight: 10 }}>
                    Nama:{" "}
                  </Text>
                  <Item
                    style={{
                      alignSelf: "center",
                      height: "3vh",
                      backgroundColor: "#FFF",
                      width: "15vw",
                    }}
                    regular
                  >
                    <Input
                      style={{ height: "3vh" }}
                      onChangeText={(text) => {
                        querySetter("nama", text);
                      }}
                      value={query.nama}
                    />
                  </Item>
                </Row>
                <Row
                  style={{
                    backgroundColor: "#d3ece1",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>Tgl Lahir: </Text>
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
                      onChangeText={(text) => {
                        querySetter("dd", text);
                      }}
                      value={query.dd}
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
                      onChangeText={(text) => {
                        querySetter("mm", text);
                      }}
                      value={query.mm}
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
                      onChangeText={(text) => {
                        querySetter("yyyy", text);
                      }}
                      value={query.yyyy}
                    />
                  </View>
                </Row>
              </Col>
              <Col size={50}></Col>
              <Col />
            </Grid>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={100} style={{ backgroundColor: "#f2e3c6" }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={2}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: "#c2eec7" }}>
                {/* section 3.2.1 - tabel isi */}
                {/* <Styles>
                  <Table dat={filtered}></Table>
                </Styles> */}
                <Table dat={filtered} setShowConfirm={setShowConfirm}></Table>
              </Col>
              {/* section 3.3 Tombol Aksi*/}
              <Col size={2}></Col>
            </Grid>
          </Row>
          {/* section 4 - white space */}
          {/* <Row size={2} style={{ backgroundColor: '#FFF' }}></Row> */}
        </Grid>
      </Content>
    </Container>
  );
};

export default ModalSearchMember;
