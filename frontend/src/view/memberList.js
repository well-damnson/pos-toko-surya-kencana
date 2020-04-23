import React, { Component, useState, useEffect } from 'react';
import {
  Container,
  Content,
  Left,
  Right,
  Button,
  Input,
  Item,
} from 'native-base';
import { Text, View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import getTheme from '../native-base-theme/components';
import custom from '../native-base-theme/variables/custom';
import { currency } from '../utils';

import Hook from '@/wrapper';

import { useTable } from 'react-table';

function Table({ dat }) {
  console.log(dat);
  const data = React.useMemo(() => [...dat], [dat]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'No Hp.',
        accessor: 'hp',
      },
      {
        Header: 'Tanggal Lahir',
        accessor: 'lahir',
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
      },
      {
        Header: 'Poin',
        accessor: 'poin',
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

let MemberList = () => {
  let { Client } = Hook.useClientState();
  let [state, setState] = useState([]);
  let [filtered, setFiltered] = useState([]);
  let [query, setQuery] = useState({
    barcode: '',
    nama: '',
    hp: '',
    dd: '',
    mm: '',
    yyyy: '',
  });
  let querySetter = (key, value) => {
    setQuery((old) => ({ ...old, [key]: value }));
  };
  useEffect(() => {
    let fetchFunction = async () => {
      let MemberAreaServices = Client.service('member-area');
      let data = await MemberAreaServices.find();
      console.log(data);
      setState(data);
      setFiltered(data);
    };
    fetchFunction();
  }, []);

  useEffect(() => {
    console.log('Query Changed');
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
  }, [query]);

  let testData = useState([
    {
      _id: '5e4cf73516ef992c086a886b',
      poin: 0,
      nama: 'Andi',
      alamat: 'Jl. Ada Deh Mau Tau Aja',
      hp: '089012345678',
      lahir: [22, 11, 1997],
      barcode: '123',
      createdAt: '2020-02-19T08:52:05.289Z',
      updatedAt: '2020-03-23T03:27:16.646Z',
      __v: 0,
    },
    {
      _id: '5e4d04fed3ee174b9cbb6d6b',
      poin: 0,
      nama: 'Anto',
      alamat: 'Jl. Ada Deh Mau Tau Aja 2',
      hp: '089876543210',
      lahir: [22, 11, 2000],
      barcode: '',
      createdAt: '2020-02-19T09:50:54.953Z',
      updatedAt: '2020-02-19T09:50:54.953Z',
      __v: 0,
    },
    {
      _id: '5e4d052317097d0930a39faa',
      poin: 0,
      nama: 'Anto',
      alamat: 'Jl. Ada Deh Mau Tau Aja 2',
      hp: '089876543210',
      lahir: [22, 11, 2000],
      barcode: '',
      createdAt: '2020-02-19T09:51:31.253Z',
      updatedAt: '2020-02-19T09:51:31.253Z',
      __v: 0,
    },
    {
      _id: '5e4d0528e5f3a835ecab5b5e',
      poin: 0,
      nama: 'Anto',
      alamat: 'Jl. Ada Deh Mau Tau Aja 2',
      hp: '089876543210',
      lahir: [22, 11, 2000],
      barcode: '',
      createdAt: '2020-02-19T09:51:36.847Z',
      updatedAt: '2020-02-19T09:51:36.847Z',
      __v: 0,
    },
    {
      _id: '5e4d05d3a879c60b7cf6b002',
      poin: 0,
      nama: 'Anto',
      alamat: 'Jl. Ada Deh Mau Tau Aja 2',
      hp: '089876543210',
      lahir: [22, 11, 2000],
      barcode: '',
      createdAt: '2020-02-19T09:54:27.905Z',
      updatedAt: '2020-02-19T09:54:27.905Z',
      __v: 0,
    },
    {
      _id: '5e4d06a13a57173f30555e8c',
      poin: 0,
      nama: 'Anto',
      alamat: 'Jl. Ada Deh Mau Tau Aja 2',
      hp: '089876543210',
      lahir: [22, 11, 2000],
      barcode: '',
      createdAt: '2020-02-19T09:57:53.213Z',
      updatedAt: '2020-02-19T09:57:53.213Z',
      __v: 0,
    },
    {
      _id: '5e782de00978474450cc1f24',
      poin: 0,
      nama: 'Johan',
      hp: '081617353000',
      lahir: [22, 11, 1996],
      alamat: 'Jl. Adadehmautauaja',
      barcode: '102938475665',
      createdAt: '2020-03-23T03:32:48.912Z',
      updatedAt: '2020-03-23T03:32:48.912Z',
      __v: 0,
    },
  ]);

  console.log('filter', filtered);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Grid>
          {/* section 1 - Header */}
          <Row
            size={15}
            style={{ backgroundColor: '#d3ece1', justifyContent: 'center' }}
          >
            <Grid>
              <Col>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center' }}>Barcode: </Text>
                  <Item
                    style={{
                      alignSelf: 'center',
                      height: '3vh',
                      backgroundColor: '#FFF',
                      width: '15vw',
                    }}
                    regular
                  >
                    <Input
                      style={{ height: '3vh' }}
                      onChangeText={(text) => {
                        querySetter('barcode', text);
                      }}
                      value={query.barcode}
                    />
                  </Item>
                </Row>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center', marginRight: 10 }}>
                    Nama:{' '}
                  </Text>
                  <Item
                    style={{
                      alignSelf: 'center',
                      height: '3vh',
                      backgroundColor: '#FFF',
                      width: '15vw',
                    }}
                    regular
                  >
                    <Input
                      style={{ height: '3vh' }}
                      onChangeText={(text) => {
                        querySetter('nama', text);
                      }}
                      value={query.nama}
                    />
                  </Item>
                </Row>
              </Col>
              <Col>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center' }}>Tgl Lahir: </Text>
                  <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <TextInput
                      placeholder="DD"
                      style={{
                        textAlign: 'center',
                        borderRadius: 2,
                        marginRight: 5,
                        backgroundColor: 'white',
                        borderColor: 'grey',
                        height: '3vh',
                        borderWidth: 1,
                        width: '5vw',
                      }}
                      onChangeText={(text) => {
                        querySetter('dd', text);
                      }}
                      value={query.dd}
                    />
                    <TextInput
                      placeholder="MM"
                      style={{
                        textAlign: 'center',
                        borderRadius: 2,
                        marginRight: 5,
                        backgroundColor: 'white',
                        borderColor: 'grey',
                        height: '3vh',
                        borderWidth: 1,
                        width: '5vw',
                      }}
                      onChangeText={(text) => {
                        querySetter('mm', text);
                      }}
                      value={query.mm}
                    />
                    <TextInput
                      placeholder="YYYY"
                      style={{
                        textAlign: 'center',
                        borderRadius: 2,
                        backgroundColor: 'white',
                        borderColor: 'grey',
                        height: '3vh',
                        borderWidth: 1,
                        width: '5vw',
                      }}
                      onChangeText={(text) => {
                        querySetter('yyyy', text);
                      }}
                      value={query.yyyy}
                    />
                  </View>
                </Row>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center', marginRight: 10 }}>
                    No. HP:{}
                  </Text>
                  <Item
                    style={{
                      alignSelf: 'center',
                      height: '3vh',
                      backgroundColor: '#FFF',
                      width: '15vw',
                    }}
                    regular
                  >
                    <Input
                      style={{ height: '3vh' }}
                      onChangeText={(text) => {
                        querySetter('hp', text);
                      }}
                      value={query.hp}
                    />
                  </Item>
                </Row>
              </Col>
              <Col />
            </Grid>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={100} style={{ backgroundColor: '#f2e3c6' }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={2}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                {/* section 3.2.1 - tabel isi */}
                <Table dat={filtered}></Table>
              </Col>
              {/* section 3.3 Tombol Aksi*/}
              <Col size={2}></Col>
            </Grid>
          </Row>
          {/* section 4 - white space */}
          <Row size={2} style={{ backgroundColor: '#FFF' }}></Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default MemberList;
