import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { BackgroundImage, useKeyboard } from "./KeyboardContext";
import { RegisterFormContext } from "./RegisterFormContext";
import { TouchableWithoutFeedback } from "react-native";

export const RegistrationForm = () => {
  const { isShowKeyboard, setIsShowKeyboard, handleOutsidePress } =
    useKeyboard();
  const handleFormSubmit = (values) => {
    console.log(values);
    setIsShowKeyboard(false);
    //  setActiveField("");
  };
  // const handleOutsidePress = () => {
  //   if (isShowKeyboard) {
  //     Keyboard.dismiss();
  //     setIsShowKeyboard(false);
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/photo-bcg.jpg")}
          resizeMode="cover"
          style={styles.background}
        >
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            activeOpacity={1}
            onPress={handleOutsidePress}
          >
            <View style={styles.form}>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={handleFormSubmit}
              >
                {() => (
                  <>
                    <RegisterFormContext />
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 16,
  },
  // background: {
  //   ...StyleSheet.absoluteFillObject,
  // },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  form: {
    // position: "absolute",
    // bottom: 0,
    // flex: 1,
    width: "100%",
    borderWidth: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    // paddingVertical: 16,
    paddingHorizontal: 12,

    fontSize: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "relative",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    // width: "100%",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    // position: "absolute",
    position: "relative",

    top: -60,
    left: 12.5,
  },
  avatarBtn: {
    position: "relative",
    bottom: 26.5,
    right: 0,
    // width: 25,
    // height: 25,
    // borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 32,
    marginTop: 32,
  },
});
