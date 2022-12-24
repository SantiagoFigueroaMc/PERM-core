import React from 'react'

export default function Welcome({setPage}) {
    setPage("welcome")
    return (
        <div>
            <h1>Bienvenido</h1>
            <p>Crea usuarios y tareas</p>
        </div>
    )
}
