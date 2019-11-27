import React from 'react';
import Hook from './Hook';
import ClickCounter from './practice/hoc/ClickCounter';
import HoverCounter from './practice/hoc/HoverCounter';
import Button from '@material-ui/core/Button';

const App = () => {
  return (
    <div>
      <Hook /> <br/>
      <Button variant="contained" color="primary">Hello</Button>
      <HoverCounter/>
      <ClickCounter/>
    </div>
  );
}

export default App;
