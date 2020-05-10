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

import TambahItemModal from '../modals/modalTambahItem';
import ConfirmModal from '../modals/modalConfirm';
import SearchItemModal from '../modals/modalSearchItem';

import Modal from 'modal-enhanced-react-native-web';

import Hook from '@/wrapper';

function TableJual({ dat, setDat, setShowModal, changeJualAmount }) {
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
        accessor: 'jual',
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.jual || 0) + sum,
                0,
              ),
            [info.rows],
          );
          return <>Total: {currency(total)}</>;
        },
        Cell: (props) => {
          console.log(props);
          return currency(props.row.values.jual);
        },
        // https://stackoverflow.com/questions/48704269/react-table-package-formatting-float-as-currency , https://medium.com/@nidhinkumar/react-js-number-format-and-styling-a1a6e211e629
      },
      { Header: 'Tools', accessor: 'col6' },
    ],
    [],
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
                // if (index === row.cells.length) console.log('cell', cell);
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
                    key={index}
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
                    key={index}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
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
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    <input
                      style={{ height: '2em' }}
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
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

function TableBeli({ dat, removeData }) {
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
    </table>
  );
}

let Tukartambah = () => {
  let { Client } = Hook.useClientState();

  let [state, setState] = useState({
    paymentMethod: 'Tunai',
    noRef: '',
    memberBarcode: '',
  });

  let setter = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

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
        onPress={() => setState(setter('paymentMethod', item))}
        selected={state.paymentMethod == item}
      />
      <Text style={{ marginRight: 5 }}>{item}</Text>
    </View>
  );

  let [modalShow, setModalShow] = useState(false);
  let [selectedData, setSelectedData] = useState(0);
  let setShowModal = (value, index) => {
    setModalShow(value);
    setSelectedData(index);
  };

  let [jual, setJual] = useState([]);
  let [searchShow, setSearchShow] = useState(false);
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
    let newPrice = price.target.value.replace(/\D/g, '');
    let selected = jual[index];
    let before = jual.slice(0, index);
    let after = jual.slice(index + 1, jual.length);
    selected.jual = newPrice;
    let newJual = [...before, selected, ...after];
    setJual(newJual);
  };

  let [beli, setBeli] = useState([]);
  let [addItemShow, setAddItemShow] = useState(false);
  let [removeItemShow, setRemoveItemShow] = useState(false);
  let [selectedIndex, setSelectedIndex] = useState(0);
  let removeDataBeli = (index) => {
    let newData = [...beli];
    newData.splice(index, 1);
    setBeli(newData);
  };
  let setShowModalBeli = (value, index) => {
    setRemoveItemShow(value);
    setSelectedIndex(index);
  };
  let addDataBeli = (state) => {
    console.log('submit pressed');
    console.log(state);
    if (
      state.nama.length &&
      (state.jenis !== '-' || state.jenisBaru.length) &&
      state.berat.length &&
      state.kadar.length &&
      (state.posisi !== '-' || state.posisiBaru.length) &&
      state.beli.length
    ) {
      console.log('Submitted');
      setBeli((beli) => [...beli, state]);
      setAddItemShow(false);
    }
  };

  let [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < jual.length; index++) {
      const { jual: harga } = jual[index];
      total += harga;
    }

    for (let index = 0; index < beli.length; index++) {
      const { beli: harga } = beli[index];
      total -= parseInt(harga);
    }

    setTransactionData({ ...state, jual, beli, total, type: 'tukar' });
  }, [state, jual, beli]);

  let submitTukar = () => {
    let submit = async () => {
      if (
        transactionData.jual.length > 0 &&
        transactionData.beli.length > 0 &&
        transactionData.total > 0 &&
        transactionData.memberBarcode.length > 0
      ) {
        let TransactionAreaServices = Client.service('transaction-area');
        let result = await TransactionAreaServices.create(transactionData);
        console.log(result);
        if (result._id) {
          setState({ paymentMethod: 'Tunai', noRef: '', memberBarcode: '' });
          setTransactionData({});
          setJual([]);
          setBeli([]);
          console.log('success');
        }
      }
    };
    console.log(transactionData);
    submit();
  };
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Modal
          style={{ alignSelf: 'center' }}
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
          style={{ alignSelf: 'center' }}
          isVisible={modalShow}
          onBackdropPress={() => setModalShow(false)}
        >
          <ConfirmModal
            function={() => removeData(selectedData)}
            close={() => setModalShow(false)}
          ></ConfirmModal>
        </Modal>
        <Modal
          isVisible={addItemShow}
          onBackdropPress={() => setAddItemShow(false)}
        >
          <TambahItemModal submit={addDataBeli}></TambahItemModal>
        </Modal>
        <Modal
          style={{ alignSelf: 'center' }}
          isVisible={removeItemShow}
          onBackdropPress={() => setRemoveItemShow(false)}
        >
          <ConfirmModal
            function={() => removeDataBeli(selectedIndex)}
            close={() => setRemoveItemShow(false)}
          ></ConfirmModal>
        </Modal>
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
              <Input
                style={{ height: '3vh' }}
                value={state.memberBarcode}
                onChangeText={(text) => {
                  setter('memberBarcode', text);
                }}
              />
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
                <TableJual
                  dat={jual}
                  setDat={setJual}
                  setShowModal={setShowModal}
                  changeJualAmount={changeJualAmount}
                />
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
                  onClick={() => {
                    setSearchShow(true);
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
                <TableBeli dat={beli} removeData={setShowModalBeli}></TableBeli>
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
                  onPress={() => setAddItemShow(true)}
                >
                  <Text>Tambah Barang</Text>
                </Button>
                <View style={{ flex: 1 }}></View>
              </Col>
            </Grid>
          </Row>
          {/* section 4 - white space */}
          <Row size={25} style={{ backgroundColor: '#FFF' }}>
            <View style={{ flex: 5 }} />
            <View
              style={{
                flex: 75,
                flexDirection: 'row',
                paddingLeft: 50,
                backgroundColor: 'blue',
              }}
            >
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
            </View>
            <View
              style={{
                flex: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'green',
              }}
            >
              <Button
                light
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 15,
                  width: '10vw',
                  justifyContent: 'center',
                }}
                onPress={submitTukar}
              >
                <Text> Selesai </Text>
              </Button>
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
