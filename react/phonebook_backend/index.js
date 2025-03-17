const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "(123)456-7890"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "(456)789-1230"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "(789)456-1230"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "(123)789-4560"
  }
]

const logBody = (request, response, next) => {
  console.log(request.body);
  next();
};

app.use(morgan(':method :url :status :response-time ms'));
app.use(logBody);

const generateId = () => {
  const maxId = Math.max(...persons.map(p => Number(p.id))) || 0;
  return String(maxId + 1);
};

const nameExists = (name) => {
  return persons.map(p => p.name).includes(name);
}

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>\n` +
    new Date().toUTCString()
  );
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Content missing',
    });
  }

  if (nameExists(body.name)) {
    return response.status(400).json({
      error: 'Name must be unique',
    });
  }

  const content = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons.push(content);
  response.json(content);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons.filter(p => p.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});