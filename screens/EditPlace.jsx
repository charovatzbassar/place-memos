import React, { useContext } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/Place";
import { DbContext } from "../store/db-context";

const EditPlace = ({ navigation, route }) => {
  const dbContext = useContext(DbContext);

  const editPlace = async (values) => {
    const place = new Place(
      values.title,
      values.image.assets[0].uri,
      values.location
    );

    await dbContext.placeDao.editPlace({
      title: values.title,
      imageUri: values.image.assets[0].uri,
      address: values.location.address,
      lat: values.location.lat,
      long: values.location.long,
      id: route.params.prevPlace.id,
    });

    navigation.navigate("AllPlaces", { place });
  };
  return <PlaceForm handler={editPlace} />;
};

export default EditPlace;
