import React from "react";
import {  } from "expo-status-bar";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from "@expo-google-fonts/roboto"
import { NativeBaseProvider, StatusBar } from "native-base";

import { Loading } from "./src/components/Loading";
//import { SignIn } from "./src/screens/SignIn";
import { Routes } from "./src/routes";

import { THEME } from "./src/styles/theme";
import { AuthContextProvider } from "./src/contexts/AuthContext";



export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        />
        {fontsLoaded ? <Routes/> : <Loading/>
        }
      </AuthContextProvider>
    </NativeBaseProvider> 
  );
}

