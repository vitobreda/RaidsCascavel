import React from "react";
import Navigator from './navigation/navigator';
import { AuthContext } from './commons/authContext'
import {Provider as PaperProvider} from 'react-native-paper';
import {CombinedDarkTheme} from './styles/darkTheme'

export default function App() {
  return (
    <AuthContext theme={CombinedDarkTheme}>
      <PaperProvider theme={CombinedDarkTheme}>
        <Navigator />
      </PaperProvider>
    </AuthContext>
  )
}
