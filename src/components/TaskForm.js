import React, {useEffect, useState} from 'react'
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm () {

    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const handleChange = e => [
        setTask({...task, [e.target.name]: e.target.value})
    ]

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        if(editing){
            const res = await fetch(`http://localhost:4000/task/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
        } else {
            const res = await fetch('http://localhost:4000/task/', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
        }

        //const data = await res.json()
        setLoading(false)
        navigate('/tasks/')
    }

    const loadTask = async (id) => {
        const result = await fetch(`http://localhost:4000/task/${id}`)
        const data = await result.json()
        setTask({title:data.title, description:data.description})
    }

    useEffect(() => {
        if (params.id){
            loadTask(params.id)
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
                                label='Título'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}

                                name='title'
                                value={task.title}
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
                                label='Descripción'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='description'
                                value={task.description}
                                onChange={handleChange}

                                inputProps={{
                                    style: {color: 'white'}
                                }}
                                InputLabelProps={{
                                    style: {color: 'white'}
                                }}
                            />

                            <Button variant="contained" color="primary" type="submit" disabled={!task.title || !task.description}>
                                {loading ? <CircularProgress color="inherit" size={24} /> : 'Guardar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
