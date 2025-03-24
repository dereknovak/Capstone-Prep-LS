import type { Todo } from "../types";

export const emptyTodo: Todo = {
  id: 0,
  title: '',
  day: '',
  month: '',
  year: '',
  completed: false,
  description: '',
};

export const openModal = () => {
  const modalForm = document.getElementById('form_modal') as HTMLElement;
  const modalLayer = document.getElementById('modal_layer') as HTMLElement;

  modalForm.style.display = 'block';
  modalLayer.style.display = 'block';
};

export const closeModal = () => {
  const modalForm = document.getElementById('form_modal') as HTMLElement;
  const modalLayer = document.getElementById('modal_layer') as HTMLElement;

  modalForm.style.display = 'none';
  modalLayer.style.display = 'none';
};