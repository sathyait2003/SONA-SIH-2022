import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import { useThemeContext } from "../hooks/useThemeContext";

function Login() {
    const {colorMode} = useThemeContext()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = () => {
        const toastId = toast.loading('Loading user....')
        axios.post(`${BACKEND_URL}/user/login`, {email, password})
            .then((response) => {
                toast.update(toastId, {render: 'Successfully logged in', type: 'success', isLoading: false, closeButton: true, autoClose: 3000})
                localStorage.setItem('isAuthenticated', 'true')
                localStorage.setItem('userData', JSON.stringify(response.data.user))
                navigate('/')
            })
            .catch((err) => {
                toast.update(toastId, {render: err.response.data.status, type: 'error', isLoading: false, closeButton: true, autoClose: 3000})
                console.log(err)
            })
    }

    return (
        <div className={`login ${colorMode}`}>
            <Title
                color='white'
                align="center"
                style={{filter: 'drop-shadow(4px 6px 8px #00000044)'}}
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome to UGC Legal Management System
            </Title>
            <Container size={500} style={{filter: 'drop-shadow(4px 6px 8px #00000044)'}}>        
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Your email" required />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
                <Button fullWidth mt="xl" onClick={loginHandler}>
                Sign in
                </Button>
            </Paper>
            </Container>
        </div>
      );
}

export default Login;