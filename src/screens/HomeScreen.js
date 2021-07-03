import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Item from "../components/Item";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={{ height: 60 }}>
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={() => alert("Search Icon Pressed")}>
            <Image
              source={require("../assets/icons/light/search.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.inputText}
            placeholderTextColor={"black"}
            placeholder={"Search"}
            onFocus={() => alert("Search TextInput Pressed")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <Image
              source={require("../assets/icons/light/menu.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Items */}
      <View style={styles.itemsArea}>
        <ScrollView>
          {/* EXPIRED */}
          <Text style={styles.areaTitle}>Expired</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
            <Item></Item>
          </TouchableOpacity>
          {/* EXPIRING SOON */}
          <Text style={styles.areaTitle}>Expiring Soon</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
            <Item></Item>
          </TouchableOpacity>
          {/* ALL ITEMS */}
          <Text style={styles.areaTitle}>All Items</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
            <Item></Item>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Add an Item */}
      <View style={{ height: 60, flexDirection: "column-reverse" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
          <View style={styles.inputBar}>
            <Image
              source={require("../assets/icons/light/plus.png")}
              style={styles.icon}
            />
            <Text style={styles.inputText}>Add Item</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 45,
    backgroundColor: "white",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});