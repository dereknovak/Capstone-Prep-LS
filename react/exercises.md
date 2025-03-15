# 1.1
```jsx
const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />
      <Total total={totalExercises} />
    </div>
  )
};

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({total}) => {
  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

export default App
```

# 1.2 - 1.3

```jsx
const App = () => {
  const course = 'Half Stack application development';
  
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  )
};

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))
      }
    </div>
  );
};

const Total = ({total}) => {
  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default App
```

# 1.4

```jsx
const App = () => {
  const course = 'Half Stack application development';
  
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
};

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))
      }
    </div>
  );
};

const Total = ({parts}) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default App
```

# 1.5

```jsx
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
};

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))
      }
    </div>
  );
};

const Total = ({parts}) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default App
```

# 1.6 - 1.11

```jsx
import { useState } from 'react'

const toScore = ([k, v]) => {
  switch (k) {
    case 'good':
      return 1 * v;
    case 'neutral':
      return 0;
    case 'bad':
      return -1 * v;
  }
};

const toPercentage = (num, den) => num / den * 100;

const tallyScores = (scores) => {
  let total = 0;
  for (let score in scores) {
    total += scores[score];
  }

  return total;
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  const scores = {
    good,
    neutral,
    bad,
  }
  const all = good + neutral + bad;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={ incrementGood } text='Good' />
      <Button onClick={ incrementNeutral } text='Neutral' />
      <Button onClick={ incrementBad } text='Bad' />

      <Statistics scores={ scores } all={ all } />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={ onClick }>{ text }</button>
  );
};

const StatisticLine = ({ text, value }) => {
  const possiblePercent = text === 'Positive' ? '%' : '';

  return (
    <tbody>
      <tr>
        <td>{ text }</td>
        <td>{ value } { possiblePercent }</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ scores }) => {
  const all = tallyScores(scores);
  const avg = Object.entries(scores)
                    .map(toScore)
                    .reduce((a, b) => a + b) / all;

  
  const positive = toPercentage(scores.good, all);

  if (all) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <StatisticLine text='Good' value={ scores.good } />
          <StatisticLine text='Neutral' value={ scores.neutral } />
          <StatisticLine text='Bad' value={ scores.bad } />
          <StatisticLine text='All' value={ all } />
          <StatisticLine text='Average' value={ avg } />
          <StatisticLine text='Positive' value={ positive } />
        </table>
      </>
    );
  } else {
    return (
      <p>No feedback given.</p>
    );
  }
};

export default App
```

# 1.12 - 1.14

```jsx
import { useState } from 'react';

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1));
  };

  const incrementVote = () => {
    const copy = [...votes];
    copy[selected] += 1

    setVotes(copy);
  };

  const mostVoted = () => {
    const highestVote = Math.max(...votes);
    return votes.indexOf(highestVote);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{ anecdotes[selected] }</p>
      <p>...has { votes[selected] } votes</p>
      <button onClick={ incrementVote }>Vote</button>
      <button onClick={ randomAnecdote }>Next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{ anecdotes[mostVoted()] }</p>
      <p>...has { votes[mostVoted()] } votes</p>
    </div>
  )
}

export default App;
```

# 2.1 - 2.5

```jsx
// App.jsx
import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web Development Curriculum</h1>
      { courses.map(course =>
        <Course key={ course.id } course={ course } />
      )}
    </>
  );
}

export default App;
```

```jsx
// Course.jsx
const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header name={ name } />
      <Content content={ parts } />
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{ name }</h2>;
};

const Content = ({ content }) => {
  const total = content.reduce((a, b) => a + b.exercises, 0);
  return (
    <>
      { content.map(part =>
        <Part key={part.id} name={ part.name } exercises={ part.exercises } />
      )}
      <p><strong>Total of { total } exercises</strong></p>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>{ name } { exercises }</p>
    </>
  );
};

export default Course;
```

# 2.6 - 2.10

```jsx
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
```

# 2.11

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

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
```