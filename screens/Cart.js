import React from "react";
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, CommonStyle, Fontsize } from "./components/CommonStyle";
import { Carttext } from "../components/Statictext";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decreamentQuantity,
  removeFromCart,
} from "../redux/CartReducer";

const Cart = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    .map((item) => item.price + item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);
  const dispatch = useDispatch();
  const IncrementQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const DecreamentQuantity = (item) => {
    dispatch(decreamentQuantity(item));
  };
  const DeleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

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
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>Subtotal: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
      </View>
      <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
        {Carttext.EMI}
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Confirmation")}
        style={Style.btncontainer}
      >
        <Text style={Style.btntext}>{Carttext.PA}{" "}({cart.length}){" "}{Carttext.I}</Text>
      </Pressable>
      <Text style={CommonStyle.Greyline} />
      <View style={{ margin: 10 }}>
        {Cart?.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          >
            <Pressable
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  {item?.price}
                </Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>{Carttext.IS}</Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => DecreamentQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => DeleteItem(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                )}
                <Pressable
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  onPress={() => IncrementQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => DeleteItem(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>{Carttext.D}</Text>
              </Pressable>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                marginBottom: 10,
                gap: 10,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>{Carttext.SF}</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>{Carttext.SM}</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  searchcont: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    borderRadius: 5,
    padding: 5,
    height: "140%",
    width: "90%",
  },
  btncontainer: {
    backgroundColor: Colors.lightyellow,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
  },
  btntext: {
    textAlign: "center",
    fontSize: Fontsize.fifteen,
  },
});

export default Cart;
