import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {Colors, Fontsize, CommonStyle, Deviceheight, Devicewidth} from '../components/CommonStyle';
import {Logintext, Commontext} from '../components/Statictext';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try{
        const token = await AsyncStorage.getItem("AuthToken");
        if(token){
          navigation.navigate("Main");
        }
      }catch(error){
        console.log("error message", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    
    //if Network Error shown by axios during login and register then replace localhost to your PC IP address
    axios.post("http://localhost:8000/login", user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("Authtoken", token);
      navigation.navigate("Main");
    }).catch((error) => {
      Alert.alert("login Error", "Invalid Email");
      console.log(error);
    });
  };

  return (
    <View style={[CommonStyle.Container, {height: Deviceheight, width: Devicewidth, backgroundColor: Colors.white}]}>
      <View style={CommonStyle.Logo}>
        <Image source={require('../assets/Logo.png')} style={CommonStyle.img}/>
        <Text style={{fontWeight: 'bold', fontSize: Fontsize.twenty}}>{Logintext.LA}</Text>
      </View>
      <View style={CommonStyle.Form}>
        <View style={[CommonStyle.Inputtext, {marginBottom: 20}]}>
          <MaterialIcons name="email" size={24} color="black" style={{marginTop: 5}}/>
          <TextInput style={{padding: 5}} placeholder="Enter Your Email" value={email} onChangeText={(text) =>setEmail(text)}/>
        </View>
        <View style={CommonStyle.Inputtext}>
          <AntDesign name="lock" size={24} color="black" style={{marginTop: 5}}/>  
          <TextInput style={{padding: 5}} placeholder="Enter Your Password" secureTextEntry={true} value={password} onChangeText={(text) =>setPassword(text)}/>
        </View>
        <View style={{justifyContent: 'space-between', marginTop: 5, flexDirection: 'row'}}>
          <Text style={{fontSize: Fontsize.fifteen}}>{Commontext.KA}</Text>
          <Text style={{fontSize: Fontsize.fifteen, color: '#4C81FE'}} >{Commontext.FP}</Text>
        </View>
      </View>
      <View style={CommonStyle.Btn}>
        {/* <Button btnname="Login"/> */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.btncontainer}
            onPress={handleLogin}
          >
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{fontSize: Fontsize.fifteen, textAlign: 'center', marginTop: 10}}>{Logintext.SU}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

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


export default Login;