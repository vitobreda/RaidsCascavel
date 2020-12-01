import * as React from 'react';
import { Context } from './src/Commons/ContextApi';
import Navigator from './src/Navigator';
import ErrorBoundary from './src/Commons/ErrorBoundary';
import { ErrorHandler } from './src/Commons/ErrorHandler';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

function App() {
  setJSExceptionHandler(ErrorHandler, true);

  setNativeExceptionHandler((errorString) => {
    console.log('native error handler');
  });

  return (
    <ErrorBoundary>
      <Context>
        <Navigator />
      </Context>
    </ErrorBoundary>
  );
}

export default App;
