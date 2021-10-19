import React, { useState } from 'react';
import ProvGraph from './ProvGraph';
import {
  provData1,
  provData2,
  provData3,
  provData4,
  provData5,
} from './provGraphData';

const D3Test = () => {
  const [data, setData] = useState(provData1);
  const [page, setPage] = useState(0);
  return (
    <div
      style={{ width: '80%', height: '66%' }}
      onClick={() => {
        switch (page) {
          case 0:
            setData(provData2);
            setPage(1);
            break;
          case 1:
            setData(provData3);
            setPage(2);
            break;
          case 2:
            setData(provData4);
            setPage(3);
            break;
          case 3:
            setData(provData5);
            setPage(4);
            break;
          case 4:
          default:
            setData(provData1);
            setPage(0);
        }
      }}
    >
      <ProvGraph data={data} />
    </div>
  );
};

export default D3Test;
