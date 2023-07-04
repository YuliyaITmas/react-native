import React, { createContext, useState, useContext } from "react";
import { Keyboard, TextInput } from "react-native";
const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleOutsidePress = () => {
    if (isShowKeyboard) {
      Keyboard.dismiss();
      setIsShowKeyboard(false);
     
        TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
    }
  };

  return (
    <KeyboardContext.Provider
      value={{ isShowKeyboard, setIsShowKeyboard, handleOutsidePress }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error("useKeyboard must be used within a KeyboardProvider");
  }
  return context;
};
