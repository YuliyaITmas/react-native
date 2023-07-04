import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  login: "",
  email: "",
  password: "",
  photo: null,
};

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [activeField, setActiveField] = useState("");


  const handleOutsidePress = () => {
    if (isShowKeyboard) {
      Keyboard.dismiss();
      setIsShowKeyboard(false);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFormSubmit = () => {
    console.log(state);
    setState(initialState);
  };
  const handleBackPress = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    return true;
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to choose a photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setState({ ...state, photo: result.assets[0].uri });
    }
  };

  const handleRemovePhoto = () => {
    setState({ ...state, photo: null });
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
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  {state.photo ? (
                    <Image
                      style={{ width: 120, height: 120, borderRadius: 16 }}
                      source={{ uri: state.photo }}
                    />
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.avatarBtn}
                  onPress={state.photo ? handleRemovePhoto : handleChoosePhoto}
                >
                  <Image
                    source={
                      state.photo
                        ? require("../assets/images/remove.png")
                        : require("../assets/images/add.png")
                    }
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Реєстрація</Text>

              <TextInput
                style={[
                  styles.input,
                  activeField === "login" ? styles.focusedInput : null,
                ]}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setActiveField("login");
                }}
                onBlur={() => setActiveField("")}
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    login: value,
                  }))
                }
                placeholder="Логін"
                autoCompleteType="off"
                blurOnSubmit={false}
              />

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
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setActiveField("password");
                  }}
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
                    <Text style={styles.submitTitle}>Зареєстуватися</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.subtitle}>Вже є акаунт? Увійти</Text>
                  </TouchableOpacity>
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
        paddingLeft: 16,
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
  },
});
