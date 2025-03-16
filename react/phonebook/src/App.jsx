import { useState, useEffect } from 'react';
import axios from 'axios';
import appService from './services/persons';
import './index.css'

const EMPTY_MESSAGE = { message: null, status: null };

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  };

  useEffect(hook, []);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ ...EMPTY_MESSAGE });

  const filteredPersons = persons.filter(person => {
    const personName = person.name.toLowerCase().slice(0, filter.length);
    return personName === filter.toLowerCase();
  });

  const findPerson = () => {
    return persons.find(person => person.name === newName);
  };

  const formatPhone = () => {
    const area = newPhone.slice(0, 3);
    const first = newPhone.slice(3, 6);
    const second = newPhone.slice(6, 10);

    return `(${area})${first}-${second}`;
  };

  const displayMessage = (text, status) => {
    setMessage({ text, status });
    setTimeout(() => setMessage({ ...EMPTY_MESSAGE }), 5000);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: formatPhone(newPhone),
    };

    const foundPerson = findPerson();
    if (foundPerson) {
      const confirmed = confirm(`${newName} is already added to phonebook.` +
            'Replace the old number with a new one?');

      if (confirmed) {
        newPerson.id = foundPerson.id;

        appService
          .update(foundPerson.id, newPerson)
          .then(() => {
            setPersons(persons.map(person => person.id === newPerson.id
              ? newPerson
              : person
          ))})
          .catch(() => {
            const errorMessage = `Information of ${newPerson.name} has already ` +
                           'been removed from the server.';
                           
            displayMessage(errorMessage, 'error');
            const personsCopy = persons.filter(p => p.id !== newPerson.id);
            setPersons(personsCopy);
          });
      }
    } else {
      newPerson.id = String(persons.length + 1);

      appService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          displayMessage(`Added ${newPerson.name}`, 'success');
        });
    }

    setNewName('');
    setNewPhone('');
  };

  const handlePersonDelete = (id) => () => {
    const person = persons.find(p => p.id === id);
    const confirmed = confirm(`Delete ${person.name}?`);

    if (confirmed) {
      appService
        .remove(person.id)
        .then(() => {
          const personsCopy = persons.filter(p => p.id !== id);
          setPersons(personsCopy);
        });
      }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} filterChange={handleFilterChange} />

      <PersonForm name={newName}
                  number={newPhone}
                  formSubmission={handleFormSubmission}
                  nameChange={handleNameChange}
                  phoneChange={handlePhoneChange} />
      <Numbers persons={filteredPersons}
               personDelete={handlePersonDelete} />
    </div>
  );
};

const Filter = ({ filter, ...handlers }) => {
  return (
    <>
      Filter shown with: 
      <input type='text'
            value={filter}
            onChange={handlers.filterChange} />
    </>
  );
};

const PersonForm = ({ name, number, ...handlers }) => {
  return (
    <>
      <h2>Add New Profile</h2>
      <form onSubmit={handlers.formSubmission}>
        <dl>
          <dt>
            Name: <input type='text'
                        value={name}
                        onChange={handlers.nameChange}
                        placeholder='John Smith'/>
          </dt>
          <dt>
            Number: <input type='tel'
                        value={number}
                        onChange={handlers.phoneChange}
                        placeholder='(xxx)xxx-xxxx' />
          </dt>
        </dl>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

const Numbers = ({ persons, ...handlers }) => {
  return (
    <>
      <h2>Numbers</h2>
      <dl>
        {persons.map(person =>
          <Person key={person.id}
                  id={person.id}
                  name={person.name}
                  number={person.number}
                  personDelete={handlers.personDelete} />
        )}
      </dl>
  </>
  );
};

const Person = ({ id, name, number, ...handlers }) => {
  return (
    <>
      <dt>
        {name}
        <button onClick={handlers.personDelete(id)}>
          Delete
        </button>
      </dt>
      <dd>{number}</dd>
    </>
  );
};

const Notification = ({ message } ) => {
  const { text, status } = message;
  if (!status) return null;

  return (
    <div className={`message ${status}`}>
      {text}
    </div>
  );
};

export default App;