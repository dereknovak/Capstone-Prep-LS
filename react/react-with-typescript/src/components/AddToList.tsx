import React, { ChangeEvent, useState } from 'react';
import { IState as Props } from '../App';

interface IProps {
  people: Props['people']
  setPeople: React.Dispatch<React.SetStateAction<Props['people']>>
}

const BLANK_INPUTS = {
  name: '',
  age: '',
  note: '',
  url: '',
};

const AddToList: React.FC<IProps> = ({ people, setPeople }) => {
  const [input, setInput] = useState(BLANK_INPUTS);

  const resetInputs = () => setInput(BLANK_INPUTS);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!input.name || !input.age || !input.url) return;

    setPeople(people.concat({
      ...input,
      age: parseInt(input.age),
    }));
    resetInputs();
  }

  return (
    <div className='AddToList'>
      <input
        type='text'
        placeholder='Name'
        className='AddToList-input'
        value={input.name}
        onChange={handleChange}
        name='name'
      />
      <input
        type='text'
        placeholder='Age'
        className='AddToList-input'
        value={input.age}
        onChange={handleChange}
        name='age'
      />
      <input
        type='text'
        placeholder='Image URL'
        className='AddToList-input'
        value={input.url}
        onChange={handleChange}
        name='url'
      />
      <textarea
        placeholder='Notes'
        className='AddToList-input'
        value={input.note}
        onChange={handleChange}
        name='note'
      />
      <button className='AddToList-btn'
              onClick={handleClick}>
        Add to List
      </button>
    </div>
  );
};

export default AddToList;