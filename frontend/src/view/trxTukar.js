import React, { Component, useState, useEffect } from 'react';
import {
  Container,
  Content,
  Left,
  Radio,
  Right,
  Button,
  Input,
  Item,
  StyleProvider,
} from 'native-base';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useTable } from 'react-table';

import { currency } from '../utils';

import Modal from 'modal-enhanced-react-native-web';

function TableJual() {
  const data = React.useMemo(
    () => [
      {
        col1: '1',
      },
      {
        col1: '2',
      },
      {
        col1: '3',
      },
    ],
    [],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Kode Barang',
        accessor: 'nama',
      },
      {
        Header: 'Berat',
        accessor: 'berat',
      },
      {
        Header: 'Kadar (%)',
        accessor: 'kadar',
      },
      {
        Header: 'Harga',
        accessor: 'jual',
      },
      {
        Header: 'Tools',
        accessor: 'col6',
      },
    ],
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
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
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
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

function TableBeli() {
  const data = React.useMemo(
    () => [
      {
        col1: '1',
      },
      {
        col1: '2',
      },
      {
        col1: '3',
      },
    ],
    [],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Berat',
        accessor: 'berat',
      },
      {
        Header: 'Kadar (%)',
        accessor: 'kadar',
      },
      {
        Header: 'Harga',
        accessor: 'jual',
      },
      {
        Header: 'Tools',
        accessor: 'col6',
      },
    ],
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
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
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
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

let Tukartambah = () => {
  let [state, setState] = useState({
    paymentMethod: 'Tunai',
    noRef: '',
    memberBarcode: '',
  });

  let listRadio = [
    'Tunai',
    'BCA',
    'Mandiri',
    'BNI',
    'BRI',
    'Visa',
    'Master',
    'Go-Pay',
    'OVO',
  ];

  let RadioButton = (item, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
      }}
    >
      <Radio
        onPress={() => setState({ paymentMethod: item })}
        selected={state.paymentMethod == item}
      />
      <Text style={{ marginRight: 5 }}>{item}</Text>
    </View>
  );

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Grid>
          {/* section 1 - Header */}
          <Row
            size={15}
            style={{ backgroundColor: '#d3ece1', justifyContent: 'center' }}
          >
            <Text style={{ alignSelf: 'center' }}>Member Barcode: </Text>
            <Item
              style={{
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '15vw',
              }}
              regular
            >
              <Input style={{ height: '3vh' }} />
            </Item>
            <Button
              light
              style={{
                alignSelf: 'center',
                marginLeft: '1vw',
                borderWidth: 1,
                borderRadius: 15,
              }}
            >
              <Text> Tambahkan Manual </Text>
            </Button>
          </Row>
          {/* section 2 - label penanda jual */}
          <Row
            size={7}
            style={{ backgroundColor: '#FFF', justifyContent: 'center' }}
          >
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: '5vw',
                fontSize: 24,
                padding: 5,
              }}
            >
              Barang Dijual
            </Text>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={75} style={{ backgroundColor: '#f2e3c6' }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={5}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                <TableJual></TableJual>
              </Col>
              {/* section 3.3 Tombol Aksi*/}
              <Col size={20}>
                <Button
                  light
                  style={{
                    alignSelf: 'center',
                    marginLeft: '1vw',
                    borderWidth: 1,
                    borderRadius: 15,
                    marginTop: 50,
                    width: '10vw',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Tambah Barang</Text>
                </Button>
                <View style={{ flex: 1 }}></View>
              </Col>
            </Grid>
          </Row>
          <Row
            size={7}
            style={{ backgroundColor: '#FFF', justifyContent: 'center' }}
          >
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: '5vw',
                fontSize: 24,
                padding: 5,
              }}
            >
              Barang Dibeli
            </Text>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={75} style={{ backgroundColor: '#f2e3c6' }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={5}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                {/* section 3.2.1 - tabel isi */}
                <TableBeli></TableBeli>
              </Col>
              {/* section 3.3 Tombol Aksi*/}
              <Col size={20}>
                <Button
                  light
                  style={{
                    alignSelf: 'center',
                    marginLeft: '1vw',
                    borderWidth: 1,
                    borderRadius: 15,
                    marginTop: 50,
                    width: '10vw',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Tambah Barang</Text>
                </Button>
                <View style={{ flex: 1 }}></View>
                <Button
                  light
                  style={{
                    alignSelf: 'center',
                    marginLeft: '1vw',
                    borderWidth: 1,
                    borderRadius: 15,
                    marginBottom: 50,
                    width: '10vw',
                    justifyContent: 'center',
                  }}
                >
                  <Text> Selesai </Text>
                </Button>
              </Col>
            </Grid>
          </Row>
          {/* section 4 - white space */}
          <Row size={25} style={{ backgroundColor: '#FFF' }}>
            <Text
              style={{
                alignSelf: 'center',
              }}
            >
              Metode Pembayaran
            </Text>
            <View
              style={{
                alignSelf: 'center',
                marginLeft: 5,
                paddingLeft: 5,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: 80,
              }}
            >
              {listRadio.map((item, index) => RadioButton(item, index))}
            </View>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default Tukartambah;

// section 1 - Header               untuk memasukan barcode member
// section 2 - Label penanda        penanda halaman
// section 3 - Tabel Utama          Jual/Beli/Tukar sesuai kebutuhan
//  section 3.1 - whitespace        untuk memberikan kesan rapih
//  section 3.2 - Tabel             seperti namanya
//   section 3.2.1 - Tabel          fungsi utama ada di sini
//   section 3.2.2 - Total harga    untuk me-rekap total jual/beli
//  section 3.3 - Tombol Aksi       lokasi tombol sesuai kebutuhan
// section 4 - whitespace           untuk estetik
