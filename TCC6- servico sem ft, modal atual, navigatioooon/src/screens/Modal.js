import React from "react";
import { useState, useRef } from "react";
import { View, Linking, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import { Modalize } from "react-native-modalize";

export default function ({ navigation }) {
  const modalizeRef = useRef(null);
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();

  function onOpen() {
    modalizeRef.current?.open();
  }

  return (
    <Modalize ref={modalizeRef} snapPoint={180}>
      <View
        style={{
          flex: 1,
          height: 180,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 6,
            padding: 15,
            borderWidth: 1,
            borderColor: "rgba(0,0,0, 0.2)",
            marginTop: 10,
            marginHorizontal: 15,
            marginVertical: 6,
          }}
        >
          <Text>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signOut(auth);
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 6,
            padding: 15,
            borderWidth: 1,
            borderColor: "rgba(0,0,0, 0.2)",
            marginTop: 10,
            marginHorizontal: 15,
            marginVertical: 6,
          }}
        >
          <Text style={{ color: "red" }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
}
