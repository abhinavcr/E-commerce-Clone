import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Inputtext = (props) => {
  return (
    <View style={{ flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: 'row'}}>
        <MaterialIcons name="email" size={24} color="black"/>  
        <TextInput style={{padding: 5}} placeholder="Enter the Email"/>
    </View>
  )
}

const styles = StyleSheet.create({
    inputbox: {
      padding: 5,
    }
});

export default Inputtext
