import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
const baseURL = 'http://localhost:3000/api';

function App() {
  const [toc, setTOC] = useState<string[]>([]);
  const [chapter, setChapter] = useState('');
  const [content, setContent] = useState('');

  const fetchTOC = async () => {
    try {
      const response = await axios.get(`${baseURL}/toc`);
      setTOC(response.data.chapters);
    } catch {
      console.error('An error has occurred');
    }
  };

  const fetchChapter = async () => {
    const path = chapterToPath();
    console.log('hello');
    const response = await axios.get(`${baseURL}/${path}`);
    setContent(response.data);
  }

  const chapterToPath = () => {
    return chapter.toLowerCase().split(' ').join('-');
  };

  useEffect(() => {
    fetchTOC();
  }, []);

  const handleLink = (e) => {
    e.preventDefault();
    setChapter(e.target.textContent);
    setTOC([]);
    fetchChapter();
  };

  return (
    <div>
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
        </a>

        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="/">Table of Contents</a>

                <ul className="pure-menu-list">
                  <li className="pure-menu-item">
                    <a href="#" className="pure-menu-link">Chapter 1</a>
                  </li>
                </ul>
            </div>
        </div>

        <div id="main">
          <Header />
          <Content toc={toc}
                   chapter={chapter} />
        </div>
    </div>
    <script type="text/javascript" src="static/javascripts/ui.js"></script>
  </div>
  );
}

const Content = ({ toc, chapter }) => {
  if (toc.length > 0) {
    return (
      <div className="content">
        <h2 className="content-subhead">Table of Contents</h2>

        <div className="pure-menu">
          <ul className="pure-menu-list">
            { toc.map((chapter: string, idx: number) =>
                <li className='pure-menu-item' key={idx}>
                  <a href='#' className='pure-menu-link'>{chapter}</a>
                </li>)}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <p>CHAPTER!</p>
    );
  }
};

const Header = () => {
  return (
    <div className="header">
      <h1>The Adventures of Sherlock Holmes</h1>
      <h2>by Sir Arthur Doyle</h2>
    </div>
  );
};



export default App


