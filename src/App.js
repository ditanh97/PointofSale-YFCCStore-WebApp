import React from 'react';
// import Button from '@material-ui/core/Button';
// import Hook from './practice/materialStyle/Hook';
// import ClickCounter from './practice/hoc/ClickCounter';
// import HoverCounter from './practice/hoc/HoverCounter';
// import Stylesheet from './practice/style/Stylesheet'
// import Inline from './practice/style/Inline'
import Flexbox from './practice/flexbox/Flexbox'
import './practice/style/App.css'
// import styles from './practice/style/appStyles.module.css'

const App = () => {
  return (
    <div>
      {/* <Hook /> <br/>
      <Button variant="contained" color="primary">Hello</Button>
      <HoverCounter/>
      <ClickCounter/>
      <Stylesheet primary={false}/>
      <h1 className="error">Error</h1>
      <h1 className={styles.success}>Success</h1>
      <Inline/> */}
      <Flexbox />
    </div>
  );
}

export default App;
