import { Button, Container, MultiSelect, Paper, PasswordInput, Switch, TextInput, Title } from "@mantine/core"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { BACKEND_URL } from "../constants"
import { useThemeContext } from "../hooks/useThemeContext"
import categories from "../utils/categories"

function Signup() {
    const {colorMode} = useThemeContext()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [categoryAccess, setCategoryAccess] = useState<string[]>([])

    const signupHandler = () => {
        const toastId = toast.loading('Creating user....')
        axios.post(`${BACKEND_URL}/user/signup`, {name, email, password, isAdmin, categoryAccess})
            .then(() => toast.update(toastId, {render: 'Successfully created user', type: 'success', isLoading: false, closeButton: true, autoClose: 3000}))
            .catch((err) => {
                toast.update(toastId, {render: err.response.data.status, type: 'error', isLoading: false, closeButton: true, autoClose: 3000})
                console.log(err)
            })
    }

    return(
        <div className={`login ${colorMode}`}>
            <Container size={720}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Add new user
            </Title>
        
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput value={name} onChange={(e) => setName(e.target.value)} label="Name" placeholder="Name of the user" required />
                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Email of the user" required mt="lg" />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Password" required mt="lg" />
                <MultiSelect 
                    data={categories}
                    label='Access to categories'
                    placeholder="give access to various categories"
                    searchable
                    nothingFound='Nothing Found'
                    mt="lg"
                    onChange={(values) => setCategoryAccess(values)}
                />
                <Switch label="Is this user an admin?" checked={isAdmin} onChange={(event) => setIsAdmin(event.currentTarget.checked)} mt="lg" />
                <Button fullWidth mt="xl" onClick={signupHandler}>
                Add new user
                </Button>
            </Paper>
            </Container>
        </div>
    )
}

export default Signup