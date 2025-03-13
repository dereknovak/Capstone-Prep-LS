const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header name={ name } />
      <Content content={ parts } />
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{ name }</h2>;
};

const Content = ({ content }) => {
  const total = content.reduce((a, b) => a + b.exercises, 0);
  return (
    <>
      { content.map(part =>
        <Part key={part.id} name={ part.name } exercises={ part.exercises } />
      )}
      <p><strong>Total of { total } exercises</strong></p>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>{ name } { exercises }</p>
    </>
  );
};

export default Course;