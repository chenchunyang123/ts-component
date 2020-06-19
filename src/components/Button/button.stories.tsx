import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Button from './button';

const defaultButton = () => (
  <Button onClick={action('clicked')}>
    default Button
  </Button>
)

const buttonWithSize = () => (
  <div>
    <Button size='lg'>large button</Button>
    <Button size='sm'>small button</Button>
  </div>
)

const buttonWithType = () => (
  <div>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href='https://google.com'>link button</Button>
  </div>
)

storiesOf('按钮', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: '这是一个按钮组件'
    }
  })
  .add('默认按钮', defaultButton)
  .add('不同尺寸的button', buttonWithSize)
  .add('不同类型的button', buttonWithType)