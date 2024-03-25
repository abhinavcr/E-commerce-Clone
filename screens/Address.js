import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors, Fontsize } from "./components/CommonStyle";
import { Addresstext } from "../components/Statictext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../useContext";
import axios from "axios";
import { Alert } from "react-native";

const Address = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("autoToken");
      const decodeToken = jwtDecode(token);
      const userId = decodeToken.userId;
      setUserId(userId);
    };
    fetchUser();
  });
  console.log(userId);
  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };
    axios
      .post("http://localhost:8000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Successfully", "Address added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error: ", "Failed to add address");
        console.log("error: ", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 25 }}>
      <View style={{ backgroundColor: Colors.blue, height: 50 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {Addresstext.NA}
        </Text>
        <TextInput placeholder="India" style={Style.inputbox} />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {Addresstext.FN}
          </Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={Style.inputbox}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {Addresstext.MN}
          </Text>
          <TextInput
            placeholder="Mobile no."
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={Style.inputbox}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {Addresstext.HN}
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            style={Style.inputbox}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {Addresstext.SA}
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={Style.inputbox}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {Addresstext.LM}
          </Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholder="Eg near apollo hospital"
            style={Style.inputbox}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            {Addresstext.PC}
          </Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholder="Enter Pincode"
            style={Style.inputbox}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleAddAddress}
            style={Style.btncontainer}
          >
            <Text style={Style.btntext}>{Addresstext.AA}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  inputbox: {
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 5,
    marginVertical: 5,
  },
  btncontainer: {
    backgroundColor: Colors.lightyellow,
    height: 50,
    width: 400,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  btntext: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Fontsize.twenty,
    padding: 10,
  },
});

export default Address;
