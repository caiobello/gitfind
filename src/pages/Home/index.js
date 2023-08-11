import { useState } from 'react';
import { Header } from "../../components/Header";
import background from '../../assets/background.jpg';
import './style.css';
import { ItemList } from "../../components/ItemList";
import {Footer} from "../../components/Footer";

function App() {
  const [user, setUser] = useState('');
  const [repos, setRepos] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    if (userData.status === 404) {
      setError('Usuário não encontrado.');
      setCurrentUser(null);
      setRepos(null);
      return;
    }
    
    const newUser = await userData.json();
    setCurrentUser(newUser);
    setError(null);

    // Assuming you want to fetch user's repositories
    const reposData = await fetch(newUser.repos_url);
    const newRepos = await reposData.json();
    setRepos(newRepos);

    console.log(newUser);
    console.log(newRepos);
  }

  return (
    <div className="App">
      <Header />

      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
            {error && (
              <div className="error">{error}</div>
            )}
            {currentUser && !error && (
              <div className="perfil">
                <div>
                  <img src={currentUser.avatar_url} className="profile" alt="imagem profile" />
                </div>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>{currentUser.bio}</span>
                </div>
              </div>
            )}
        </div>
        <h1>Repositórios</h1>
           {repos && repos.map(repo => (
          <ItemList key={repo.id} title={repo.name} description={repo.description} className="item"/>
        ))}
        <hr />
      </div>
          </div>
          <div><Footer/></div>

    </div>
  );
}

export default App;
