import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
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

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={ incrementGood } text='Good' />
      <Button onClick={ incrementNeutral } text='Neutral' />
      <Button onClick={ incrementBad } text='Bad' />

      <h1>Statistics</h1>
      <p>Good: { good }</p>
      <p>Neutral: { neutral }</p>
      <p>Bad: { bad }</p>
      <p>All: { good + neutral + bad }</p>

      <Average scores={ scores } />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={ onClick }>{ text }</button>
  );
};

const Average = ({ scores }) => {
  const totalVotes = Object.values(scores).reduce((a, b) => a + b);

  const avg = Object.entries(scores).map(([k, v]) => {
    if (k === 'Good') {
      return 1 * v;
    } else if (k === 'Neutral') {
      return 0;
    } else {
      return -1 * v;
    }
  }).reduce((a, b) => a + b) / totalVotes;

  console.log(avg);

};

export default App

// Need to approach differently