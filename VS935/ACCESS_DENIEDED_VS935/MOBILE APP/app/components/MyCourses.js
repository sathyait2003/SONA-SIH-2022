import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Course from "./Course";
import CourseDetails from "./CourseDetails";
// import CustomerRatingBar from "./src/screens/CustomerRatingBar";

// import {
//   useFonts,
//   JosefinSans_400Regular,
//   JosefinSans_500Medium,
// } from "@expo-google-fonts/josefin-sans";
// // import { Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";
// import AppLoading from "expo-app-loading";

export default function MyCourses() {
  const Stack = createNativeStackNavigator();

  // let [fontsLoaded] = useFonts({
  //   JosefinSans_400Regular,
  //   JosefinSans_500Medium,
  //   Nunito_600SemiBold,
  //   Nunito_700Bold,
  // });

  // if (!fontsLoaded) {
  //   <AppLoading />;
  // }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        

        {/* Course Screen  */}
        <Stack.Screen
          name="Course"
          component={Course}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              // fontFamily: "",
            },
            headerTitle: "Courses",
            headerTitleAlign: "center",
          }}
        />

        {/* CourseDetails Screen  */}
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              // fontFamily: "Nunito_600SemiBold",
            },
            headerTitleAlign: "center",
          }}
        />

        

        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// export default MyCourseses;