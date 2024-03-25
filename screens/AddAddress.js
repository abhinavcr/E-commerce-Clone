import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Pressable,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { Colors } from "./components/CommonStyle";
import { FontAwesome, Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../useContext";
import { AddAddresstext, Addresstext, Confirmationtext } from "../components/Statictext";

const AddAddress = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [userId,setUserId] = useContext(UserType);
  console.log("userId: ",userId);
  const fetchAddresses = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
      Const (addresses) = response.data();
      setAddresses(addresses);
    }catch(error) {
      console.log("Error: ",error);
    }
  }
  useEffect(() =>{
    fetchAddresses();
  });
  
  //Refresh the address when the component comes to focus that is basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    })
  )
  
  return (
    <ScrollView style={{ marginTop: 25 }}>
      <View style={Style.searchcont}>
        <Pressable style={Style.searchbar}>
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ paddingLeft: 5 }}
          />
          <TextInput
            placeholder="Search Amazon.in"
            style={{ marginLeft: 10 }}
          />
        </Pressable>
        <Feather name="mic" size={24} color="black" style={{ marginLeft: 5 }} />
      </View>
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", paddingLeft: 10 }}>
          {AddAddresstext.YA}
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Address")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}
        >
          <Text>{Addresstext.NA}</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
          {/* All the added address */}
          {addresses.map((item,index) => {
            <Pressable  style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "column",
              gap: 5,
              marginVertical: 10,
            }}>
              <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                <Text style={{fontSize:15,fontWeight: 'bold'}}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.landmark}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>{item?.Street}</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>{Confirmationtext.CA}</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>Phone no: {item?.mobileNo}</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>Pincode: {item?.postalCode}</Text>
              <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:5}}>
                <Pressable style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}>
                  <Text>{Confirmationtext.E}</Text>
                </Pressable>
                <Pressable style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}>
                  <Text>{Confirmationtext.R}</Text>
                </Pressable>
                <Pressable style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}>
                  <Text>{Confirmationtext.SD}</Text>
                </Pressable>
              </View>
            </Pressable>
          })}
        </Pressable>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  searchcont: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    borderRadius: 5,
    padding: 5,
    height: "110%",
    width: "95%",
  },
  inputbox: {
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 5,
    marginVertical: 5
  },
});

export default AddAddress;
