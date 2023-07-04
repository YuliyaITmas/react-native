// import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";


import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen} from "./Screens/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
  <>
      {/* <LoginScreen /> */}
       <RegistrationScreen/>
  </>
  );
}
