# 1.1
```jsx
const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />
      <Total total={totalExercises} />
    </div>
  )
};

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({total}) => {
  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

export default App
```

# 1.2 - 1.3

```jsx
const App = () => {
  const course = 'Half Stack application development';
  
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  )
};

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))
      }
    </div>
  );
};

const Total = ({total}) => {
  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default App
```

# 1.4

```jsx
const App = () => {
  const course = 'Half Stack application development';
  
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
};

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))
      }
    </div>
  );
};

const Total = ({parts}) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default App
```

# 1.5

```jsx
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
};

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      { parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))
      }
    </div>
  );
};

const Total = ({parts}) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default App
```