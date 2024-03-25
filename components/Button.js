import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Colors, Fontsize} from '../components/CommonStyle';

const Button = (props) => {
  return (
    <View style={{alignItems: "center"}}>
      <TouchableOpacity style={styles.btncontainer}>
        <Text style={styles.btntext}>{props.btnname}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    btncontainer: {
        backgroundColor: Colors.lightyellow,
        height: 40,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center'
    },
    btntext: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: Fontsize.twenty
    }
});

export default Button;