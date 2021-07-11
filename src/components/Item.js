import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function Item({ name, date, expires, daysLeft, onPress }) {
  return (
    <TouchableOpacity style={styles.itemBox} onPress={onPress}>
      <View style={styles.nameArea}>
        <Text style={styles.itemName}>{name}</Text>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.itemInfo}>{date}</Text>
        <Text style={styles.itemInfo}>{daysLeft} Day(s) Left</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Item;

const styles = StyleSheet.create({
  itemBox: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 15,
    borderColor: "black",
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
    color: "black",
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
    color: "black",
    fontSize: 14,
  },
});
