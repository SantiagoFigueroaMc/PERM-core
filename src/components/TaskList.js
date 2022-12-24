import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TaskList({setPage}) {
    setPage("tasks")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const loadTasks = async () => {
        const response = await fetch('http://localhost:4000/tasks')
        const data = await response.json()
        setTasks(data)
    }

    const handleDelete = async (id) => {
        setLoading(true)
        const response = await fetch(`http://localhost:4000/task/${id}`, {method:'DELETE'})
        if (response.status === 204){
            // La tarea se ha borrado
            setTasks(tasks.filter(t => t.id !== id))
        }
        setLoading(false)
    }

    useEffect(()=> {
        loadTasks()
    }, [])

    return (
        <>
            <h1>Lista de tareas</h1>
            <Button 
                variant='contained' 
                color='primary' 
                style={{marginBottom:"0.5rem"}} 
                onClick={() => navigate("/task/new")}>
                    New Task
            </Button>
            {
                tasks.map((task) => (
                    <Card key={task.id} style={{
                        marginBottom: ".7rem",
                        backgroundColor: "#1e272e"
                    }}>
                        <CardContent style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <div style={{color: "white"}}>
                                <Typography>{task.title}</Typography>
                                <Typography>{task.description}</Typography>
                            </div>

                            <div>
                                <Button 
                                    variant="contained" 
                                    color="inherit" 
                                    onClick={() => navigate(`/task/${task.id}/edit`)}>
                                    Editar
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="warning" 
                                    onClick={() => handleDelete(task.id)} 
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
