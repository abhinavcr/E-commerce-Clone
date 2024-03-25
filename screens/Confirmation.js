import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Confirmationtext, Carttext } from "../components/Statictext";
import { UserType } from "./useContext";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import RazorpayCheckout from "react-native-razorpay";

const Confirmation = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [seletedOption, setSelectedOption] = useState("");
  console.log(addresses);
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: seletedOption,
      };
      const response = await axios.post(
        "http://localhost:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("Order created successfully", response.data.order);
      } else {
        console.log("Error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const total = cart
    .map((item) => item.price + item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  });
  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "INR",
        name: "Amazon",
        key: "rzp_test_m8tHz3pZ8v2uj8",
        amount: total * 100,
        prefill: {
          email: "jhaabhinav736@gmail.com",
          contact: "8287546458",
          name: "RazorPay Software",
        },
        theme: { color: "#F37254" },
      };
      const data = await RazorpayCheckout.open(option);
      console.log(data);
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };
      const response = await axios.post(
        "http://localhost:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("Order created successfully", response.data.order);
      } else {
        console.log("Error creating order", response.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          {steps.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#ccc",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                  >
                    {Confirmationtext.CM}
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 5 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {Confirmationtext.SA}
          </Text>
          <Pressable>
            {addresses.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={24}
                    color="grey"
                  />
                )}
                <View style={{ marginLeft: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.Street}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {Confirmationtext.CA}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {Confirmationtext.PN}{item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {Confirmationtext.P}{item?.postalCode}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>{Confirmationtext.E}</Text>
                    </Pressable>
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>{Confirmationtext.R}</Text>
                    </Pressable>
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>{Confirmationtext.SD}</Text>
                    </Pressable>
                  </View>
                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#008397",
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "white" }}>
                          {Confirmationtext.DA}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {Confirmationtext.CD}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              gap: 5,
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
            }}
          >
            {option ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={24}
                color="grey"
              />
            )}
            <Text style={{ flex: 1 }}>
              <Text style={{ fontWeight: "500", color: "green" }}>
                {Confirmationtext.DT}
              </Text>{" "}
              {Confirmationtext.PM}
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>{Confirmationtext.C}</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {Confirmationtext.SP}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              gap: 5,
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
            }}
          >
            {seletedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="grey"
              />
            )}
            <Text>{Confirmationtext.CD}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              gap: 5,
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
            }}
          >
            {seletedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("card");
                  Alert.alert("UPI/Debit card", "Pay online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      test: "OK",
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="grey"
              />
            )}
            <Text>{Confirmationtext.UPI}</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>{Confirmationtext.C}</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 3 && setSelectedOption == "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{Confirmationtext.ON}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              gap: 5,
              padding: 8,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                {Confirmationtext.SN}
              </Text>
              <Text style={{ fontSize: 15, color: "grey", marginTop: 5 }}>
                {Confirmationtext.AD}
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>{Confirmationtext.ST} {addresses?.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "grey", fontWeight: 500 }}>
                {Carttext.I}
              </Text>
              <Text style={{ fontSize: 15, color: "grey" }}>{total}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "grey", fontWeight: 500 }}>
                {Confirmationtext.D}
              </Text>
              <Text style={{ fontSize: 15, color: "grey" }}>{Confirmationtext.RU}0</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {Confirmationtext.OT}
              </Text>
              <Text style={{ fontSize: 18, color: "red", fontWeight: "bold" }}>
                {Confirmationtext.RU}{total}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "grey" }}>{Confirmationtext.PW}</Text>
            <Text style={{ fontSize: 15, fontWeight: 600, marginTop: 7 }}>
              {Confirmationtext.PD} (Cash)
            </Text>
          </View>
          <Pressable
            onPress={() => handlePlaceOrder}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>{Confirmationtext.PO}</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default Confirmation;
