import React, { useEffect, useState } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response);
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Desafio NodeJS",
      url: "https://github.com/adrielborges",
      techs: ["Node.js", "React.js"]
    })
    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  //pedir ajuda;
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    //const repositoryIndex = repositories.findIndex(project => project.id === id);
    //setRepositories(repositories.splice(repositoryIndex, 1))

    
    setRepositories(repositories.filter(repository => repository.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
