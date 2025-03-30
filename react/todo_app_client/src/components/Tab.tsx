const Tab = ({ name, contents, group, loadGroup, listType}) => {
  return (
    <>
      <dl onClick={(e) => loadGroup(e.currentTarget, name, listType)}>
        <dt>{name}</dt>
        <dd>{contents.length}</dd>
      </dl>
    </>
  );
};

export default Tab;

