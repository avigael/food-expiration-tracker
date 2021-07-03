import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

function MenuScreen({ navigation }) {
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
          <Text style={styles.inputText}>Menu</Text>
        </View>
      </View>
      {/* Options */}
      <View style={styles.itemsArea}>
        <Text style={styles.areaTitle}>Settings</Text>
        {/* Dark Mode */}
        <TouchableOpacity
          style={[styles.inputBar, { marginVertical: 5 }]}
          onPress={() => alert("Dark Mode Pressed")}
        >
          <View style={styles.checkBox}></View>
          <Text style={styles.inputText}>Dark Mode</Text>
        </TouchableOpacity>
        {/* Notifications */}
        <TouchableOpacity
          style={[styles.inputBar, { marginVertical: 5 }]}
          onPress={() => alert("Notifications Pressed")}
        >
          <View style={styles.checkBox}></View>
          <Text style={styles.inputText}>Notifications</Text>
        </TouchableOpacity>
        {/* Threshold */}
        <Text style={styles.thresholdText}>Expiring Soon Threshold</Text>
        <View style={[styles.inputBar, { marginVertical: 5 }]}>
          <TouchableOpacity onPress={() => alert("Decrease Pressed")}>
            <Image
              source={require("../assets/icons/light/minus.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.thresholdText}>3 Days</Text>
          <TouchableOpacity onPress={() => alert("Increase Pressed")}>
            <Image
              source={require("../assets/icons/light/plus.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MenuScreen;

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
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 3,
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  thresholdText: {
    textAlign: "center",
    fontSize: 19,
    fontFamily: "MenloBold",
  },
});
