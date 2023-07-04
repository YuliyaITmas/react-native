import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [activeField, setActiveField] = useState("");

  const handleOutsidePress = () => {
    if (isShowKeyboard) {
      Keyboard.dismiss();
      setIsShowKeyboard(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const textInputRefs = useRef({});

  const handleFormSubmit = () => {
    console.log(state);
    setState(initialState);
  };
  const handleBackPress = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

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
              <Text style={styles.title}>Увійти</Text>

              <TextInput
                style={[
                  styles.input,
                  activeField === "email" ? styles.focusedInput : null,
                ]}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setActiveField("email");
                }}
                onBlur={() => setActiveField("")}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
                placeholder="Адреса електронної пошти"
                keyboardType="email-address"
                autoCompleteType="off"
                blurOnSubmit={false}
                ref={(ref) => {
                  textInputRefs.current["email"] = ref;
                }}
              />

              <View
                style={[
                  styles.passwordInputContainer,
                  activeField === "password" ? styles.focusedInput : null,
                  { marginBottom: isShowKeyboard ? 32 : 43 },
                ]}
              >
                <TextInput
                  style={[
                    styles.passwordInput,
                    activeField === "password" ? styles.focusedInput : null,
                    { zIndex: 1 },
                  ]}
                                  onFocus={() => { setIsShowKeyboard(true); setActiveField("password");}}
                  onBlur={() => setActiveField("")}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  placeholder="Пароль"
                  autoCompleteType="off"
                  blurOnSubmit={false}
                  secureTextEntry={!isPasswordVisible}
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
              </View>
              {!isShowKeyboard && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.submit}
                    onPress={handleFormSubmit}
                  >
                    <Text style={styles.submitTitle}>Увійти</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text
                      style={{
                        color: "#1B4371",
                        fontSize: 16,
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      Немає акаунту?
                    </Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.subtitle}>Зареєструватися</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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

  title: {
    fontFamily: "Roboto-Medium",
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
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
  },
  subtitle: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginBottom: 78,
    textDecorationLine: true,
  },
});
