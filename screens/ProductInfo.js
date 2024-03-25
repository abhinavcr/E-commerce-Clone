import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Colors, Fontsize } from "../components/CommonStyle";
import { ProductInfotext, Hometext, Confirmationtext } from "../components/Statictext";
import {
  FontAwesome,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const { width } = Dimensions();
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    },60000);
  }
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 55, flex: 1, backgroundColor: Colors.white }}
    >
      <View style={Styles.searchcont}>
        <Pressable style={Styles.searchbar}>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => {
          <ImageBackground
            key={index}
            style={{ width, height, resizeMode: "contain", marginTop: 10 }}
            source={{ uri: item }}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  {ProductInfotext.PO}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>;
        })}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          {Confirmationtext.RU}{route?.params?.price}
        </Text>
      </View>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 2,
          marginTop: 15,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>{ProductInfotext.C} </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>{ProductInfotext.S} </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 2,
          marginTop: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total: {route?.params?.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>{ProductInfotext.DT}</Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{Hometext.DA}</Text>
        </View>
      </View>
      <Text>{ProductInfotext.INS}</Text>
      <Pressable style={Styles.btncontainer} onPress={() => addItemToCart(route?.params?.item)}>
        { addedToCart ? (
            <View>
              <Text style={Styles.btntext}>{ProductInfotext.AdC}</Text>
            </View>
          ) : (
            <Text style={Styles.btntext}>{ProductInfotext.AC}</Text>
        )}
      </Pressable>
      <Pressable style={Styles.btncontainer}>
        <Text style={Styles.btntext}>{ProductInfotext.BN}</Text>
      </Pressable>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  searchcont: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    height: "140%",
    width: "90%",
  },
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

export default ProductInfo;











