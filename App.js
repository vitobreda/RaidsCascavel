import * as React from 'react';
import { Context } from './src/Context';
import Navigator from './src/Navigator';

function App() {
  return (
    <Context>
      <Navigator />
    </Context>
  );
}

export default App;
