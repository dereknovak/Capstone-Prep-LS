import type { Tab, TabProps } from "../types";

const Tab: React.FC<TabProps> = ({ name, contents, loadGroup, listType}) => {
  return (
    <>
      <dl onClick={(e) => loadGroup(e.currentTarget, name as Tab, listType)}>
        <dt>{name}</dt>
        <dd>{contents.length}</dd>
      </dl>
    </>
  );
};

export default Tab;

