import * as React from "react";

interface Props {
  count: number;
}

const Mistakes: React.FunctionComponent<Props> = (props: Props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  const renderMistake = (mistake, i) => {
    const getMistakeKey = `mistake-${i}`;
    return (
      <div key={getMistakeKey} className="wrong" />
    );
  };

  return (
    <div className="game__mistakes">
      {mistakes.map(renderMistake)}
    </div>
  );
};

export default Mistakes;
