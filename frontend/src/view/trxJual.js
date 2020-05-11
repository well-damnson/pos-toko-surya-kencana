import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  Content,
  Left,
  Right,
  Radio,
  Button,
  Input,
  Item,
} from "native-base";
import { Text, View, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { currency } from "../utils";
import { useTable } from "react-table";
import Pastel from "../context/color";

import ConfirmModal from "../modals/modalConfirm";
import SearchItemModal from "../modals/modalSearchItem";
import Modal from "modal-enhanced-react-native-web";

import Hook from "@/wrapper";

const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 5px;
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
      tfoot {
      tr:first-child {
        td {
          border-top: 2px solid black;
        }
      }
      font-weight: bolder;
    }
  }
`;

function Table({ dat, setDat, setShowModal, changeJualAmount }) {
  const data = React.useMemo(() => dat, [dat]);
  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Kode Barang",
        accessor: "nama",
      },
      {
        Header: "Berat (gr)",
        accessor: "berat",
      },
      { Header: "Kadar (%)", accessor: "kadar" },
      {
        Header: "Harga",
        accessor: "jual",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.jual || 0) + sum,
                0
              ),
            [info.rows]
          );
          return <>Total: {currency(total)}</>;
        },
        Cell: (props) => {
          console.log(props);
          return currency(props.row.values.jual);
        },
        // https://stackoverflow.com/questions/48704269/react-table-package-formatting-float-as-currency , https://medium.com/@nidhinkumar/react-js-number-format-and-styling-a1a6e211e629
      },
      { Header: "Tools", accessor: "col6" },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  let [showTambah, setShowTambah] = useState(false);
  return (
    <table {...getTableProps()} style={{ border: "solid 1px black" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
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
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                if (index === row.cells.length) console.log("cell", cell);
                let num = (
                  <td
                    key={index}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: Pastel.cell,
                    }}
                  >
                    {rowIndex + 1}
                  </td>
                );
                let content = (
                  <td
                    key={index}
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
                let remove = (
                  <td
                    key={index}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: Pastel.cell,
                    }}
                  >
                    <button onClick={() => setShowModal(true, rowIndex)}>
                      Hapus
                    </button>
                  </td>
                );
                let price = (
                  <td
                    key={index}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: Pastel.cell,
                    }}
                  >
                    <input
                      style={{ height: "2em" }}
                      type="text"
                      value={cell.value}
                      onChange={(text) => {
                        changeJualAmount(rowIndex, text);
                      }}
                    />
                  </td>
                );
                return index === 0
                  ? num
                  : index === row.cells.length - 2
                  ? price
                  : index !== row.cells.length - 1
                  ? content
                  : remove;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

let Jual = () => {
  let { Client } = Hook.useClientState();
  // statenya diatas sini gw pake hook jadi kalo lu mau
  let [state, setState] = useState({
    paymentMethod: "Tunai",
    noRef: "",
    memberBarcode: "",
  });

  let setter = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  let [searchShow, setSearchShow] = useState(false);
  let [modalShow, setModalShow] = useState(false);
  let [selectedData, setSelectedData] = useState(0);

  let setShowModal = (value, index) => {
    setModalShow(value);
    setSelectedData(index);
  };

  let [jual, setJual] = useState([]);

  let [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < jual.length; index++) {
      const { jual: harga } = jual[index];
      total += parseInt(harga);
    }

    setTransactionData({ ...state, jual, total, type: "jual" });
  }, [state, jual]);

  console.log(transactionData);
  let listRadio = [
    "Tunai",
    "BCA",
    "Mandiri",
    "BNI",
    "BRI",
    "Visa",
    "Master",
    "Go-Pay",
    "OVO",
  ];

  let RadioButton = (item, index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        alignSelf: "flex-start",
      }}
    >
      <Radio
        onPress={() => setState((state) => ({ ...state, paymentMethod: item }))}
        selected={state.paymentMethod === item}
      />
      <Text style={{ marginRight: 5 }}>{item}</Text>
    </View>
  );

  // console.log(state.conModal);
  let removeData = (index) => {
    let newData = [...jual];
    newData.splice(index, 1);
    setJual(newData);
  };
  let addData = (data) => {
    let newData = [...jual];
    newData.push({ ...data, jual: 0 });
    console.log(newData);
    setJual(newData);
    setSearchShow(false);
  };

  let changeJualAmount = (index, price) => {
    console.log(price.target.value);
    let newPrice = price.target.value.replace(/\D/g, "");
    let selected = jual[index];
    let before = jual.slice(0, index);
    let after = jual.slice(index + 1, jual.length);
    selected.jual = newPrice;
    let newJual = [...before, selected, ...after];
    setJual(newJual);
  };

  let submitJual = () => {
    let submit = async () => {
      if (transactionData.jual.length > 0 && transactionData.total > 0) {
        let TransactionAreaServices = Client.service("transaction-area");
        let result = await TransactionAreaServices.create(transactionData);
        if (result._id) {
          console.log(result);
          setState({ paymentMethod: "Tunai", noRef: "", memberBarcode: "" });
          setTransactionData({});
          setJual([]);
        }
      }
    };
    console.log(transactionData);
    submit();
  };
  return (
    <View style={{ flex: 1, height: "100vh" }}>
      <Modal
        style={{ alignSelf: "center" }}
        isVisible={searchShow}
        onBackdropPress={() => setSearchShow(false)}
      >
        <SearchItemModal
          // function={() => removeData(selectedData)}
          addData={addData}
          existing={jual}
          close={() => setSearchShow(false)}
        ></SearchItemModal>
      </Modal>
      <Modal
        style={{ alignSelf: "center" }}
        isVisible={modalShow}
        onBackdropPress={() => setModalShow(false)}
      >
        <ConfirmModal
          function={() => removeData(selectedData)}
          close={() => setModalShow(false)}
        ></ConfirmModal>
      </Modal>
      <Grid>
        {/* section 1 - Header */}
        <Row
          size={10}
          style={{
            backgroundColor: Pastel.dback,
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center" }}>Member Barcode: </Text>
          <Item
            style={{
              alignSelf: "center",
              height: "3vh",
              backgroundColor: "#FFFFFF",
              width: "15vw",
            }}
            regular
          >
            <Input
              style={{ height: "3vh" }}
              value={state.memberBarcode}
              onChangeText={(text) => {
                setter("memberBarcode", text);
              }}
            />
          </Item>
          <Button
            light
            style={{
              alignSelf: "center",
              marginLeft: "1vw",
              borderWidth: 1,
              borderRadius: 15,
            }}
          >
            <Text> Tambahkan Manual </Text>
          </Button>
        </Row>
        {/* section 2 - label penanda jual */}
        <Row size={8} style={{ backgroundColor: Pastel.lback }}>
          <Text
            style={{
              alignSelf: "center",
              marginLeft: "5vw",
              fontSize: 32,
              padding: 5,
            }}
          >
            Barang Jual
          </Text>
        </Row>
        {/* section 3 - tabel penjualan */}
        <Row size={75} style={{ backgroundColor: Pastel.back }}>
          <Grid>
            {/* section 3.1 - whitespace */}
            <Col size={5}></Col>
            {/* section 3.2 - tabel */}
            <Col size={75} style={{ backgroundColor: Pastel.back }}>
              <Styles>
                <Table
                  dat={jual}
                  setDat={setJual}
                  setShowModal={setShowModal}
                  changeJualAmount={changeJualAmount}
                />
              </Styles>
            </Col>
            {/* section 3.3 Tombol Aksi*/}
            <Col size={20}>
              <Button
                light
                style={{
                  alignSelf: "center",
                  marginLeft: "1vw",
                  borderWidth: 1,
                  borderRadius: 15,
                  marginTop: 50,
                  width: "10vw",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setSearchShow(true);
                }}
              >
                <Text>Tambah Barang</Text>
              </Button>
              <View style={{ flex: 1 }}></View>
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                Metode Pembayaran
              </Text>
              <View
                style={{
                  alignSelf: "center",
                  marginLeft: 5,
                  paddingLeft: 5,
                }}
              >
                {listRadio.map((item, index) => RadioButton(item, index))}
              </View>
              <TextInput
                placeholder="Nomor Referensi"
                style={{
                  textAlign: "center",
                  borderRadius: 2,
                  marginLeft: 10,
                  marginBottom: 10,
                  margin: 5,
                  backgroundColor: "white",
                  borderColor: "grey",
                  height: "3vh",
                  borderWidth: 1,
                  width: "15vw",
                }}
                value={state.noRef}
                onChangeText={(text) => {
                  setter("noRef", text);
                }}
              />
              <Button
                light
                style={{
                  alignSelf: "center",
                  marginLeft: "1vw",
                  borderWidth: 1,
                  borderRadius: 15,
                  marginBottom: 50,
                  width: "10vw",
                  justifyContent: "center",
                }}
                onClick={() => {
                  submitJual();
                }}
              >
                <Text> Selesai </Text>
              </Button>
            </Col>
          </Grid>
        </Row>
        {/* section 4 - white space */}
        <Row size={10} style={{ backgroundColor: Pastel.back }}></Row>
      </Grid>
    </View>
  );
};

export default Jual;
