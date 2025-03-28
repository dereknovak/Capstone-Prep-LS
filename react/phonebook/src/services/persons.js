import axios from 'axios';
const baseURL = 'http://localhost:3001/api/persons';

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then(response => response.data);
};

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseURL}/${id}`, updatedPerson);
  return request.then(response => response.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response => response.data);
};

export default { create, update, remove };