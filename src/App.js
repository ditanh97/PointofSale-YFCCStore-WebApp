import React from 'react';
import Button from '@material-ui/core/Button';
import Hook from './practice/materialStyle/Hook';
import ClickCounter from './practice/hoc/ClickCounter';
import HoverCounter from './practice/hoc/HoverCounter';
import Stylesheet from './practice/style/Stylesheet'

const App = () => {
  return (
    <div>
      {/* <Hook /> <br/>
      <Button variant="contained" color="primary">Hello</Button>
      <HoverCounter/>
      <ClickCounter/> */}
      <Stylesheet primary={false}/>
    </div>
  );
}

export default App;
