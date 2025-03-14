# Components
https://react.dev/learn/your-first-component

- Components are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI),
- Components return JS that builds HTML in the DOM
- Must always be capitalized
- Do not define components *within* other components.
- Components are saved individually in the `./src/components` directory.
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

# Setup

```
npm create vite@latest AppName -- --template react
cd AppName
npm install
npm run dev
```
