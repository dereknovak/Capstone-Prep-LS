// import { useState } from 'react'
import './App.css'

const App = () => {
  return (
    <body>
      <input type='checkbox' id='sidebar_toggle' />
      <div id='sidebar'>
        <section id='all'>
          <div id='all_todos'>
            <header id='all_header' className='active'>
              <dl>
                <dt>All Todos</dt>
                <dd>0</dd>
              </dl>
            </header>
          </div>
          <article id='all_lists'></article>
        </section>
        <section className='completed' id='completed_items'>
          <div id='completed_todos'>
            <header id='all_done_header'>
              <dl>
                <dt>Completed</dt>
                <dd>0</dd>
              </dl>
            </header>
          </div>
        </section>
      </div>
      <div id='items'>
        <header>
          <dl>
            <dt>
              <time>All Todos</time>
              <dd>0</dd>
            </dt>
          </dl>
        </header>

        <main>
          <table cellSpacing={0}>
            <div className='modal' id='modal_layer'></div>
            <div className='modal' id='form_modal'>
              <form method='POST'>
                <fieldset>
                  <ul>
                    
                  </ul>  
                </fieldset>  
              </form>
            </div>
          </table>
        </main>
      </div>
    </body>
  )
};

export default App
