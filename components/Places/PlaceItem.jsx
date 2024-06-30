import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pressed: {
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ccc",
  },
  info: {
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    color: "#ccc"
  },
  address: {
    color: "#666",
  },
});

export default PlaceItem;
