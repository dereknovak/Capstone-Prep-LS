# Components
https://react.dev/learn/your-first-component

- Components are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI),
- Components return JS that builds HTML in the DOM
- Must always be capitalized
- Do not define components *within* other components.
- Components are saved individually in the `./src/components` directory.
- As always, a call to a state-updating function triggers the re-rendering of the component.

```jsx
export Default ComponentName;

//

import ComponentName from './components/ComponentName'; // Do not include `.jsx'
```

- In React, the individual things rendered in braces must be primitive values, such as numbers or strings.

# JSX

- In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces.
- All elements needs to be closed
    - JSX is XML-like

# Fragments
https://react.dev/reference/react/Fragment

- Allow you to group elements without a wrapper node
- LOOK MORE INTO THE PURPOSE OF THIS

# Extra to organize later

- Every child in a list should have a unique `key` property
- When interpolating JS code into the returned HTML, use `{}`
- Do NOT mutate the state of a component. While this will work, it can introduce bugs. Instead, return modified copies of the object.
- Install React Dev Tools extension for browser
- `<StrictMode>` will invoke `useEffect` twice when in development mode to help catch potential side effects

# Setup

```
npm create vite@latest AppName -- --template react
cd AppName
npm install
npm run dev
```

# State-hooks

# Effect-hooks
https://fullstackopen.com/en/part2/getting_data_from_server

- "Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code."
- Take 2 parameters
    1. The hook itself (a function)
    2. Specifies how often the effect is run
        - Empty array => effect is only run along with the first render of the component

# Start JSON server without separate installation

```
npx json-server --port 3001 db.json` in root directory
npm install axios
npm install json-server --save-dev (during development)
// add "server: "json-server -p 3001 db.json" to end of `"scripts"` in `package.json`
```

# Express

- Use `--watch` flag when running `npm --watch index.js` to prevent server restart w/ every change
    - You can also define this in `"scripts"` with `"dev"`

# Morgan
https://github.com/expressjs/morgan

- Use the `morgan` middleware for logging request information

```
npm install morgan
```

- Add to `index.js` and use alongside `app.use`

```js
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));
```

## Tokens

:method
:url
:status
:res[content-length]
:response-time ms'

# Cors

- Install `cors` to the backend app using `npm install cors`, then add as middleware to the program

```js
const cors = require('cors');
app.use(cors());
```