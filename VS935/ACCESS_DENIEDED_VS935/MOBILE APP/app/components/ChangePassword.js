import { Image, Text, View, Button } from "react-native";
import {  useState } from "react";
import * as React from "react";
import { TextInput } from "react-native-paper";
import FormSubmitButton from "./FormSubmitButton";

export default function ChangePassword({}) {
  const [text, settext] = useState("");

  return (
    <View style={{ backgroundColor: "#F9FEFF" }}>
      {/* <Image
        style={{ width: 150, height: 150, margin: "auto", marginTop: 20 }}
        source={require("../assets/lock.jpg")}
      /> */}
      <Text
        style={{
          marginTop: 30,
          fontSize: 30,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Change Password
      </Text>
      <TextInput
        style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}
        label="Old Password"
        value={text}
        onChangeText={(text) => settext(text)}
      />
      <TextInput
        style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}
        label="New Password"
        value={text}
        onChangeText={(text) => settext(text)}
      />
      <TextInput
        style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}
        label="Confirm Password"
        value={text}
        onChangeText={(text) => settext(text)}
      />
      <br />
      <br />
      
      <View
        style={{
          width: "100%",
          height: 240,
          paddingLeft: 140,
          paddingRight: 140,
        }}
      >
        <FormSubmitButton title='Change' />
        
      </View>
    </View>
  );
}
