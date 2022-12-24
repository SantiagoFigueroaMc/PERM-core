import React from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({currentPage}) {
    const navigate = useNavigate()
    console.log(currentPage)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{ flexGrow: 1}} >
                            <Link to="/" style={{textDecoration: 'none', color: '#eee'}}>PERN Stack</Link>
                        </Typography>
                        {currentPage === "welcome" ? 
                        <div>
                            <Button 
                            variant='contained' 
                            color='primary' 
                            style={{margin:".5rem"}}
                            onClick={() => navigate("/users/")}>
                                Users
                            </Button>
                            <Button 
                            variant='contained' 
                            color='primary' 
                            style={{margin:".5rem"}}
                            onClick={() => navigate("/tasks/")}>
                                Tasks
                            </Button>
                        </div>
                        :
                        currentPage === "tasks" ?
                        <Button 
                        variant='contained' 
                        color='primary' 
                        style={{margin:".5rem"}}
                        onClick={() => navigate("/users/")}>
                            Users
                        </Button>
                        :
                        <Button 
                        variant='contained' 
                        color='primary' 
                        style={{margin:".5rem"}}
                        onClick={() => navigate("/tasks/")}>
                            Tasks
                        </Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
