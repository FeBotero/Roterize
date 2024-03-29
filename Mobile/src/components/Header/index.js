import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [date, setDate] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  function handleModal() {
    setOpen(!open);
  }
  function handleModalLogin() {
    setOpenLogin(!openLogin);
  }

  function handleDate(valor) {
    setDate(valor);
  }
  function handleHidePass() {
    setHidePass(!hidePass);
  }
  function handleDeliveryDay() {
    setOpen(false);
    console.log(date);
  }
  function loginUser() {
    setUser("Felipe");
    navigation.navigate("Deliveries");
    setOpenLogin(false);
  }
  function logout() {
    navigation.navigate("Home");
    setUser("");
  }
  function delivery() {
    navigation.navigate("Deliveries");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={delivery}>
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/router.png")}
        />
      </TouchableOpacity>
      {/* Verificação se tem usuario logado */}
      {user != "" ? (
        <TouchableOpacity onPress={handleModal} style={styles.DataContainer}>
          <Text style={styles.textData}>DATA</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}

      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.viewCentered}>
          <View style={styles.modalView}>
            <View style={styles.exitModalDateView}>
              <TouchableOpacity onPress={handleDeliveryDay}>
                <Feather name="x-circle" size={25} color={"red"} />
              </TouchableOpacity>
            </View>

            <DatePicker
              format="DD/MM/YYYY"
              style={styles.dateComponent}
              onDateChange={handleDate}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={openLogin}>
        <View style={styles.viewCentered}>
          <View style={styles.modalView}>
            <Image
              source={require("../../assets/delivery.png")}
              style={styles.imgLogin}
            />
            <Text style={styles.textLogin}>Login</Text>
            <Text>Faça login em sua conta</Text>
            <View style={styles.inputView}>
              <Feather name="user" size={20} />
              <TextInput placeholder="Usuario" />
              <Text></Text>
            </View>
            <View style={styles.inputView}>
              <Feather name="key" size={20} />
              <TextInput placeholder="Password" secureTextEntry={hidePass} />
              <Feather
                name={hidePass === true ? "eye" : "eye-off"}
                onPress={handleHidePass}
                size={20}
              />
            </View>
            <TouchableOpacity
              style={styles.appButtonContainerLogin}
              onPress={loginUser}>
              <Text style={styles.appButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {user === "" ? (
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={handleModalLogin}>
          <Text style={styles.appButtonText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.appButtonContainer} onPress={logout}>
          <Text style={styles.appButtonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingTop: statusBarHeight,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  textData: {
    color: "rgb(221, 87, 87)",
    fontSize: 20,
    fontWeight: "bold",
  },
  DataContainer: {
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  appButtonContainer: {
    elevation: 5,
    backgroundColor: "#fff",
    borderColor: "1px solid rgb(221, 87, 87)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "rgb(221, 87, 87)",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  dateComponent: {
    width: 250,
  },
  viewCentered: {
    flex: 1,
    alignContent: "center",
    marginTop: 64,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  exitModalDateView: {
    width: "100%",
    alignItems: "flex-end",
  },

  imgLogin: {
    width: 50,
    height: 50,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#aaaa",
    padding: 5,
    width: 250,
    height: 50,

    marginTop: 5,
    justifyContent: "space-between",
  },
  appButtonContainerLogin: {
    elevation: 2,
    backgroundColor: "#fff",
    borderColor: "1px solid rgb(221, 87, 87)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 5,
  },
  appButtonText: {
    fontSize: 18,
    color: "rgb(221, 87, 87)",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  textLogin: {
    color: "rgb(221, 87, 87)",
    fontSize: 25,
    fontWeight: "bold",
  },
});
