import React, { Component, useState } from 'react';
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

function Table() {
  let [dat, setDat] = useState([
    {
      col1: '1',
      col2: 'AntamPure24-001',
      col3: '200gr',
      col4: '85%',
      col5: 2750000,
      col6: 'hapus',
    },
    {
      col1: '2',
      col2: 'AntamPure24-002',
      col3: '100gr',
      col4: '85%',
      col5: 1575000,
      col6: 'hapus',
    },
    {
      col1: '3',
      col2: 'AntamPure24-001',
      col3: '200gr',
      col4: '45%',
      col5: 1800000,
      col6: 'hapus',
    },
  ]);
  let addData = () => {};
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
        accessor: 'col2',
      },
      {
        Header: 'Berat',
        accessor: 'col3',
      },
      { Header: 'Kadar', accessor: 'col4' },
      {
        Header: 'Harga',
        accessor: 'col5',
        Footer: (info) => {
          const total = React.useMemo(
            () => info.rows.reduce((sum, row) => row.values.col5 + sum, 0),
            [info.rows],
          );
          return <>Total: {currency(total)}</>;
        },
        // Cell: (props) =>
        //   new Intl.NumberFormat("id-ID", {
        //     style: "currency",
        //     currency: "IDR",
        //   }).format(props.value),
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

export default class Jual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioSelected: undefined,
    };
  }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            {/* section 1 - Header */}
            <Row
              size={10}
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
            <Row size={8} style={{ backgroundColor: '#FFF' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: '5vw',
                  fontSize: 32,
                  padding: 5,
                }}
              >
                Barang Jual
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
                    <Table />
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item1' })
                        }
                        selected={this.state.radioSelected == 'item1'}
                      />
                      <Text style={{ marginRight: 5 }}>Tunai</Text>
                    </View>
                    <View
                      style={{ flexDirection: 'row', alignSelf: 'flex-start' }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item2' })
                        }
                        selected={this.state.radioSelected == 'item2'}
                      />
                      <Text style={{ marginRight: 5 }}>BCA</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item3' })
                        }
                        selected={this.state.radioSelected == 'item3'}
                      />
                      <Text style={{ marginRight: 5 }}>Mandiri</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item4' })
                        }
                        selected={this.state.radioSelected == 'item4'}
                      />
                      <Text style={{ marginRight: 5 }}>BNI</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item5' })
                        }
                        selected={this.state.radioSelected == 'item5'}
                      />
                      <Text style={{ marginRight: 5 }}>BRI</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item6' })
                        }
                        selected={this.state.radioSelected == 'item6'}
                      />
                      <Text style={{ marginRight: 5 }}>Visa</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item7' })
                        }
                        selected={this.state.radioSelected == 'item7'}
                      />
                      <Text style={{ marginRight: 5 }}>Master</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item8' })
                        }
                        selected={this.state.radioSelected == 'item8'}
                      />
                      <Text style={{ marginRight: 5 }}>Go-Pay</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: 'item9' })
                        }
                        selected={this.state.radioSelected == 'item9'}
                      />
                      <Text style={{ marginRight: 5 }}>OVO</Text>
                    </View>
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
  }
}
