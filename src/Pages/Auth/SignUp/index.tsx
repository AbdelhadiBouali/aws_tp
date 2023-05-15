import React, { useEffect, useState } from "react"
import { Button, Card, Dialog, Divider, Input, Text } from "@mantine/core"
import { useInputState } from '@mantine/hooks';
import { IconAt, IconPassword, IconUser } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import * as styles from "./styles.module.scss"
import { createUserWithEmailAndPassword } from "firebase/auth"
import app, { auth, db } from "../../../../firebase.js"
import { Firestore, addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const SignUp = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useInputState('')
    const [password, setPassword] = useInputState('');
    const [username, setUsername] = useInputState('');
    const [error, setError] = useState(null);

     const onSubmit = async (e) => {
      e.preventDefault()
      

     
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const usersRef = collection(db, "utilisateur");
            await setDoc(doc(usersRef, userCredential.user.uid),{
              Pseudo: username,
              Score: 0,
              Badge: 0,
              mots: []
            }).then((value) => {
                navigate("/login")
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
          
            // ..
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
                <Text fz="xl">S'Inscrire</Text>
                <Input
                    value={username}
                    onChange={setUsername}
                    size="lg"
                    type="text"
                    icon={<IconUser />}
                    placeholder="UserName"
                    variant="filled"
                />
                <Input
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
                <Button onClick={onSubmit} fullWidth>
                    S&apos;Inscrire
                </Button>
                <Divider my="sm" label="Vous avez un compte "  />
                <Link to="/Login" className={styles.link}> Se Connecter</Link>
            </Card>

    </article>
  )
}

export default SignUp