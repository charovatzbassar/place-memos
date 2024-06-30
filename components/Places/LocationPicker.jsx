import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/Colors";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { getAddress, getMapPreview } from "../../utils/Location";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ field, form }) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation();

  // const isFocused = useIsFocused(); // returns true if the screen is focused
  // we do this to re-fetch the location when the screen is focused
  // becasue the screen does not re-render when it is initialised

  const route = useRoute();

  const mapPickedLocation = route.params?.pickedLocation;
  useEffect(() => {
    const handleAddress = async () => {
      const address = await getAddress(
        mapPickedLocation.latitude,
        mapPickedLocation.longitude
      );
      if (mapPickedLocation) {
        form.setFieldValue(field.name, {
          lat: mapPickedLocation.latitude,
          long: mapPickedLocation.longitude,
          address,
        });
      }
    };

    handleAddress();
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    const address = await getAddress(
      location.coords.latitude,
      location.coords.longitude
    );

    form.setFieldValue(field.name, {
      lat: location.coords.latitude,
      long: location.coords.longitude,
      address,
    });
  };

  const pickOnMapHandler = () => navigation.navigate("Map");

  let locationPreview = <Text>No location picked yet.</Text>;

  if (field.value) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(field.value.lat, field.value.long),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <Button title="locate user" onPress={getLocationHandler} />
        <Button title="pick on map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
