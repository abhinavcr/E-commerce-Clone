import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  Colors,
  Fontsize,
  CommonStyle,
  Deviceheight,
  Devicewidth,
} from "../components/CommonStyle";
import { Registertext, Commontext } from "../components/Statictext";
import axios from "axios";


const Register = () => {
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //Send a post requiest to the backend API with AXIOS
    axios.post("http://localhost:8000/register", user).then((response) => {
      console.log(response);
      Alert.alert(
        "Register Successfull",
        "You have registered successfully"
      );
      setname('');
      setEmail('');
      setPassword('');
    }).catch((error) => {
      Alert.alert(
        "Registration Error",
        "An error occur during Registration"
      );
      console.log("Registration Failer", error);
    });
  };

  //Send a post requiest to the backend API with FETCH
  // const handleRegister = async () => {
  //   try {
  //     fetch("http://localhost:8000/register", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: name,
  //         email: email,
  //         password: password,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => console.log(json));
  //       setname('');
  //       setEmail('');
  //       setPassword('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  return (
    <View
      style={[
        CommonStyle.Container,
        {
          height: Deviceheight,
          width: Devicewidth,
          backgroundColor: Colors.white,
        },
      ]}
    >
      <View style={CommonStyle.Logo}>
        <Image source={require("../assets/Logo.png")} style={CommonStyle.img} />
        <Text
          style={{ fontSize: Fontsize.ten, fontWeight: "bold", marginTop: 10 }}
        >
          {Registertext.RA}
        </Text>
      </View>
      <View style={CommonStyle.Form}>
        <View style={[CommonStyle.Inputtext, { marginBottom: 20 }]}>
          <FontAwesome
            name="user"
            size={20}
            color="black"
            style={{ marginTop: 5 }}
          />
          <TextInput
            style={{ padding: 5 }}
            placeholder="Enter Your Email"
            value={name}
            onChangeText={(text) => setname(text)}
          />
        </View>
        <View style={[CommonStyle.Inputtext, { marginBottom: 20 }]}>
          <MaterialIcons
            name="email"
            size={20}
            color="black"
            style={{ marginTop: 5 }}
          />
          <TextInput
            style={{ padding: 5 }}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={CommonStyle.Inputtext}>
          <AntDesign
            name="lock"
            size={20}
            color="black"
            style={{ marginTop: 5 }}
          />
          <TextInput
            style={{ padding: 5 }}
            placeholder="Enter Your Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: Fontsize.fifteen }}>{Commontext.KA}</Text>
          <Text style={{ fontSize: Fontsize.fifteen, color: "#4C81FE" }}>
            {Commontext.FP}
          </Text>
        </View>
      </View>
      <View style={CommonStyle.Btn}>
        {/* <Button btnname="Register"/> */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.btncontainer}
            onPress={handleRegister}
          >
            <Text style={styles.btntext}>{Registertext.R}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            {Registertext.SI}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btncontainer: {
    backgroundColor: Colors.lightyellow,
    height: 40,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
  },
  btntext: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Fontsize.twenty,
  },
});

export default Register;

//I found this " android:usesCleartextTraffic="true" " for React Native.
