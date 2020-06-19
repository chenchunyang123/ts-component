import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
library.add(fas);

const App: React.FC = () => {
  const [ show, setShow ] = useState(false);
  return (
    <div className="App">
      {/* <Icon icon='coffee' theme='primary' size='10x' /> */}
      {/* <Menu defaultIndex={'0'} onSelect={number => alert(number)} mode='vertical'> */}
      <Menu defaultIndex={'0'} onSelect={number => alert(number)}>
        <MenuItem>
          link1
        </MenuItem>
        <MenuItem disabeld>
          link2
        </MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>
            dropdown1
          </MenuItem>
          <MenuItem>
            dropdown2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          link3
        </MenuItem>
      </Menu>
      <Button size="lg" onClick={() => { setShow(!show)}} > Toggle </Button>
      <Transition
        in={show}
        timeout={300}
        animation='zoom-in-left'
      >
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
      </Transition>
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-top"
        wrapper
      >
        <Button btnType="primary" size="lg">A Large Button </Button>
      </Transition>
      <br/>
      <Button>hello</Button>
      <Button disabled>disabled</Button>
      <Button btnType='primary' size='lg'>large</Button>
      <Button btnType='danger' size='sm'>small</Button>
      <Button btnType='link' href="www.baidu.com">baidu link</Button>
      <Button btnType='link' href="www.baidu.com" disabled>baidu link disabled</Button>
    </div>
  );
}

export default App;
