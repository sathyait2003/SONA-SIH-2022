import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
// import Home from './screens/Home'
import HomeGrievence from './HomeGrievence'
// import Register from './screens/register'
// import TrackComplaint from './screens/trackcomplaint'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterComplaint from './RegisterComplaint'
import TrackComplaint from './TrackComplaint'

export default function GrievancePortal() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Grievance System'>
        <Stack.Screen name='Grievance System' component={HomeGrievence} />
        <Stack.Screen name='Register' component={RegisterComplaint} />
        <Stack.Screen name='TrackComplaint' component={TrackComplaint} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})