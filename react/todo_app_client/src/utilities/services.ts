import axios from 'axios';
const baseURL = 'http://localhost:3000/api/todos';
import type { Todo } from '../types';

export const create = async (todo: Todo) => {
  const request = axios.post(baseURL, todo);
  return request.then(response => response.data);
};

export const update = async (id: number, updatedTodo: Todo) => {
  const request = axios.put(`${baseURL}/${id}`, updatedTodo);
  return request.then(response => response.data);
}

export const remove = async (id: number) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response => response.data);
};
