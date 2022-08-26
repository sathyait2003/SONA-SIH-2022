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

export default function RegisterComplaint() {
  const [Rn, setRN] = useState('')
  const [In, setIN] = useState('')
  const [An, setAN] = useState('')
  const [complaint, setComplaint] = useState('')
  return (
    <View style={{ padding: 10 }}>
      
      <TextInput
        style={{
          borderColor: 'white',
          backgroundColor: 'white',
          height: 40,
          marginTop: 20,
          padding: 15,
        }}
        underlineColorAndroid='transparent'
        placeholder=' !   Enter Resource Name'
        placeholderTextColor='#C0C0C0'
        autoCapitalize='none'
        onChangeText={(e) => {
          console.log(e)
          setRN(e)
        }}
      />
      <TextInput
        style={{
          borderColor: 'white',
          backgroundColor: 'white',
          height: 40,
          marginTop: 20,
          padding: 15,
        }}
        underlineColorAndroid='transparent'
        placeholder=' !   Enter Institution Name'
        placeholderTextColor='#C0C0C0'
        autoCapitalize='none'
        onChangeText={(e) => {
          console.log(e)
          setIN(e)
        }}
      />
      <TextInput
        style={{
          borderColor: 'white',
          backgroundColor: 'white',
          height: 40,
          marginTop: 20,
          padding: 15,
        }}
        underlineColorAndroid='transparent'
        placeholder=' !   Enter Author Name'
        placeholderTextColor='#C0C0C0'
        autoCapitalize='none'
        onChangeText={(e) => {
          console.log(e)
          setAN(e)
        }}
      />
      <TextInput
        multiline
        style={{
          minHeight: 200,
          backgroundColor: 'white',
          marginTop: 20,
          padding: 20,
        }}
        placeholder='Enter your complaint'
        onChangeText={(e) => {
          console.log(e)
          setComplaint(e)
        }}
      />

      <Button
        title='Submit'
        style={{ height: 40, width: 80 }}
        onPress={() => {
          console.log(Rn)
          console.log(In)
          console.log(An)
          console.log(complaint)
        }}
      />
    </View>
  )
}