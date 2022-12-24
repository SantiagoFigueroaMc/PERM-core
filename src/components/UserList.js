import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserList({setPage}) {
    setPage("users")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const loadUsers = async () => {
        const response = await fetch('http://localhost:4000/users')
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }

    const handleDelete = async (id) => {
        setLoading(true)
        const response = await fetch(`http://localhost:4000/user/${id}`, {method:'DELETE'})
        if (response.status === 204){
            // La tarea se ha borrado
            setUsers(users.filter(t => t.id !== id))
        }
        setLoading(false)
    }

    useEffect(()=> {
        loadUsers()
    }, [])

    return (
        <>
            <div  sx={{ flexGrow: 1 }}>
                <h1>Lista de usuarios</h1>
                <Button 
                variant='contained' 
                color='primary'
                style={{marginBottom:"0.5rem"}} 
                onClick={() => navigate("/user/new")}>
                    Crear usuario
                </Button>
            </div>
            {
                users.map((user) => (
                    <Card key={user.id} style={{
                        marginBottom: ".7rem",
                        backgroundColor: "#1e272e"
                    }}>
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <div style={{color: "white"}}>
                                <Typography>{user.first}</Typography>
                                <Typography>{user.last}</Typography>
                            </div>

                            <div>
                                <Button 
                                    variant="contained" 
                                    color="inherit" 
                                    onClick={() => navigate(`/user/${user.id}/edit`)}>
                                    Editar
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="warning" 
                                    onClick={() => handleDelete(user.id)} 
                                    style={{marginLeft: ".5rem"}}>
                                    {loading ? <CircularProgress color="inherit" size={24} /> : 'Borrar'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}
