import React, {useEffect, useState} from 'react'
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserForm() {
  
  const [user, setUser] = useState({
    email: '',
    first: '',
    last: '',
    password: '',
})
const [loading, setLoading] = useState(false)
const [editing, setEditing] = useState(false)

const navigate = useNavigate()
const params = useParams()

const handleChange = e => [
    setUser({...user, [e.target.name]: e.target.value})
]

const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    if(editing){
        const res = await fetch(`http://localhost:4000/user/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}
        })
    } else {
        const res = await fetch('http://localhost:4000/user/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}
        })
    }

    //const data = await res.json()
    setLoading(false)
    navigate('/users')
}

const loadUser = async (id) => {
    const result = await fetch(`http://localhost:4000/user/${id}`)
    const data = await result.json()
    setUser({
      email:data.email, 
      first:data.first, 
      last:data.last, 
      password:data.password
    })
}

useEffect(() => {
    if (params.id){
        loadUser(params.id)
        setEditing(true)
    }
}, [])


return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={3}>
            <Card
                sx={{mt: 5}}
                style={{
                    backgroundColor: '#1e272e',
                    padding: '1rem'
                }}
            >
                <Typography variant='5' textAlign='center' color='white'>
                    {editing ? "Editar" : "Crear"} tarea
                </Typography>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant='filled'
                            label='Email'
                            sx={{
                                display: 'block',
                                margin: '.5rem 0'
                            }}

                            name='email'
                            value={user.email}
                            onChange={handleChange}

                            inputProps={{
                                style: {color: 'white'}
                            }}
                            InputLabelProps={{
                                style: {color: 'white'}
                            }}
                        />
                        <TextField
                            variant='filled'
                            label='First name'
                            sx={{
                                display: 'block',
                                margin: '.5rem 0'
                            }}

                            name='first'
                            value={user.first}
                            onChange={handleChange}

                            inputProps={{
                                style: {color: 'white'}
                            }}
                            InputLabelProps={{
                                style: {color: 'white'}
                            }}
                        />
                        <TextField
                            variant='filled'
                            label='Last name'
                            sx={{
                                display: 'block',
                                margin: '.5rem 0'
                            }}

                            name='last'
                            value={user.last}
                            onChange={handleChange}

                            inputProps={{
                                style: {color: 'white'}
                            }}
                            InputLabelProps={{
                                style: {color: 'white'}
                            }}
                        />
                        <TextField
                            variant='filled'
                            label='Password'
                            sx={{
                                display: 'block',
                                margin: '.5rem 0'
                            }}

                            name='password'
                            value={user.password}
                            onChange={handleChange}

                            inputProps={{
                                style: {color: 'white'}
                            }}
                            InputLabelProps={{
                                style: {color: 'white'}
                            }}
                        />
                        <Button variant="contained" color="primary" type="submit" disabled={!user.email || !user.password}>
                            {loading ? <CircularProgress color="inherit" size={24} /> : 'Guardar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
)
}
