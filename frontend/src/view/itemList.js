import React, { Component, useState, useEffect } from 'react';
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
} from 'native-base';
import { Text, View, TextInput, Picker } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { currency } from '../utils';
import Pastel from '../context/color';

import Hook from '@/wrapper';
import { useTable, usePagination } from 'react-table';
import ConfirmModal from '../modals/modalConfirm';
import UbahModal from '../modals/modalUbahItem';
import Modal from 'modal-enhanced-react-native-web';

function Table(props, setShowUbah) {
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
        beli: '123456789',
        jual: '987654321',
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
      {
        Header: 'Harga Beli',
        accessor: 'beli',
        Cell: (props) => {
          // console.log(props);
          return currency(props.row.values.beli);
        },
      },
      {
        Header: 'Harga Jual',
        accessor: 'jual',
        Cell: (props) => {
          // console.log(props);
          return currency(props.row.values.jual);
        },
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
      <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 1px black',
                    background: Pastel.dcell,
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
                          background: Pastel.cell,
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
                          background: Pastel.cell,
                          textAlign: 'center',
                        }}
                      >
                        <button
                          onClick={() =>
                            props.setShowUbah(true, i + pageSize * pageIndex)
                          }
                        >
                          Ubah
                        </button>
                        {/*
                         |
                          <button onClick={() => props.setShowConfirm(true, i)}>
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
                          background: Pastel.cell,
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

let ItemList = () => {
  let { Client } = Hook.useClientState();

  let [state, setState] = useState({
    barcode: '',
    nama: '',
    jenis: '',
    posisi: '',
    kadarStart: '',
    kadarEnd: '',
    beratStart: '',
    beratEnd: '',
    filter: 'Tampilkan Semua',
  });

  let [ubahShow, setUbahShow] = useState(false);
  let [confirmShow, setConfirmShow] = useState(false);
  let [selectedData, setSelectedData] = useState(0);

  let setShowConfirm = (value, index) => {
    setConfirmShow(value);
    setSelectedData(index);
  };

  let setShowUbah = (value, index) => {
    setUbahShow(value);
    setSelectedData(index);
    console.log('State Ubah = ', ubahShow);
  };

  let [filtered, setFiltered] = useState([]);
  let [data, setData] = useState([]);

  let [posisiPicker, setPosisiPicker] = useState([]);
  let [jenisPicker, setJenisPicker] = useState([]);

  let setter = (key, value, numberOnly = false) => {
    if (numberOnly) {
      value = value.replace(/[^\d.-]/g, '');
    }
    setState((state) => ({ ...state, [key]: value }));
  };

  let listRadio = ['Tampilkan Semua', 'Hanya Terjual', 'Sembunyikan Terjual'];

  let RadioButton = (item, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
      }}
    >
      <Radio
        onPress={() => setter('filter', item)}
        selected={state.filter == item}
      />
      <Text style={{ marginRight: 5 }}>{item}</Text>
    </View>
  );
  useEffect(() => {
    let fetchFunction = async () => {
      let ItemAreaServices = Client.service('item-area');
      let data = await ItemAreaServices.find();
      // console.log(data);
      setData([...data]);
      setFiltered([...data]);
      let posisi = {};
      let jenis = {};
      data.forEach((item) => {
        posisi[item.posisi] = true;
        jenis[item.jenis] = true;
      });
      setPosisiPicker(Object.keys(posisi).sort());
      setJenisPicker(Object.keys(jenis).sort());
    };
    fetchFunction();
  }, []);

  useEffect(() => {
    // console.log('Query Changed');
    // console.log('data', data);
    let filtered = [];
    let {
      barcode,
      nama,
      jenis,
      posisi,
      kadarStart,
      kadarEnd,
      beratStart,
      beratEnd,
      filter,
    } = state;
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
      if (jenis && !item.jenis.toLowerCase().includes(jenis.toLowerCase())) {
        continue;
      }
      if (posisi && !item.posisi.toLowerCase().includes(posisi.toLowerCase())) {
        continue;
      }
      if (kadarStart && !(item.kadar >= kadarStart)) {
        continue;
      }
      if (kadarEnd && !(item.kadar <= kadarEnd)) {
        continue;
      }
      if (beratStart && !(item.berat >= beratStart)) {
        continue;
      }
      if (beratEnd && !(item.berat <= beratEnd)) {
        continue;
      }
      if (filter && filter === 'Hanya Terjual' && item.terjual === false) {
        continue;
      }
      if (filter && filter === 'Sembunyikan Terjual' && item.terjual === true) {
        continue;
      }
      filtered.push(item);
    }
    // console.log(filtered);
    setFiltered(filtered);
  }, [state, data]);

  // console.log('data', data);
  // console.log('filter', filtered);
  let submit = (submitData) => {
    let dataFetch = async () => {
      let itemAreaServices = Client.service('item-area');
      let fetchData = await itemAreaServices.patch(filtered[selectedData]._id, {
        ...filtered[selectedData],
        ...submitData,
      });
      console.log(fetchData);
      if (fetchData._id) {
        setUbahShow(false);
        let newData = data.map((element) =>
          element._id === fetchData._id ? fetchData : element,
        );
        setData(newData);
      }
    };
    dataFetch();
  };
  console.log('itemlist');
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
        <Modal
          style={{ alignSelf: 'center' }}
          isVisible={ubahShow}
          onBackdropPress={() => setUbahShow(false)}
        >
          <UbahModal
            data={filtered[selectedData]}
            close={() => setUbahShow(false)}
            submit={submit}
          ></UbahModal>
        </Modal>
        <Grid>
          {/* section 1 - Header */}
          <Row
            size={15}
            style={{ backgroundColor: Pastel.dback, justifyContent: 'center' }}
          >
            <Grid>
              <Col size={50}>
                <Row
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'flex-end',
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
                <Row
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'flex-end',
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
                <Row
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text style={{ alignSelf: 'center', marginRight: 10 }}>
                    Jenis:
                  </Text>
                  <Picker
                    mode="dropdown"
                    style={{
                      alignSelf: 'center',
                      alignContent: 'center',
                      marginHorizontal: 7,
                      backgroundColor: 'white',
                      borderColor: 'grey',
                      height: '3vh',
                      borderWidth: 1,
                      borderRadius: 2,
                      width: '25vw',
                    }}
                    selectedValue={state.jenis}
                    onValueChange={(value) => {
                      setter('jenis', value);
                    }}
                  >
                    <Picker.Item label="Pilih" value="" />
                    {jenisPicker.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </Row>

                <Row
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text style={{ alignSelf: 'center', marginRight: 10 }}>
                    Posisi:
                  </Text>
                  <Picker
                    mode="dropdown"
                    style={{
                      alignSelf: 'center',
                      alignContent: 'center',
                      marginHorizontal: 7,
                      backgroundColor: 'white',
                      borderColor: 'grey',
                      height: '3vh',
                      borderWidth: 1,
                      borderRadius: 2,
                      width: '25vw',
                    }}
                    selectedValue={state.posisi}
                    onValueChange={(value) => {
                      setter('posisi', value);
                    }}
                  >
                    <Picker.Item label="Pilih" value="" />
                    {posisiPicker.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </Row>
              </Col>
              <Col size={50}>
                <Row
                  size={25}
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center' }}>Kadar: </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      marginRight: 5,
                    }}
                  >
                    <TextInput
                      placeholder="xx"
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
                      value={state.kadarStart}
                      onChangeText={(text) => setter('kadarStart', text)}
                    />
                    <Text>%</Text>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginRight: 10,
                      fontSize: 24,
                    }}
                  >
                    -
                  </Text>
                  <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <TextInput
                      placeholder="xx"
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
                      value={state.kadarEnd}
                      onChangeText={(text) => setter('kadarEnd', text)}
                    />
                    <Text>%</Text>
                  </View>
                </Row>
                <Row
                  size={25}
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center' }}>Berat: </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      marginRight: 5,
                    }}
                  >
                    <TextInput
                      placeholder="xx"
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
                      value={state.beratStart}
                      onChangeText={(text) => setter('beratStart', text)}
                    />
                    <Text>gr</Text>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginRight: 10,
                      fontSize: 24,
                    }}
                  >
                    -
                  </Text>
                  <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <TextInput
                      placeholder="xx"
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
                      value={state.beratEnd}
                      onChangeText={(text) => setter('beratEnd', text)}
                    />
                    <Text>gr</Text>
                  </View>
                </Row>
                <Row
                  size={50}
                  style={{
                    backgroundColor: Pastel.dback,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center', marginRight: '10' }}>
                    Terjual:
                  </Text>
                  <Text style={{ alignSelf: 'center', marginRight: '10' }}>
                    {' '}
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
                </Row>
              </Col>
              <Col />
            </Grid>
          </Row>
          {/* section 3 - tabel penjualan */}
          <Row size={65} style={{ backgroundColor: Pastel.back }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={2}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: Pastel.back }}>
                {/* section 3.2.1 - tabel isi */}
                <Table
                  show={filtered}
                  setShowConfirm={setShowConfirm}
                  setShowUbah={setShowUbah}
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

export default ItemList;
