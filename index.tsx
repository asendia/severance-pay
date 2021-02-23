import React from 'react';
import ReactDOM from 'react-dom'
import Skeleton from './Skeleton';
import Form from './Form';

function App() {
  return (
    <Skeleton>
      <Form />
    </Skeleton>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
