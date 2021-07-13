import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { editItem, deleteItem } from "../redux/actions";

function validateDate(date) {
  var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(2)\d{3}$/;
  if (date === "DOES NOT EXPIRE") {
    return true;
  }
  return date_regex.test(date);
}

function getCurrentDate() {
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var year = new Date().getFullYear();
  // FORMAT: MM/DD/YYYY
  if (month > 9) {
    return month + "/" + date + "/" + year;
  }
  return "0" + month + "/" + date + "/" + year;
}

function getDaysLeft(date) {
  var currentDate = new Date(getCurrentDate());
  var expirationDate = new Date(date);
  var time = currentDate.getTime() - expirationDate.getTime();
  if (time > 0) {
    return 0;
  } else {
    time = Math.abs(time);
  }
  var days = Math.ceil(time / (1000 * 3600 * 24));
  return days;
}

function EditScreen({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const [date, setDate] = useState(route.params.date);
  const [expires, setExpires] = useState(route.params.expires);
  const [valid, setValid] = useState("black");
  const [daysLeft, setDaysLeft] = useState(route.params.daysLeft);
  const key = route.params.key;
  const dispatch = useDispatch();
  const updateItem = (item) => dispatch(editItem(item));
  const removeItem = (item) => dispatch(deleteItem(item));

  const doubleCheckDelete = () =>
    Alert.alert("Are you sure you want to delete this item?", "", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          removeItem(key);
          navigation.goBack();
        },
      },
    ]);

  return (
    <View style={styles.container}>
      {/* TOP NAV BAR */}
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
      {/* EDIT SECTION */}
      <View style={styles.itemsArea}>
        <Text style={styles.areaTitle}>Preview</Text>
        {/* PREVIEW */}
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
        {/* NAME INPUT */}
        <Text style={styles.areaTitle}>Details</Text>
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
        {/* DATE INPUT */}
        <View
          style={[styles.inputBar, { borderColor: valid, marginVertical: 5 }]}
        >
          <Image
            source={require("../assets/icons/light/date.png")}
            style={styles.icon}
          />
          <TextInput
            style={[styles.inputText, { color: valid }]}
            placeholderTextColor={valid}
            placeholder={"MM/DD/YYYY"}
            value={date}
            onChangeText={(date) => {
              setDate(date);
              setExpires(true);
              if (validateDate(date)) {
                setValid("black");
                setDaysLeft(getDaysLeft(date));
                if (date === "DOES NOT EXPIRE") {
                  setExpires(false);
                }
              } else {
                setValid("red");
              }
            }}
          />
        </View>
        {/* NEVER EXPIRES BUTTON */}
        <TouchableOpacity
          style={[styles.inputBar, { marginVertical: 5 }]}
          onPress={() => {
            setExpires(!expires);
            if (expires) {
              setDate("DOES NOT EXPIRE");
            } else {
              setDate("");
            }
          }}
        >
          {expires ? (
            <View style={styles.checkBox}></View>
          ) : (
            <View style={[styles.checkBox, { backgroundColor: "lime" }]}></View>
          )}
          <Text style={styles.inputText}>Never Expires?</Text>
        </TouchableOpacity>
        {/* BUTTONS */}
        <View style={styles.buttonArea}>
          {/* CREATE BUTTON */}
          <TouchableOpacity
            style={[styles.button, { marginBottom: 5 }]}
            onPress={() => {
              if (name !== "" && validateDate(date)) {
                updateItem({ key, name, date, expires, daysLeft });
                navigation.goBack();
              }
            }}
          >
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea}>
          {/* CANCEL BUTTON */}
          <TouchableOpacity
            style={[styles.button, { marginRight: 5 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          {/* DELETE BUTTON */}
          <TouchableOpacity
            style={[styles.button, { marginLeft: 5 }]}
            onPress={doubleCheckDelete}
          >
            <Text style={styles.buttonText}>DELETE</Text>
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
    paddingHorizontal: 15,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 15,
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
    borderColor: "#B6B6B6",
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
    color: "#B6B6B6",
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
    color: "#B6B6B6",
    fontSize: 14,
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 3,
    marginRight: 15,
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
