import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <Button onClick={ setToValue(1000) } text='Thousand' />
      <Button onClick={ setToValue(0) } text='Reset' />
      <Button onClick={ setToValue(value + 1) } text='Increment' />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={ onClick }>{ text }</button>
  );
};

export default App;