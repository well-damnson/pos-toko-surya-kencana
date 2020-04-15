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

import Hook from '@/wrapper';

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
    filter: '',
  });

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
      console.log(data);
      setData([...data]);
      setFiltered([...data]);
      let posisi = {};
      let jenis = {};
      data.forEach((item) => {
        posisi[item.posisi] = true;
        jenis[item.jenis] = true;
      });
      setPosisiPicker(Object.keys(posisi));
      setJenisPicker(Object.keys(jenis));
    };
    fetchFunction();
  }, []);

  useEffect(() => {
    console.log('Query Changed');
    console.log('data', data);
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
      console.log('index', index);
      const item = data[index];
      console.log('item', item);
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
    console.log(filtered);
    setFiltered(filtered);
  }, [state]);

  console.log('data', data);
  console.log('filter', filtered);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Grid>
          {/* section 1 - Header */}
          <Row
            size={35}
            style={{ backgroundColor: '#d3ece1', justifyContent: 'center' }}
          >
            <Grid>
              <Col size={50}>
                <Row
                  style={{
                    backgroundColor: '#d3ece1',
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
                    backgroundColor: '#d3ece1',
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
                    backgroundColor: '#d3ece1',
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
                    backgroundColor: '#d3ece1',
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
                    backgroundColor: '#d3ece1',
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
                    backgroundColor: '#d3ece1',
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
                    backgroundColor: '#d3ece1',
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
          <Row size={65} style={{ backgroundColor: '#f2e3c6' }}>
            <Grid>
              {/* section 3.1 - whitespace */}
              <Col size={2}></Col>
              {/* section 3.2 - tabel */}
              <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                {/* section 3.2.1 - tabel isi */}
                <Row size={95}>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      Nomor
                    </Text>
                  </Col>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      Nama
                    </Text>
                  </Col>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      No. Telefon
                    </Text>
                  </Col>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      Tanggal Lahir
                    </Text>
                  </Col>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      Alamat
                    </Text>
                  </Col>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      Poin
                    </Text>
                  </Col>
                  <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                      Tools
                    </Text>
                  </Col>
                </Row>
                {/*section 3.2.2 - total harga */}
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

export default ItemList;
class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selected2: undefined,
      radioSelected: 'item1',
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value,
    });
  }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            {/* section 1 - Header */}
            <Row
              size={35}
              style={{ backgroundColor: '#d3ece1', justifyContent: 'center' }}
            >
              <Grid>
                <Col size={50}>
                  <Row
                    style={{
                      backgroundColor: '#d3ece1',
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
                    />
                  </Row>
                  <Row
                    style={{
                      backgroundColor: '#d3ece1',
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
                    />
                  </Row>
                  <Row
                    style={{
                      backgroundColor: '#d3ece1',
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
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Pilih" value="key0" />
                      <Picker.Item label="Kalung" value="key1" />
                      <Picker.Item label="Liontin" value="key2" />
                      <Picker.Item label="Anting" value="key3" />
                      <Picker.Item label="Cincin" value="key4" />
                    </Picker>
                  </Row>

                  <Row
                    style={{
                      backgroundColor: '#d3ece1',
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
                      selectedValue={this.state.selected2}
                      onValueChange2={this.onValueChange2.bind(this)}
                    >
                      <Picker.Item label="Pilih" value="key0" />
                      <Picker.Item label="A1" value="key1" />
                      <Picker.Item label="A2" value="key2" />
                      <Picker.Item label="B1" value="key3" />
                      <Picker.Item label="B2" value="key4" />
                    </Picker>
                  </Row>
                </Col>
                <Col size={50}>
                  <Row
                    size={25}
                    style={{
                      backgroundColor: '#d3ece1',
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
                      />
                      <Text>%</Text>
                    </View>
                  </Row>
                  <Row
                    size={25}
                    style={{
                      backgroundColor: '#d3ece1',
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
                      />
                      <Text>gr</Text>
                    </View>
                  </Row>
                  <Row
                    size={50}
                    style={{
                      backgroundColor: '#d3ece1',
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
                        <Text style={{ marginRight: 5 }}>Tampilkan Semua</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Radio
                          onPress={() =>
                            this.setState({ radioSelected: 'item2' })
                          }
                          selected={this.state.radioSelected == 'item2'}
                        />
                        <Text style={{ marginRight: 5 }}>
                          Sembunyikan Terjual
                        </Text>
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
                        <Text style={{ marginRight: 5 }}>Hanya Terjual</Text>
                      </View>
                    </View>
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
                  <Row size={95}>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Nomor
                      </Text>
                    </Col>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Nama
                      </Text>
                    </Col>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        No. Telefon
                      </Text>
                    </Col>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Tanggal Lahir
                      </Text>
                    </Col>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Alamat
                      </Text>
                    </Col>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Poin
                      </Text>
                    </Col>
                    <Col style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}>
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Tools
                      </Text>
                    </Col>
                  </Row>
                  {/*section 3.2.2 - total harga */}
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
  }
}
