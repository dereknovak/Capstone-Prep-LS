import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '(123)456-7890', id: 1 },
    { name: 'Ada Lovelace', number: '(456)789-1230', id: 2 },
    { name: 'Dan Abramov', number: '(789)456-1230', id: 3 },
    { name: 'Mary Poppendieck', number: '(123)789-4560', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter(person => {
    const personName = person.name.toLowerCase().slice(0, filter.length);
    return personName === filter.toLowerCase();
  });

  const personExists = () => {
    return persons.map(person => person.name).includes(newName);
  };

  const formatPhone = () => {
    const area = newPhone.slice(0, 3);
    const first = newPhone.slice(3, 6);
    const second = newPhone.slice(6, 10);

    return `(${area})${first}-${second}`;
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    if (personExists()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: formatPhone(newPhone),
    };

    setPersons(persons.concat(newPerson));
    setNewName('') || setNewPhone('');
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChange={handleFilterChange} />

      <PersonForm name={newName}
                  number={newPhone}
                  formSubmission={handleFormSubmission}
                  nameChange={handleNameChange}
                  phoneChange={handlePhoneChange} />
      <Numbers persons={filteredPersons} />
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

const Numbers = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <dl>
        {persons.map(person =>
          <Person key={person.id}
                  name={person.name}
                  number={person.number} />
        )}
      </dl>
  </>
  );
};

const Person = ({ name, number }) => {
  return (
    <>
      <dt>{name}</dt>
      <dd>{number}</dd>
    </>
  );
};

export default App;