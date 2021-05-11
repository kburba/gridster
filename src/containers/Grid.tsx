import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { getRandomArbitrary } from '../utils';

export default function Grid({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) {
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [startRow, setStartRow] = useState<number>();
  const [lastRow, setLastRow] = useState<number>();

  useEffect(() => {
    const randomStartRow = getRandomArbitrary(0, rows);
    setStartRow(randomStartRow);
    setLastRow(getRandomArbitrary(randomStartRow, rows));
    setSelectedColumns([]);
  }, [rows, columns]);

  const gridRows: number[] = [];
  const gridColumns: number[] = [];

  for (let indexR = 0; indexR < rows; indexR++) {
    gridRows.push(indexR + 1);
  }
  for (let indexC = 0; indexC < columns; indexC++) {
    gridColumns.push(indexC + 1);
  }

  function toggleSelect(id: number) {
    const selectedIndex = selectedColumns.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedColumns, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedColumns.slice(1));
    } else if (selectedIndex === selectedColumns.length - 1) {
      newSelected = newSelected.concat(selectedColumns.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedColumns.slice(0, selectedIndex),
        selectedColumns.slice(selectedIndex + 1)
      );
    }
    setSelectedColumns(newSelected);
  }

  const isInRange = (idxR: number) =>
    typeof startRow !== 'undefined' && typeof lastRow !== 'undefined'
      ? idxR <= lastRow && idxR >= startRow
      : false;

  const columnsInRange = selectedColumns.filter(
    (x) => startRow && lastRow && startRow * 10 <= x && x <= (lastRow + 1) * 10
  );

  const minSelected = Math.min.apply(Math, columnsInRange);
  const maxSelected = Math.max.apply(Math, columnsInRange);
  return (
    <div className="grids">
      {gridRows.map((row, idxR) => (
        <div key={row} className="gridRow">
          {gridColumns.map((column, idxC) => {
            const isStart = startRow === idxR && idxC === 0;
            const isEnd = lastRow === idxR && idxC === columns - 1;
            const columnId = idxR * 10 + idxC;
            const isSelected = selectedColumns.indexOf(columnId) > -1;
            const isBetweenStartAndEnd = isInRange(idxR);
            const isBetweenSelected =
              minSelected <= columnId && columnId <= maxSelected;
            const isSelectedInRange =
              !isStart && !isEnd && isBetweenStartAndEnd && isBetweenSelected;

            return (
              <div
                key={column}
                className={classnames('gridColumn', {
                  start: isStart,
                  end: isEnd,
                  clear: isSelected,
                  shortest: isSelectedInRange,
                })}
                onClick={() => {
                  if (!isStart && !isEnd) {
                    toggleSelect(columnId);
                  }
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
