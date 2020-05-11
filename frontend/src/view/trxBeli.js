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

import TambahItemModal from "../modals/modalTambahItem";
import ConfirmModal from "../modals/modalConfirm";

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

function Table({ dat, removeData }) {
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
        accessor: "beli",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.beli || 0) + sum,
                0
              ),
            [info.rows]
          );
          return <>Total: {currency(total)}</>;
        },
        Cell: (props) => {
          console.log(props);
          return currency(props.row.values.beli);
        },
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
                let remove = (
                  <td
                    key={index + 2}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: Pastel.cell,
                    }}
                  >
                    <button onClick={() => removeData(true, rowIndex)}>
                      Hapus
                    </button>
                  </td>
                );
                return index === 0
                  ? num
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

let Beli = () => {
  let { Client } = Hook.useClientState();
  let defaultState = {
    paymentMethod: "Tunai",
    noRef: "",
    memberBarcode: "",
  };
  let defaultBeli = [];
  let [state, setState] = useState({ ...defaultState });

  let setter = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  let [beli, setBeli] = useState([]);

  let [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < beli.length; index++) {
      const { beli: harga } = beli[index];
      total += parseInt(harga);
    }

    setTransactionData({ ...state, beli, total, type: "beli" });
  }, [state, beli]);
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
        onPress={() => setState({ paymentMethod: item })}
        selected={state.paymentMethod == item}
      />
      <Text style={{ marginRight: 5 }}>{item}</Text>
    </View>
  );

  let [addItemShow, setAddItemShow] = useState(false);
  let [removeItemShow, setRemoveItemShow] = useState(false);
  let [selectedIndex, setSelectedIndex] = useState(0);
  let removeData = (index) => {
    let newData = [...beli];
    newData.splice(index, 1);
    setBeli(newData);
  };
  let setShowModal = (value, index) => {
    setRemoveItemShow(value);
    setSelectedIndex(index);
  };

  let addData = (state) => {
    console.log("submit pressed");
    console.log(state);
    if (
      state.nama.length &&
      (state.jenis !== "-" || state.jenisBaru.length) &&
      state.berat.length &&
      state.kadar.length &&
      (state.posisi !== "-" || state.posisiBaru.length) &&
      state.beli.length
    ) {
      setBeli((beli) => [...beli, state]);
      setAddItemShow(false);
    }
  };

  let submit = async () => {
    if (transactionData.beli.length > 0 && transactionData.total > 0) {
      console.log("toDatabase");
      let service = Client.service("transaction-area");
      let result = await service.create(transactionData);
      console.log(result);
      if (result._id) {
        setState(defaultState);
        setBeli(defaultBeli);
      }
    }
  };

  return (
    <View style={{ flex: 1, height: "100vh" }}>
      <Modal
        isVisible={addItemShow}
        onBackdropPress={() => setAddItemShow(false)}
      >
        <TambahItemModal submit={addData}></TambahItemModal>
      </Modal>
      <Modal
        style={{ alignSelf: "center" }}
        isVisible={removeItemShow}
        onBackdropPress={() => setRemoveItemShow(false)}
      >
        <ConfirmModal
          function={() => removeData(selectedIndex)}
          close={() => setRemoveItemShow(false)}
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
              onChangeText={(text) =>
                setState((state) => ({ ...state, memberBarcode: text }))
              }
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
            Barang Beli
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
                <Table dat={beli} removeData={setShowModal} />
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
                onPress={() => setAddItemShow(true)}
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
                onPress={() => {
                  submit();
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

export default Beli;

// section 1 - Header               untuk memasukan barcode member
// section 2 - Label penanda        penanda halaman
// section 3 - Tabel Utama          Jual/Beli/Tukar sesuai kebutuhan
//  section 3.1 - whitespace        untuk memberikan kesan rapih
//  section 3.2 - Tabel             seperti namanya
//   section 3.2.1 - Tabel          fungsi utama ada di sini
//   section 3.2.2 - Total harga    untuk me-rekap total jual/beli
//  section 3.3 - Tombol Aksi       lokasi tombol sesuai kebutuhan
// section 4 - whitespace           untuk estetik
