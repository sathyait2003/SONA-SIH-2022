import React, { useState } from 'react'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
// import MultiSelect from 'react-native-multiple-select'

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList, TouchableOpacity } from 'react-native'

const Home = () => {
  const [sortModalVisible, setSortModalVisible] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [isFilterPaid, setIsFilterPaid] = useState(true)
  const [sortby, setSortBy] = useState('rating')
  const [course, setCourse] = useState('all')
  const [value, setValue] = useState(0)
  const [vertValue, setVertValue] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)

  const [selectedItems, setSelectedItems] = useState([])

  {
    /* ============================================ Data ====================================== */
  }

  const items = [
    { id: 1, name: 'angellist' },
    { id: 2, name: 'codepen' },
    { id: 3, name: 'envelope' },
    { id: 4, name: 'etsy' },
    { id: 5, name: 'facebook' },
    { id: 6, name: 'foursquare' },
    { id: 7, name: 'github-alt' },
    { id: 8, name: 'github' },
    { id: 9, name: 'gitlab' },
    { id: 10, name: 'instagram' },
  ]

  const courses = [
    {
      id: 1,
      name: 'AI',
    },
    {
      id: 2,
      name: 'ML',
    },
    {
      id: 3,
      name: 'Web Dev',
    },
    {
      id: 4,
      name: 'App Dev',
    },
    {
      id: 5,
      name: 'CyberSecurity',
    },
  ]

  const cards = [
    ['Cloud Computing', 'NIT-T', '5', 'Cloud Computing', '95', '000056', 'CSE'],
    ['AR-VR is tech', 'NIT-A', '5', 'AR-VR', '88', '002500', 'CSE'],
    ['Intro to QC', 'NIT-S', '4', 'Quantum Computing', '75', '000586', 'CSE'],
    [
      'Loven with Meta Mask',
      'IIIT-N',
      '3',
      'Blockchain',
      '70',
      '000045',
      'CSE',
    ],
    ['Say Hi to W3', 'IIT-K', '2', 'Web-3', '60', '000896', 'CSE'],
    ['Go Dart with Flutter', 'IIIT-L', '4', 'App-Dev', '50', '000003', 'ECE'],
    ['Computer Speaks', 'IIT-M', '5', 'NLP', '45', '000076', 'CSE'],
    ['AI is future', 'NIT-W', '3', 'AI-ML', '45', '002528', 'CSE'],
    ['IOTICS', 'IIT-J', '2', 'IOT', '45', '000806', 'CSE'],
    ['Intro to JS', 'IIIT-H', '5', 'Web-Dev', '100', '000001', 'CSE'],
  ]

  const radio_props = [
    { label: 'Ratings ', value: 0 },
    { label: 'Price : low to high', value: 1 },
    { label: 'Price : high to low', value: 2 },
  ]

  const filter_options = [
    { label: 'Paid         |      ', value: 0 },
    { label: 'Free', value: 1 },
  ]

  // ==================================================classes==================================================

  {
    /* ============================================ functions ====================================== */
  }

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems)
  }

  const sortHandler = (val) => {
    if (val == 0) {
      setSortBy('rating')
    } else if (val == 1) {
      setSortBy('plh')
    } else setSortBy('phl')
  }

  const filterHandler = (val) => {
    if (val == 0) {
      setIsFilterPaid(true)
    } else setIsFilterPaid(false)
  }

  const ItemRender = ({ name }) => (
    <TouchableOpacity
      style={style.item}
      onPress={() => {
        setCourse(name)
      }}
    >
      <Text style={style.itemText}>{name}</Text>
    </TouchableOpacity>
  )

  const Separator = () => {
    return (
      <View
        style={{
          height: 30,
          marginTop: 13,
          width: 1,
          backgroundColor: 'white',
        }}
      />
    )
  }

  // ===================================================main div =================================================
  return (
    <>
      <View style={{ backgroundColor: '#4ACDBD', zIndex: 0 }}>
        {/* //===========================================sidebar========================================================== */}

        {/* <Modal
          animationType='fade'
          //transparent={true}
          visible={showSidebar}
          presentationStyle='pagesheet'
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setShowSidebar(!showSidebar)
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Hello World!</Text>
              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setShowSidebar(!showSidebar)}
              >
                <Text style={style.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}

        {/* ====================================== Sort modal =====================================================   */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={sortModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!sortModalVisible)
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Sort By</Text>

              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(value) => {
                  sortHandler(value)
                }}
              />

              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setSortModalVisible(!sortModalVisible)}
              >
                <Text style={style.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* 
      =================================== Sort Modal End=================================================== */}
        {/* =================================== Filter Modal Start ================================================ */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setFilterModalVisible(!filterModalVisible)
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Sort By</Text>

              <RadioForm
                radio_props={filter_options}
                initial={0}
                onPress={(value) => {
                  filterHandler(value)
                }}
                formHorizontal={true}
              />

              <View
                style={{
                  width: '80%',
                  marginTop: 20,
                  margin: 'auto',
                }}
              >
                {/* <MultiSelect
                  hideTags
                  items={items}
                  uniqueKey='id'
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText='Filter by'
                  searchInputPlaceholderText='Search Items...'
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor='#CCC'
                  tagBorderColor='#CCC'
                  tagTextColor='#CCC'
                  selectedItemTextColor='#CCC'
                  selectedItemIconColor='#CCC'
                  itemTextColor='#000'
                  displayKey='name'
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor='#48d22b'
                  submitButtonText='Submit'
                /> */}
              </View>

              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setFilterModalVisible(!filterModalVisible)}
              >
                <Text style={style.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* ============================================ Filter modal end ====================================== */}
        {/* ============================================ Header ====================================== */}
        <View
          style={{
            zIndex: 0,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {/* <View style={{ width: '45%', marginTop: 10 }}>
            <TouchableOpacity onPress={() => setShowSidebar(!showSidebar)}>
              <Image
                source={require('../../assets/menu.png')}
                style={{ height: 25, width: 20 }}
              />
            </TouchableOpacity>
          </View> */}
          <View>
            <Text style={{ fontSize: 24, color: 'white' }}>Courses</Text>
          </View>
        </View>

        <View
          style={{
            paddingLeft: 25,
            paddingRight: 25,
            width: '100%',
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          {/* <MultiSelect
            hideTags
            items={items}
            uniqueKey='id'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText='Filter by'
            searchInputPlaceholderText='Search Items...'
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor='#CCC'
            tagBorderColor='#CCC'
            tagTextColor='#CCC'
            selectedItemTextColor='#CCC'
            selectedItemIconColor='#CCC'
            itemTextColor='#000'
            displayKey='name'
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor='#48d22b'
            submitButtonText='Submit'
          /> */}
        </View>

        <View>
          <FlatList
            style={{ marginTop: 10 }}
            data={courses}
            renderItem={({ item }) => <ItemRender name={item.name} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
            horizontal={true}
          />
        </View>
        {/* ============================================ Main div ====================================== */}
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            height: '100%',
          }}
        >
          {/* ========================================= Sort and filter buttons =====================================*/}

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* ============================================ Sort ====================================== */}
            <View
              style={{
                height: 40,
                flex: 1,
                textAlign: 'center',
              }}
            >
              <TouchableOpacity
                style={{ borderStyle: 'solid', borderWidth: 2, padding: 10 }}
                onPress={() => setSortModalVisible(true)}
              >
                <Text style={{ textAlign: 'center' }}>Sort</Text>
              </TouchableOpacity>
            </View>

            {/* ============================================ Filter ====================================== */}

            <View
              style={{
                height: 40,
                flex: 1,
                textAlign: 'center',
              }}
            >
              <TouchableOpacity
                style={{ borderStyle: 'solid', padding: 10, borderWidth: 2 }}
                onPress={() => setFilterModalVisible(true)}
              >
                <Text style={{ textAlign: 'center' }}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ============================================ Buttons end ====================================== */}

          {/* ============================================ Cards Display=========================================== */}

          <FlatList
            data={cards}
            renderItem={(item) => {
              console.log('item', item.item[2])
              let imgsrc
              if (item.item[2] == 1)
                imgsrc = require('../..//assets/1star.jpg')
              else if (item.item[2] == 2)
                imgsrc = require('../../assets/2star.jpg')
              else if (item.item[2] == 3)
                imgsrc = require('../../assets/3star.jpg')
              else if (item.item[2] == 4)
                imgsrc = require('../../assets/4star.jpg')
              else if (item.item[2] == 5)
                imgsrc = require('../../assets/5star.jpg')
              console.log('imgsrc', imgsrc)
              return (
                <TouchableOpacity style={{ backgroundColor: 'white' }}>
                  <View
                    style={{
                      width: '100%',
                      height: 120,
                      borderStyle: 'solid',
                      borderWidth: 0,
                      elevation: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 20,
                    }}
                  >
                    <View
                      style={{
                        width: '28%',
                        backgroundColor: '#4acdbd',
                        borderRadius: 5,
                      }}
                    >
                      <Image
                        style={style.image}
                        source={require('../../assets/R.png')}
                      />
                    </View>
                    <View style={{ marginLeft: 2, width: '75%' }}>
                      <Text style={style.resoname}>{item.item[0]}</Text>
                      <Text style={{ textAlign: 'center' }}>
                        {item.item[1]}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          marginTop: 7,
                          borderStyle: 'solid',
                          borderColor: '#d1d8e3',
                          borderWidth: 2,
                        }}
                      ></View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}
                      >
                        <View>
                          <Image style={style.ratingimage} source={imgsrc} />
                        </View>
                        <View
                          style={{
                            backgroundColor:
                              item.item[4] > 0 ? '#FFA500' : 'lightgreen',
                            marginLeft: '36%',
                            width: 50,
                            textAlign: 'center',
                            justifyContent: 'flex-end',
                            alignSelf: 'flex-end',
                          }}
                        >
                          <Text
                            style={{
                              textAlign: 'center',
                              padding: 1,
                            }}
                          >
                            {item.item[4] > 0 ? 'Paid' : 'Free'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />

          
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  resoname: {
    fontSize: 24,
    color: '#4acdbd',
    textAlign: 'center',
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },

  image: {
    height: 80,
    width: 80,
  },

  ratingimage: {
    margin: 2,
    padding: 2,
    height: 15,
    width: 80,
  },

  item: {
    padding: 8,
    backgroundColor: '#4ACDBD',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default Home
