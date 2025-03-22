import { MouseEventHandler } from 'react';

interface MenuProps {
  toc: string[];
  handleLink: MouseEventHandler<HTMLAnchorElement>;
  handleHomeNav: MouseEventHandler<HTMLAnchorElement>;
}

const Menu = ({ toc, ...handlers }: MenuProps) => {
  return (
    <div id='menu'>
      <div className="pure-menu">
        <a className='pure-menu-heading' href='#' onClick={handlers.handleHomeNav}>Table of Contents</a>

        <ul className="pure-menu-list">
          { toc.map((chapter: string, idx: number) =>
              <li className='pure-menu-item' key={idx}>
                <a href='#' className='pure-menu-link' onClick={handlers.handleLink}>{chapter}</a>
              </li>)}
        </ul>
      </div>
    </div>
  );
};

export default Menu;