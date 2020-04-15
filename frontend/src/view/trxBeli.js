import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  Content,
  Left,
  Right,
  Radio,
  Button,
  Input,
  Item,
} from 'native-base';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { currency } from '../utils';
import { useTable } from 'react-table';

import TambahItemModal from '../modals/modalTambahItem';

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
`;

function Table({ dat, setDat }) {
  let removeData = (index) => {
    let newData = [...dat];
    newData.splice(index, 1);
    setDat(newData);
  };

  const data = React.useMemo(() => dat, [dat]);
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
        Header: 'Berat (gr)',
        accessor: 'berat',
      },
      { Header: 'Kadar (%)', accessor: 'kadar' },
      {
        Header: 'Harga',
        accessor: 'beli',
        Cell: (props) => {
          console.log(props);
          return currency(props.row.values.beli);
        },
      },
      { Header: 'Tools', accessor: 'col6' },
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
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                let num = (
                  <td
                    key={index}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
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
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
                let remove = (
                  <td
                    key={index + 2}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    <button onClick={() => removeData(rowIndex)}>Hapus</button>
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
    </table>
  );
}

let Beli = () => {
  let [state, setState] = useState({
    paymentMethod: 'Tunai',
    noRef: '',
    memberBarcode: '',
  });
  let [beli, setBeli] = useState([
    {
      nama: 'AntamPure24-001',
      berat: 200,
      kadar: 85,
      beli: 2750000,
    },
    {
      nama: 'AntamPure24-002',
      berat: 100,
      kadar: 85,
      beli: 1575000,
    },
    {
      nama: 'AntamPure24-001',
      berat: 200,
      kadar: 45,
      beli: 1800000,
    },
  ]);

  let [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < beli.length; index++) {
      const { beli: harga } = beli[index];
      total += harga;
    }

    setTransactionData({ ...state, beli, total, type: 'beli' });
  }, [state, beli]);
  console.log(transactionData);

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
            size={10}
            style={{
              backgroundColor: '#d3ece1',
              justifyContent: 'center',
            }}
          >
            <Text style={{ alignSelf: 'center' }}>Member Barcode: </Text>
            <Item
              style={{
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFFFFF',
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
          <Row size={5} style={{ backgroundColor: '#FFF' }}>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: '5vw',
                fontSize: 32,
              }}
            >
              Barang Beli
            </Text>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={75} style={{ backgroundColor: '#f2e3c6' }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={5}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                <Styles>
                  <Table dat={beli} setDat={setBeli} />
                </Styles>
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
                  }}
                >
                  {listRadio.map((item, index) => RadioButton(item, index))}
                </View>
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
          <Row size={10} style={{ backgroundColor: '#FFF' }}></Row>
        </Grid>
      </Content>
    </Container>
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
