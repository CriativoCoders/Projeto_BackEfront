import { useState } from 'react'
// Para que server useState, no react toda vez que preciso pegar um dado no caso que ta vindo do backend 
// toda vez que preciso colocar uma informação e colocar na tela preciso usa o userState
import axios from 'axios'
import './App.css'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})
function App() {
  const [users, setUsers] = useState([]) // Arrey fazio
  // dentro dos users ficam as minhas informações
  api.get('/usuarios').then((resposta) => {
    console.log(resposta.data)
    setUsers(resposta.data)
  })

  return (
    <div>
      
      <h1>Usuarios</h1>
      {/* mostrando na tela:  */}
      <ul>
        { users.map( user => (
          <li>Nome: {user.name} - Idade: {user.age}</li>

        )) }
      </ul>

      
    </div>
  )
}

export default App
