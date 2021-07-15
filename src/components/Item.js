import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

function Item({ name, date, expires, daysLeft, onPress }) {
  const theme = useSelector((state) => state.itemReducer.theme);
  const settings = useSelector((state) => state.itemReducer.settings);
  return (
    <TouchableOpacity
      style={
        daysLeft <= settings.threshold && date != "DOES NOT EXPIRE"
          ? [styles.itemBox, { borderColor: "red" }]
          : [styles.itemBox, { borderColor: theme.PRIMARY_BORDER_COLOR }]
      }
      onPress={onPress}
    >
      <View style={styles.nameArea}>
        <Text
          style={
            daysLeft <= settings.threshold && date != "DOES NOT EXPIRE"
              ? [styles.itemName, { color: "red" }]
              : [styles.itemName, { color: theme.PRIMARY_TEXT_COLOR }]
          }
        >
          {name}
        </Text>
      </View>
      <View style={styles.infoArea}>
        <Text
          style={
            daysLeft <= settings.threshold && date != "DOES NOT EXPIRE"
              ? [styles.itemInfo, { color: "red" }]
              : [styles.itemInfo, { color: theme.PRIMARY_TEXT_COLOR }]
          }
        >
          {date}
        </Text>
        {expires ? (
          <Text
            style={
              daysLeft <= settings.threshold && date != "DOES NOT EXPIRE"
                ? [styles.itemInfo, { color: "red" }]
                : [styles.itemInfo, { color: theme.PRIMARY_TEXT_COLOR }]
            }
          >
            {daysLeft} DAY{daysLeft == 1 ? "" : "S"} LEFT
          </Text>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Item;

const styles = StyleSheet.create({
  itemBox: {
    height: 60,
    borderRadius: 15,
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
    fontSize: 14,
  },
});
