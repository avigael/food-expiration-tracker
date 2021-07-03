import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Item() {
  return (
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
