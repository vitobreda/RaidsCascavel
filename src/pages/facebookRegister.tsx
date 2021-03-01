import React, { useState } from "react"
import { ScrollView } from 'react-native'
import * as Styles from '../styles/registerStyle'

export default function FacebookRegister() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [friendCode, setFriendCode] = useState<string>('');

  return (
    <Styles.Container>
      <ScrollView style={{ flex: 1 }}>
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

        <Styles.Button>
          <Styles.ButtonText>Entrar</Styles.ButtonText>
        </Styles.Button>
      </ScrollView>
    </Styles.Container >
  )
}