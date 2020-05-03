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
import { Text, View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { currency } from '../utils';
import { useTable, usePagination } from 'react-table';

import Hook from '@/wrapper';
import ConfirmModal from '../modals/modalConfirm';
import Modal from 'modal-enhanced-react-native-web';

function Table(props) {
  const data = React.useMemo(() => [...props.show], [props]);
  const data1 = React.useMemo(
    () => [
      {
        col1: '1',
        nama: 'Sample-Code',
        jenis: 'Sample-Gold',
        berat: 'Sample-Weight',
        kadar: 'Sample-Rate',
        posisi: 'Sample-Position',
        col6: 'Test',
      },
      {
        col1: '2',
        nama: 'Sample',
      },
      {
        col1: '3',
        nama: 'Sample',
      },
    ],
    [],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Kode Barang',
        accessor: 'nama',
      },
      {
        Header: 'Jenis',
        accessor: 'jenis',
      },
      {
        Header: 'Berat',
        accessor: 'berat',
      },
      {
        Header: 'Kadar',
        accessor: 'kadar',
      },
      {
        Header: 'Posisi',
        accessor: 'posisi',
      },
      // {
      //   Header: "Tools",
      //   accessor: "col6",
      // },
    ],
    [],
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
      // initialState: { pageIndex: 2 }, incase gk mau start di page pertama (?)
    },
    usePagination,
  );

  // Render the UI for your table
  //TODO: apus style dalam tabel dan ganti make styled
  return (
    <>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 1px black',
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
                  else if (index === row.cells.length - 1)
                    ret = (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                          textAlign: 'center',
                        }}
                      >
                        <button
                          onClick={() => {
                            props.addData(props.show[i + pageSize * pageIndex]);
                          }}
                        >
                          Pilih
                        </button>
                        {/* |{" "}
                        <button onClick={() => setShowConfirm(true, i)}>
                          Hapus
                        </button>*/}
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
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
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

let SearchItem = ({ addData, existing }) => {
  let { Client } = Hook.useClientState();
  // statenya diatas sini gw pake hook jadi kalo lu mau
  let [state, setState] = useState({
    barcode: '',
    nama: '',
  });

  let [confirmShow, setConfirmShow] = useState(false);
  let [selectedData, setSelectedData] = useState(0);

  let setShowConfirm = (value, index) => {
    setConfirmShow(value);
    setSelectedData(index);
  };

  let [filtered, setFiltered] = useState([]);
  let [data, setData] = useState([]);

  let setter = (key, value, numberOnly = false) => {
    if (numberOnly) {
      value = value.replace(/[^\d.-]/g, '');
    }
    setState((state) => ({ ...state, [key]: value }));
  };

  useEffect(() => {
    let fetchFunction = async () => {
      let ItemAreaServices = Client.service('item-area');
      let data = await ItemAreaServices.find();
      // console.log(data);
      let dataWithoutExisting = [];
      for (let i = 0; i < data.length; i++) {
        let exist = false;
        for (let j = 0; j < existing.length; j++) {
          console.log(existing[j], data[i]);
          if (existing[j]._id === data[i]._id) exist = true;
        }
        if (!exist) {
          dataWithoutExisting.push(data[i]);
        }
      }
      setData([...dataWithoutExisting]);
      setFiltered([...dataWithoutExisting]);
      let posisi = {};
      let jenis = {};
      data.forEach((item) => {
        posisi[item.posisi] = true;
        jenis[item.jenis] = true;
      });
    };
    fetchFunction();
  }, []);
  useEffect(() => {
    let dataWithoutExisting = [];
    for (let i = 0; i < data.length; i++) {
      let exist = false;
      for (let j = 0; j < existing.length; j++) {
        // console.log(existing[j], data[i]);
        if (existing[j]._id === data[i]._id) exist = true;
      }
      if (!exist) {
        dataWithoutExisting.push(data[i]);
      }
    }
    setData([...dataWithoutExisting]);
  }, [existing]);
  useEffect(() => {
    // console.log('Query Changed');
    // console.log('data', data);
    let filtered = [];
    let { barcode, nama } = state;
    for (let index = 0; index < data.length; index++) {
      // console.log('index', index);
      const item = data[index];
      // console.log('item', item);
      if (barcode && !item.barcode.includes(barcode)) {
        continue;
      }
      if (nama && !item.nama.toLowerCase().includes(nama.toLowerCase())) {
        continue;
      }
      filtered.push(item);
    }
    // console.log(filtered);
    setFiltered(filtered);
  }, [data, state]);

  // console.log('data', data);
  // console.log('filter', filtered);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Modal
          style={{ alignSelf: 'center' }}
          isVisible={confirmShow}
          onBackdropPress={() => setConfirmShow(false)}
        >
          <ConfirmModal
            // function={() => removeData(selectedData)}
            close={() => setConfirmShow(false)}
          ></ConfirmModal>
        </Modal>
        <Grid>
          {/* section 1 - Header */}
          <Row
            size={15}
            style={{ backgroundColor: '#d3ece1', justifyContent: 'center' }}
          >
            <Grid>
              <Col size={50}>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center' }}>Barcode: </Text>
                  <TextInput
                    placeholder="Barcode"
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginHorizontal: 7,
                      backgroundColor: 'white',
                      borderColor: 'grey',
                      height: '3vh',
                      borderWidth: 1,
                      borderRadius: 2,
                      width: '25vw',
                    }}
                    value={state.barcode}
                    onChangeText={(text) => setter('barcode', text)}
                  />
                </Row>
              </Col>
              <Col size={50}>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
                    justifyContent: 'center ',
                  }}
                >
                  <Text style={{ alignSelf: 'center' }}>Kode Barang:</Text>
                  <TextInput
                    placeholder="Kode Barang"
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginHorizontal: 7,
                      backgroundColor: 'white',
                      borderColor: 'grey',
                      height: '3vh',
                      borderWidth: 1,
                      borderRadius: 2,
                      width: '25vw',
                    }}
                    value={state.nama}
                    onChangeText={(text) => setter('nama', text)}
                  />
                </Row>
              </Col>
              <Col />
            </Grid>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={65} style={{ backgroundColor: '#f2e3c6' }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={2}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                {/* section 3.2.1 - tabel isi */}
                <Table
                  show={filtered}
                  setShowConfirm={setShowConfirm}
                  addData={addData}
                ></Table>
                {/*section 3.2.2 - total harga */}
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

export default SearchItem;
