import { useState, useEffect } from "react";
// Para que serve useState, no react toda vez que preciso pegar um dado no caso que ta vindo do backend
// toda vez que preciso colocar uma informação e colocar na tela preciso usar o useState
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

function App() {
  const [users, setUsers] = useState([]); // Array vazio
  const [newUser , setNewUser ] = useState({ name: "", age: "" }); // Estado para novo usuário

  // useEffect para buscar os usuários quando o componente for montado
  useEffect(() => {
    api.get("/usuarios").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []); // O array vazio significa que isso será executado apenas uma vez

  // Função para adicionar um novo usuário
  const handleAddUser  = async () => {
    try {
      const response = await api.post("/usuarios", newUser );
      setUsers([...users, response.data]); // Adiciona o novo usuário à lista
      setNewUser ({ name: "", age: "" }); // Limpa os campos de entrada
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.name}> {/* Use user.id se existir */}
            Nome: {user.name} - Idade: {user.age}
          </li>
        ))}
      </ul>

      <h2>Adicionar novo Usuario</h2>
      <input
        placeholder="nome"
        value={newUser .name}
        onChange={(e) => setNewUser ({ ...newUser , name: e.target.value })}
      />
      <input
        placeholder="idade"
        value={newUser .age}
        onChange={(e) => setNewUser ({ ...newUser , age: e.target.value })}
      />
      <button onClick={handleAddUser }>Adicionar usuario</button>
    </div>
  );
}

export default App;
