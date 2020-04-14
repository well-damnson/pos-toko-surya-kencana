import React, { Component } from "react";
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
import { Text, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { currency } from "../utils";
import { useTable } from "react-table";

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

function Table() {
  const data = React.useMemo(
    () => [
      {
        col1: "1",
        col2: "AntamPure24-001",
        col3: "200gr",
        col4: "85%",
        col5: "Rp. 2.750.000",
        col6: "hapus",
      },
      {
        col1: "2",
        col2: "AntamPure24-002",
        col3: "100gr",
        col4: "85%",
        col5: "Rp. 1.575.000",
        col6: "hapus",
      },
      {
        col1: "3",
        col2: "AntamPure24-001",
        col3: "200gr",
        col4: "45%",
        col5: "Rp. 1.800.000",
        col6: "hapus",
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Kode Barang",
        accessor: "col2",
      },
      {
        Header: "Berat",
        accessor: "col3",
      },
      { Header: "Kadar", accessor: "col4" },
      { Header: "Harga", accessor: "col5" },
      { Header: "Tools", accessor: "col6" },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
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
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default class Beli extends Component {
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
              style={{ backgroundColor: "#d3ece1", justifyContent: "center" }}
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
                <Input style={{ height: "3vh" }} />
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
            <Row size={5} style={{ backgroundColor: "#FFF" }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginLeft: "5vw",
                  fontSize: 32,
                }}
              >
                Barang Beli
              </Text>
            </Row>
            {/* section 3 - tabel penjualan */}
            <Row size={75} style={{ backgroundColor: "#f2e3c6" }}>
              <Grid>
                {/* section 3.1 - whitespace */}
                <Col size={5}></Col>
                {/* section 3.2 - tabel */}
                <Col size={75} style={{ backgroundColor: "#c2eec7" }}>
                  <Styles>
                    <Table />
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
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item1" })
                        }
                        selected={this.state.radioSelected == "item1"}
                      />
                      <Text style={{ marginRight: 5 }}>Tunai</Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignSelf: "flex-start" }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item2" })
                        }
                        selected={this.state.radioSelected == "item2"}
                      />
                      <Text style={{ marginRight: 5 }}>BCA</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item3" })
                        }
                        selected={this.state.radioSelected == "item3"}
                      />
                      <Text style={{ marginRight: 5 }}>Mandiri</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item4" })
                        }
                        selected={this.state.radioSelected == "item4"}
                      />
                      <Text style={{ marginRight: 5 }}>BNI</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item5" })
                        }
                        selected={this.state.radioSelected == "item5"}
                      />
                      <Text style={{ marginRight: 5 }}>BRI</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item6" })
                        }
                        selected={this.state.radioSelected == "item6"}
                      />
                      <Text style={{ marginRight: 5 }}>Visa</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item7" })
                        }
                        selected={this.state.radioSelected == "item7"}
                      />
                      <Text style={{ marginRight: 5 }}>Master</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item8" })
                        }
                        selected={this.state.radioSelected == "item8"}
                      />
                      <Text style={{ marginRight: 5 }}>Go-Pay</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Radio
                        onPress={() =>
                          this.setState({ radioSelected: "item9" })
                        }
                        selected={this.state.radioSelected == "item9"}
                      />
                      <Text style={{ marginRight: 5 }}>OVO</Text>
                    </View>
                  </View>
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
                  >
                    <Text> Selesai </Text>
                  </Button>
                </Col>
              </Grid>
            </Row>
            {/* section 4 - white space */}
            <Row size={10} style={{ backgroundColor: "#FFF" }}></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

// section 1 - Header               untuk memasukan barcode member
// section 2 - Label penanda        penanda halaman
// section 3 - Tabel Utama          Jual/Beli/Tukar sesuai kebutuhan
//  section 3.1 - whitespace        untuk memberikan kesan rapih
//  section 3.2 - Tabel             seperti namanya
//   section 3.2.1 - Tabel          fungsi utama ada di sini
//   section 3.2.2 - Total harga    untuk me-rekap total jual/beli
//  section 3.3 - Tombol Aksi       lokasi tombol sesuai kebutuhan
// section 4 - whitespace           untuk estetik
