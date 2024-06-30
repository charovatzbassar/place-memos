import { Field, Formik } from "formik";
import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../utils/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = ({ handler }) => {
  return (
    <ScrollView style={styles.form}>
      <Formik
        initialValues={{ title: "", image: null, location: null }}
        onSubmit={handler}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <Field name="image" component={ImagePicker} />
            <Field name="location" component={LocationPicker} />
            {/* <ImagePicker />
            <LocationPicker /> */}
            <View style={styles.submit}>
              <Button title="Add Place" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary700,
  },
  submit: {
    marginTop: 16,
  },
});

export default PlaceForm;
