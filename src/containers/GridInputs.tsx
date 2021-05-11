import React, { useState } from 'react';
type Props = {
  generatedGrid: React.Dispatch<
    React.SetStateAction<{
      rows: number;
      columns: number;
    }>
  >;
};
export default function GridInputs({ generatedGrid }: Props) {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);

  function handleSubmit(e: any) {
    e.preventDefault();
    generatedGrid({
      rows: rows,
      columns: columns,
    });
  }

  return (
    <form className="gridInputs" onSubmit={handleSubmit}>
      <label>
        Rows
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(parseFloat(e.target.value))}
        ></input>
      </label>
      <div className="margin--left margin--right">x</div>
      <label>
        Columns
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(parseFloat(e.target.value))}
        ></input>
      </label>
      <button type="submit" className="margin--left__medium">
        Generate
      </button>
    </form>
  );
}
