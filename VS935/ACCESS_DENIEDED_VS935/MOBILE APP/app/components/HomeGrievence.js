import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import RegisterComplaint from './RegisterComplaint'
import TrackComplaint from './TrackComplaint'


export default function HomeGrievence() {
  
const [selectedOption,setSelectedOption]=useState("register")
  const navigation = useNavigation()
  
  return (
    <>
    <View style={styles.container}>
    <View style={{textAlign:"center",flex:1}}>
      
      <TouchableOpacity
        style={[styles.to,{
           
           borderRightStyle:"solid",
           borderRightWidth:2,
           
        backgroundColor: selectedOption=="register"? "#00a69c":"white", 
        }]}
        onPress={() => {
         setSelectedOption("register")
        }}
      >
        <Text style={{textAlign:"center",padding:5,color:selectedOption=="register"? "white":"black",
        fontSize:selectedOption=="register"? 20:16,
        
    }}>Register Complaint</Text>
      </TouchableOpacity>
      </View>
      <View style={{textAlign:"center",flex:1,
    }}>
      <TouchableOpacity
        style={[styles.to,{
          
        backgroundColor: selectedOption=="track"? "#00a69c":"white", 
        }]}
        onPress={() => {
          setSelectedOption("track")
        }}
      >
        <Text style={{textAlign:"center",padding:5,color:selectedOption=="track"? "white":"black",
        fontSize:selectedOption=="track"? 20:16,
        }}> Complaint tracking</Text>
      </TouchableOpacity>
      </View>
      </View>
      
      <View style={{height:"100%"}}>
        {selectedOption=="register" && (
                <RegisterComplaint/>
        )}
        {selectedOption=="track" && (
                <TrackComplaint/>
        )}
      </View>
      </>
      
    
  )
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: "row",
    backgroundColor: '#fff',
    
    backgroundColor: 'lightgrey',
  
    
  },
  to: {
    backgroundColor: 'white',
    elevation: 4,
    width: '100%',
    height: 50,

    textAlign: 'center',
   
    
    
  },
  btntext: {
    fontSize: 22,
  
  },
})