import React from "react";
import Navigator from './navigation/navigator';
import { AuthContext } from './commons/authContext'


export default function App() {
  return (
    <AuthContext>
      <Navigator />
    </AuthContext>
  )
}
