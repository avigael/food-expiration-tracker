import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

function EditScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Nav Bar */}
      <View style={{ height: 60 }}>
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image
              source={require("../assets/icons/light/back.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.inputText}>Add Item</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <Image
              source={require("../assets/icons/light/menu.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Edit Section */}
      <View style={styles.itemsArea}>
        <Text style={styles.areaTitle}>Preview</Text>
        {/* Preview Item */}
        <View style={styles.itemBox}>
          <View style={styles.nameArea}>
            <Text style={styles.itemName}>
              BETTY WHITE'S WHITE CHOCOLATE PUDDING
            </Text>
          </View>
          <View style={styles.infoArea}>
            <Text style={styles.itemInfo}>JUN 27 2021</Text>
            <Text style={styles.itemInfo}>3 Days Left</Text>
          </View>
        </View>
        {/* Input Name */}
        <View style={[styles.inputBar, { marginVertical: 5 }]}>
          <Image
            source={require("../assets/icons/light/food.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholderTextColor={"black"}
            placeholder={"Item Name"}
          />
        </View>
        {/* Input Date */}
        <TouchableOpacity
          style={[styles.inputBar, { marginVertical: 5 }]}
          onPress={() => alert("Date Input Pressed")}
        >
          <Image
            source={require("../assets/icons/light/date.png")}
            style={styles.icon}
          />
          <Text style={styles.inputText}>00/00/0000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inputBar, { marginVertical: 5 }]}
          onPress={() => alert("Never Expires Pressed")}
        >
          <View style={styles.checkBox}></View>
          <Text style={styles.inputText}>Never Expires</Text>
        </TouchableOpacity>
        {/* Buttons */}
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={[styles.button, { marginRight: 5 }]}
            onPress={() => navigation.pop()}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginLeft: 5 }]}>
            <Text
              style={styles.buttonText}
              onPress={() => alert("Create Pressed")}
            >
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 45,
    backgroundColor: "white",
  },
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "black",
    height: 50,
  },
  icon: {
    height: 20,
    width: 20,
    marginHorizontal: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 19,
    fontFamily: "MenloBold",
  },
  itemsArea: {
    flex: 1,
    flexDirection: "column",
  },
  areaTitle: {
    fontFamily: "MenloBold",
    fontSize: 20,
    color: "black",
  },
  itemBox: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 15,
    borderColor: "orangered",
    borderWidth: 3,
    marginVertical: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  nameArea: {
    flex: 1,
    overflow: "hidden",
  },
  itemName: {
    fontFamily: "MenloBold",
    color: "orangered",
    fontSize: 16,
  },
  infoArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  itemInfo: {
    fontFamily: "MenloBold",
    color: "orangered",
    fontSize: 14,
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 3,
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  buttonArea: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 19,
    fontFamily: "MenloBold",
  },
});
