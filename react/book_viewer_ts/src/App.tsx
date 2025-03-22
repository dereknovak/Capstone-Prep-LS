import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { MouseEvent } from 'react';

import Menu from './components/Menu';
import Header from './components/Header';
import Content from './components/Content';

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

  const fetchChapter = async (chapterName: string) => {
    const path = chapterToPath(chapterName);
    const response = await axios.get(`${baseURL}/${path}`);
    setContent(response.data);
  }

  const chapterToPath = (name: string) => {
    return name.toLowerCase().split(' ').join('-');
  };

  useEffect(() => {
    fetchTOC();
  }, []);

  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;
    const chapterName = target.textContent || '';

    setChapter(chapterName);
    fetchChapter(chapterName);
  };

  const handleHomeNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setChapter('');
  };

  return (
    <div>
      <div id="layout">
        <a href='#' onClick={handleHomeNav} id="menuLink" className="menu-link">
            <span></span>
        </a>
        <Menu toc={toc}
              handleLink={handleLink}
              handleHomeNav={handleHomeNav} />
        <div id="main">
          <Header />
          <Content toc={toc}
                   chapter={chapter}
                   handleLink={handleLink}
                   content={content} />
        </div>
    </div>
    <script type="text/javascript" src="static/javascripts/ui.js"></script>
  </div>
  );
}

export default App


