import React, { useState } from "react"
import { ScrollView } from 'react-native'
import * as Styles from '../styles/registerStyle'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import axios from "axios"

export default function Register() {
  const [nickName, setNickName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [friendCode, setFriendCode] = useState<string>('');

  function createAppUser(email: string, firebaseId: string) {
    let newUser = {
      userName: nickName,
      email: email,
      firebaseId: firebaseId,
      level: level,
      team: team,
      friendCode: friendCode
    }

    axios.post("http://192.168.1.11:3000/users/firebaseCreateUser", JSON.stringify(newUser), {
      headers: { "Content-Type": 'application/json' }
    }
    )
      .then((response) => {
        console.log('axios response: ', response.data);
      }).catch((error) => {
        console.log('axios error: ', error.response.data);
      });
  }

  function onButtonPress() {
    auth().createUserWithEmailAndPassword(email, password)
      .then((credential: any) => { createAppUser(credential.user.email, credential.user.uid) })
      .catch((error) => { console.log('ocorreu um erro ao cadastrar o usuario no firebase: ', error.message) })
  }

  return (
    <Styles.Container>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Styles.InputView>
          <Styles.InputText
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email..."
          />
        </Styles.InputView>

        <Styles.InputView>
          <Styles.InputText
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Password..."
          />
        </Styles.InputView>

        <Styles.InputView>
          <Styles.InputText
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder="Confirm password..."
          />
        </Styles.InputView>

        <Styles.InputView>
          <Styles.InputText
            value={nickName}
            onChangeText={text => setNickName(text)}
            placeholder="Nick name..."
          />
        </Styles.InputView>


        <Styles.InputView>
          <Styles.InputText
            value={level}
            onChangeText={text => setLevel(text)}
            placeholder="Level..."
          />
        </Styles.InputView>

        <Styles.InputView>
          <Styles.InputText
            value={team}
            onChangeText={text => setTeam(text)}
            placeholder="Team..."
          />
        </Styles.InputView>

        <Styles.InputView>
          <Styles.InputText
            value={friendCode}
            onChangeText={text => setFriendCode(text)}
            placeholder="Friend Code..."
          />
        </Styles.InputView>

        <Styles.Button onPress={onButtonPress}>
          <Styles.ButtonText>Entrar</Styles.ButtonText>
        </Styles.Button>
      </ScrollView>
    </Styles.Container >
  )
}