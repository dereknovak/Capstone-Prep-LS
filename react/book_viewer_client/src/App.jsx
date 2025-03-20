import { useState, useEffect } from 'react'
const baseURL = 'http://localhost:3000/api';

function App() {
  const [tableOfContents, setTOC] = useState(null);

  const hook = () => {
    fetch(`${baseURL}/toc`)
    .then(response => {
      setTOC(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      { tableOfContents }
    </div>
  );
}

export default App
