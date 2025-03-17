import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const padding = {
    padding: 5,
  };

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note));
      })
      .catch(() => {
        setErrorMessage(`The note '${note.content}' was already deleted from server!`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const user = await loginService.login({
        username, password,
      });

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  );

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to='/'>Home</Link>
          <Link style={padding} to='/notes'>Notes</Link>
          <Link style={padding} to='/users'>Users</Link>
        </div>

        <Routes>
          <Route path='/notes' element={<Notes />} />
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<Home />} />
        </Routes>

        <div>
          <i>Note app, Department Of CS, Launch School</i>
        </div>
      </Router>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user === null
          ? loginForm()
          : <div>
              <p>{user.name} logged-in</p>
              {noteForm()}
            </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote}
               onChange={handleNoteChange}
               placeholder='A new note...'/>
        <button type='submit'>Save</button>
      </form>

      <Footer />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className='error'>
      {message}
    </div>
  );
};

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, Launch School</em>
    </div>
  );
};

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = () => (
  <div> <h2>Notes</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

export default App 
