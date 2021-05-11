import React, { useState } from 'react';
import Grid from './Grid';
import GridInputs from './GridInputs';
import GridsterLogo from './Gridster-Logo.png';

export default function Gridster() {
  const [generatedGrid, setGeneratedGrid] = useState({
    rows: 10,
    columns: 10,
  });

  return (
    <div>
      <div className="logo">
        <img src={GridsterLogo} alt="Gridster logo" />
      </div>
      <GridInputs generatedGrid={setGeneratedGrid} />
      <Grid {...generatedGrid} />
    </div>
  );
}
