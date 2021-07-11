import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions";

function CreateScreen({ navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("MM/DD/YYYY");
  const [expires, setExpires] = useState(true);
  const [daysLeft, setDaysLeft] = useState(0);
  const dispatch = useDispatch();
  const submitItem = (item) => dispatch(addItem(item));

  return (
    <View style={styles.container}>
      {/* Nav Bar */}
      <View style={{ height: 60 }}>
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <Text style={styles.itemName}>{name}</Text>
          </View>
          <View style={styles.infoArea}>
            <Text style={styles.itemInfo}>{date}</Text>
            {expires ? (
              <Text style={styles.itemInfo}>{daysLeft} Day(s) Left</Text>
            ) : (
              <Text style={styles.itemInfo}></Text>
            )}
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
            value={name}
            onChangeText={(name) => setName(name)}
          />
        </View>
        {/* Input Date */}
        <View style={[styles.inputBar, { marginVertical: 5 }]}>
          <Image
            source={require("../assets/icons/light/date.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholderTextColor={"black"}
            placeholder={"MM/DD/YYYY"}
            value={date}
            onChangeText={(date) => setDate(date)}
          />
        </View>
        <TouchableOpacity
          style={[styles.inputBar, { marginVertical: 5 }]}
          onPress={() => {
            setExpires(!expires);
            if (expires) {
              setDate("DOES NOT EXPIRE");
            } else {
              setDate("MM/DD/YYYY");
            }
          }}
        >
          {expires ? (
            <View style={styles.checkBox}></View>
          ) : (
            <View style={[styles.checkBox, { backgroundColor: "lime" }]}></View>
          )}
          <Text style={styles.inputText}>Never Expires</Text>
        </TouchableOpacity>
        {/* Buttons */}
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={[styles.button, { marginRight: 5 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginLeft: 5 }]}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                submitItem({ name, date, expires, daysLeft });
                navigation.goBack();
              }}
            >
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CreateScreen;

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
