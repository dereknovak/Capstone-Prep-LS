const Group = ({ name, contents, group, loadGroup, listType }) => {
  return (
    <>
      <dl onClick={(e) => loadGroup(e.currentTarget, name)}>
        <dt>{name}</dt>
        <dd>{contents.length}</dd>
      </dl>
    </>
  );
};

export default Group;

