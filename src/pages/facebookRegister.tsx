import React, { useContext, useState } from "react"
import { ScrollView } from 'react-native'
import * as Styles from '../styles/registerStyle'
import { StateContext } from '../commons/authContext'
import axios from "axios";
import { constants } from "../commons/constants";

export default function FacebookRegister(props: any) {
  const [nickName, setNickName] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [friendCode, setFriendCode] = useState<string>('');
  const { loginApi } = useContext(StateContext)

  function createAppUser() {
    console.log('try to create a new user', props)
    let newUser = {
      userName: nickName,
      email: props.route.params.email,
      firebaseId: props.route.params.firebaseId,
      level: level,
      team: team,
      friendCode: friendCode
    }

    axios.post(constants.services.USER, JSON.stringify(newUser), {
      headers: { "Content-Type": 'application/json' }
    }
    )
      .then((response) => {
        loginApi(props.route.params.firebaseToken)
      }).catch((error) => {
        console.log('axios error: ', error.response.data);
      });
  }

  return (
    <Styles.Container>
      <ScrollView style={{ flex: 1 }}>

        <Styles.InputView>
          <Styles.InputText
            value={nickName}
            onChangeText={text => setNickName(text)}
            placeholder='Nick name ....'
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

        <Styles.Button onPress={() => createAppUser()}>
          <Styles.ButtonText>Entrar</Styles.ButtonText>
        </Styles.Button>
      </ScrollView>
    </Styles.Container >
  )
}