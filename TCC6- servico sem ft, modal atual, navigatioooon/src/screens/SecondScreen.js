import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
  Section,
  SectionContent,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Servico } from "../../model/Servico";
import { TextInputMask } from "react-native-masked-text";
import { auth, firestore, storage } from "../../firebase";
import { getStorage, uploadBytes } from "firebase/storage";

export default function SecondScreen({ navigation }) {
  const { isDarkmode } = useTheme();
  const [nomecat, setNomeCat] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [inputMoeda, setInputMoeda] = useState("0");
  const [loading, setLoading] = useState(false);
  const [urlfoto, setUrlfoto] = useState(null);

  const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Servico")
    .doc();

  const enviarDados = () => {
    ref
      .set({
        id: auth.currentUser.uid,
        nomecat: nomecat,
        descricao: descricao,
        valor: valor,
        urlfoto: urlfoto,
      })
      .then(() => {
        alert("Novo serviço: " + nomecat + " adicionado com sucesso!");
      });
  };
  return (
    <Layout>
      <TopNav
        middleContent={
          <Image
            source={require("../../assets/nome.png")}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
          />
        }
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />

      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <Layout>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              padding: 20,
            }}
          >
            <Section>
              <SectionContent
                style={{
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flex: 3,
                    paddingHorizontal: 5,
                    paddingBottom: 20,
                    backgroundColor: isDarkmode
                      ? themeColor.dark
                      : themeColor.white,
                  }}
                >
                  <Text
                    fontWeight="semibold"
                    size="h3"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    Criando Serviço
                  </Text>
                  <Text style={{ marginTop: 15 }}>Nome</Text>
                  <TextInput
                    style={{
                      marginTop: 10,
                      borderColor: "gray",
                      borderWidth: 2,
                      padding: 10,
                      borderRadius: 6,
                    }}
                    containerStyle={{ marginTop: 15 }}
                    placeholder="Nome do serviço"
                    value={nomecat}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    keyboardType="text"
                    onChangeText={(text) => setNomeCat(text)}
                  />

                  <Text style={{ marginTop: 15 }}>Descrição</Text>
                  <TextInput
                    style={{
                      marginTop: 10,
                      borderColor: "gray",
                      borderWidth: 2,
                      padding: 10,
                      borderRadius: 6,
                    }}
                    containerStyle={{ marginTop: 15 }}
                    multiline
                    numberOfLines={10}
                    placeholder="Informações sobre o serviço"
                    value={descricao}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    onChangeText={(text) => setDescricao(text)}
                  />

                  <Text style={{ marginTop: 15 }}>Valor</Text>
                  <TextInputMask
                    style={{
                      marginTop: 10,
                      borderColor: "gray",
                      borderWidth: 2,
                      padding: 10,
                      borderRadius: 6,
                    }}
                    type={"money"}
                    placeholder="Valor do serviço"
                    keyboardType="phone-pad"
                    value={inputMoeda}
                    maxLength={18}
                    onChangeText={(value) => {
                      setInputMoeda(value);
                      value = value.replace("R$", "");
                      value = value.replace(".", "");
                      value = value.replace(",", ".");
                      setValor(Number(value));
                    }}
                  />

                  <Ionicons
                    style={{ marginTop: 15 }}
                    name="images"
                    size={60}
                    color={isDarkmode ? themeColor.white100 : themeColor.black}
                  />
                  <Button
                    color="#EF8F86"
                    text={loading ? "Loading" : "Adicionar Serviço"}
                    onPress={enviarDados}
                    style={{
                      marginTop: 20,
                    }}
                  />
                </View>
              </SectionContent>
            </Section>
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}
