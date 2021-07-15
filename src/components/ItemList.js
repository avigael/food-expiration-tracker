import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Item from "./Item";

const ItemList = ({ navigation }) => {
  const items = useSelector((state) => state.itemReducer.itemList);
  return (
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(item, index) => item.key.toString()}
      renderItem={(data) => (
        <Item
          name={data.item.name}
          date={data.item.date}
          expires={data.item.expires}
          daysLeft={data.item.daysLeft}
          onPress={() => navigation.navigate("Edit", data.item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ItemList;
