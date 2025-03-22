import { MouseEventHandler } from 'react';

const inParagraphs = (content: string) => {
  return content.split('\n\n');
};

interface ContentProps {
  toc: string[];
  chapter: string;
  handleLink: MouseEventHandler<HTMLAnchorElement>
  content: string;
}

const Content = ({ toc, chapter, handleLink, content }: ContentProps) => {
  if (chapter) {
    return (
      <>
        {inParagraphs(content).map((paragraph: string, idx: number) =>
          <p key={idx}>{paragraph}</p>
        )}
      </>
    );
  } else {
    return (
      <div className="content">
        <h2 className="content-subhead">Table of Contents</h2>

        <div className="pure-menu">
          <ul className="pure-menu-list">
            { toc.map((chapter: string, idx: number) =>
                <li className='pure-menu-item' key={idx}>
                  <a href='#' className='pure-menu-link' onClick={handleLink}>{chapter}</a>
                </li>)}
          </ul>
        </div>
      </div>
    );
  }
};

export default Content;