import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../components/CommonStyle';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProductInfo from '../screens/ProductInfo';
import AddAddress from '../screens/AddAddress';
import Address from '../screens/Address';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Confirmation from '../screens/Confirmation';
import Order from '../screens/Order';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function Bottomtab() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: {color: Colors.lightblue},
            headerShown: false,
            tabBarIcon:({focused}) => 
            focused ? (
              <Entypo name="home" size={24} color={Colors.lightblue}/>
            ) : (
              <AntDesign name="home" size={24} color={Colors.black} />
            )
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: {color: Colors.lightblue},
            tabBarIcon:({focused}) => 
            focused ? (
              <Ionicons name="person" size={24} color={Colors.lightblue} />           
            ) : (
              <Ionicons name="person-outline" size={24} color={Colors.black} />            )
          }}
        />
        <Tab.Screen
          name='Cart'
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: {color: Colors.lightblue},
            headerShown: false,
            tabBarIcon:({focused}) => 
            focused ? (
              <Ionicons name="person" size={24} color={Colors.lightblue} />           
            ) : (
              <AntDesign name="shoppingcart" size={24} color={Colors.black} />            )
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={Bottomtab} options={{headerShown: false}}/>
        <Stack.Screen name="ProductInfo" component={ProductInfo} options={{headerShown: false}}/>
        <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}}/>
        <Stack.Screen name="Address" component={Address} options={{headerShown: false}}/>
        <Stack.Screen name="Confirmation" component={Confirmation} options={{headerShown: false}}/>
        <Stack.Screen name="Order" component={Order} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;