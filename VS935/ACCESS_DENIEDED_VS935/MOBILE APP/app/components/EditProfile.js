import { View, Text, StyleSheet, Button ,Image} from "react-native";
import React, { useState } from "react";
import { TextInput, Select } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

import AntDesign from "react-native-vector-icons/AntDesign";
import FormSubmitButton from "./FormSubmitButton";

const EditProfile = () => {
  const data = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <View>
      <br />
      <Image
                 source={{
                  uri:

                    'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                }}
              />
      <br />
      <Text style={{ fontSize: 30, margin: "auto" }}>Edit Profile</Text>
      <br />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>User iD : </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="123456789"
        editable={false}
      />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>Name : </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="Rohit Chawla"
      />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>College Name : </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="IIIT Nagpur"
      />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>Gender :</Text>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "#00a69c" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>Email : </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="bt20cse139@iiitn.ac.in"
      />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>Mobile No : </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="9876543212"
      />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>College ID : </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="12345667"
      />
      <br />
      <Text style={{ fontSize: 20, marginLeft: 55 }}>
        Total Courses Enrolled :{" "}
      </Text>
      <TextInput
        style={{ width: 300, marginLeft: 50, marginRight: 30, marginTop: 10 }}
        defaultValue="5"
        editable={false}
      />
      <br />
      <View
        style={{
          width: "100%",
          height: 240,
          paddingLeft: 140,
          paddingRight: 140,
        }}
      >
         <FormSubmitButton title='Edit Profile' />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 310,
    margin: "auto",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imgiis:{
    height: 425, 
    width: 420,
    position:"absolute",
    margin: -10,
    marginTop:-200 
  }
});
