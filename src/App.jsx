import React from 'react';
import D3Test from './D3Test';

const App = () => {
  return (
    <HeaderNFooter>
      <D3Test />
    </HeaderNFooter>
  );
};

const HeaderNFooter = (props) => {
  return (
    <div style={{ width: '80%', height: '80%', margin: '50px' }}>
      <hr />
      <hr />
      {props.children}
      <hr />
      <hr />
    </div>
  );
};

export default App;
