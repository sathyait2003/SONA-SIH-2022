import { StatusBar } from 'expo-status-bar'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'

const TrackComplaint = () => {
  return (
    <View style={{ height: '100%', padding: 10, alignItems: 'center' }}>
      <View
        style={{
          backgroundColor: 'lightgreen',
          width: '90%',
          alignSelf: 'center',
          height: 40,
          borderTopLeftRadius: 23,
          borderTopRightRadius: 23,
          textAlign: 'center',
          padding: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Solved</Text>
      </View>
      <View
        style={{
          width: '90%',
          height: 120,
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderWidth: 2,
          padding: 15,
          borderBottomLeftRadius: 23,
          borderBottomRightRadius: 23,
        }}
      >
        ksahjkdhashdskhsa
      </View>
    </View>
  )
}

export default TrackComplaint