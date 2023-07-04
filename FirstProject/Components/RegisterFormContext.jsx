import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Keyboard } from "react-native";
import { useKeyboard } from "./KeyboardContext";

export const RegisterFormContext = () => {
  const { isShowKeyboard, setIsShowKeyboard, handleOutsidePress } =
    useKeyboard();
  //   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [activeField, setActiveField] = useState("");

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormikContext();

  const handleInputFocus = (fieldName) => {
    setActiveField(fieldName);
    setFieldValue(fieldName, values[fieldName]);
    setIsShowKeyboard(true);
  };
  const handleFormSubmit = () => {
    // Keyboard.dismiss();
    handleSubmit();
  };
  // const handleKeyboardWillShow = (event) => {
  //   const currentlyFocusedInput = event?.nativeEvent?.focusedField;
  //   // Perform actions based on the currently focused input field
  // };
  //   const handleOutsidePress = () => {
  //     if (isShowKeyboard) {
  //       Keyboard.dismiss();
  //       setIsShowKeyboard(false);
  //     }
  //   };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
        <TouchableOpacity style={styles.avatarBtn}>
          <Image source={require("../assets/images/add.png")} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Реєстрація</Text>

      <TextInput
        style={[
          styles.input,
          activeField === "login" ? styles.focusedInput : null,
        ]}
        onChangeText={handleChange("login")}
        onBlur={handleBlur("login")}
        value={values.login}
        placeholder="Логін"
        onFocus={() => handleInputFocus("login")}
        onSubmitEditing={handleFormSubmit}
        // onBlur={() => setActiveField("")}
      />

      <TextInput
        style={[
          styles.input,
          activeField === "email" ? styles.focusedInput : null,
        ]}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        value={values.email}
        placeholder="Адреса електронної пошти"
        keyboardType="email-address"
        onFocus={() => handleInputFocus("email")}
        onSubmitEditing={handleFormSubmit}
      />

      {/* <TextInput
          style={{ ...styles.input, marginBottom: isShowKeyboard ? 32 : 43 }}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
          placeholder="Пароль"
          onFocus={() => handleInputFocus("password")}
          secureTextEntry
        /> */}
      <View
        style={[
          styles.passwordInputContainer,
          activeField === "password" ? styles.focusedInput : null,
          { marginBottom: isShowKeyboard ? 32 : 43 },
          { zIndex: 1 },
        ]}
      >
        <TextInput
          style={[
            styles.passwordInput,
            activeField === "password" ? styles.focusedInput : null,
          ]}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
          placeholder="Пароль"
          onFocus={() => handleInputFocus("password")}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.passwordVisibilityText}>
            {isPasswordVisible ? "Сховати" : "Показати"}
          </Text>
        </TouchableOpacity>
      </View>

      {!isShowKeyboard && (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.submit}
            onPress={handleSubmit}
          >
            <Text style={styles.submitTitle}>Зареєстуватися</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.subtitle}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#212121",
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },

  passwordInputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        paddingRight: 16,
      },
      android: {
        paddingRight: 32,
      },
    }),
  },
  passwordInput: {
    fontSize: 16,
    color: "#212121",
    width: "80%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  passwordVisibilityButton: {
    justifyContent: "flex-end",
    paddingVertical: 16,
  },
  passwordVisibilityText: {
    color: "#1B4371",
  },

  submit: {
    width: "100%",
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    // marginTop: 27,
    marginBottom: 16,
  },
  submitTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  subtitle: {
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 78,
  },
});
