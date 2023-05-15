import { Button, Card, Dialog, Divider, Input, Text } from "@mantine/core"
import styles from "./styles.module.scss"
import { IconAt, IconPassword } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"

import {   signInWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from "../../../../firebase"
import { useInputState } from "@mantine/hooks"
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../../../recoil/userAtom";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useInputState('')
  const [password, setPassword] = useInputState('');
  const [error, setError] = useState(null);
  const setUser = useSetRecoilState(userAtom)

  const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const docRef = doc(db, "utilisateur", userCredential.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {  
            setUser({
              isAuth: true,
              id: userCredential.user.uid,
              email: email,
              Pseudo: docSnap.data().Pseudo,
              Badge: docSnap.data().Badge,
              token: userCredential.user.token,
              Score: docSnap.data().Score,
              mots: docSnap.get("mots") ?? [],
            })
            navigate("/profile")
          } else {
            console.log("exist")
          }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
            console.log(errorCode, errorMessage)
        });
       
    }

      useEffect(() => {
      if(error !== null)  {
        setTimeout(() => {
          setError(null)
        }, 4000)
      }
    }, [error])

  return (
    <article className={styles.login_container}>
          <Dialog opened={!!error} withCloseButton onClose={close} size="lg" radius="md" position={{top: "5%", left: "36%"}}>
              <Text color="red">{error}</Text>
            </Dialog>
            <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
                <Text fz="xl">Se Connecter</Text>
                <Input
                    className={styles.input}
                    value={email}
                    onChange={setEmail}
                    size="lg"
                    type="email"
                    icon={<IconAt />}
                    placeholder="Email"
                    variant="filled"
                />
                <Input
                    value={password}
                    onChange={setPassword}
                    size="lg"
                    type="password"
                    icon={<IconPassword/>}
                    placeholder="Password"
                    variant="filled"
                />
                <Button fullWidth onClick={onLogin}>
                    Se Connecter
                </Button>
                <Divider my="sm" label="Vous n&apos;avez pas un compte "  />
                <Link to="/signup" className={styles.link}> S&apos;Inscrire </Link>
            </Card>

    </article>
  )
}

export default Login