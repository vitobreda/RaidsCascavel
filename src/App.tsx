import React from "react";
import Navigator from './navigation/navigator';
import { AuthContext } from './commons/authContext'
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <AuthContext>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </AuthContext>
  )
}
