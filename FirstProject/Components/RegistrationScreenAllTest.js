import React, { useState, useRef } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import { useKeyboard } from "./KeyboardContext";

export const RegistrationFormAll = () => {
  const { isShowKeyboard, setIsShowKeyboard, handleOutsidePress } =
    useKeyboard();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [activeField, setActiveField] = useState("");
  const textInputRefs = useRef({});

  const handleInputFocus = (fieldName) => {
    setActiveField(fieldName);
    setIsShowKeyboard(true);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    // setIsShowKeyboard(false);
    // textInputRefs.current[activeField].blur();
    setActiveField("");
  };

  const handleKeyboardHide = () => {
    if (activeField) {
      textInputRefs.current[activeField].blur();
    }
    setIsShowKeyboard(false);
  };
  //       useEffect(() => {
  //         const keyboardDidHideListener = Keyboard.addListener(
  //           "keyboardDidHide",
  //           handleKeyboardHide
  //         );

  //         return () => {
  //           keyboardDidHideListener.remove();
  //         };
  //       }, []);

  //       const handleKeyboardHide = () => {
  //         setIsShowKeyboard(false);
  //       };

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
          >
            <View style={styles.form}>
              <Formik
                initialValues={{ login: "", email: "", password: "" }}
                onSubmit={handleFormSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                      //   onSubmitEditing={handleSubmit}
                      ref={(ref) => {
                        textInputRefs.current["login"] = ref;
                      }}
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
                      //   onSubmitEditing={handleSubmit}
                      ref={(ref) => {
                        textInputRefs.current["email"] = ref;
                      }}
                    />

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
                          activeField === "password"
                            ? styles.focusedInput
                            : null,
                        ]}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="Пароль"
                        onFocus={() => handleInputFocus("password")}
                        secureTextEntry={!isPasswordVisible}
                        // onSubmitEditing={handleFormSubmit}
                        ref={(ref) => {
                          textInputRefs.current["password"] = ref;
                        }}
                      />
                      <TouchableOpacity
                        style={styles.passwordVisibilityButton}
                        onPress={togglePasswordVisibility}
                      >
                        <Text style={styles.passwordVisibilityText}>
                          {isPasswordVisible ? "Сховати" : "Показати"}
                        </Text>
                      </TouchableOpacity>
                      {/* Остальной код */}
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
                          <Text style={styles.subtitle}>
                            Вже є акаунт? Увійти
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
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
  },

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
    width: "100%",
    borderWidth: 1,

    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF",

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
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,

    position: "relative",

    top: -60,
    left: 12.5,
  },
  avatarBtn: {
    position: "relative",
    bottom: 26.5,
    right: 0,

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
