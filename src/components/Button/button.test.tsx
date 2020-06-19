import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'ccy'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('测试Button组件', () => {
  it ('渲染正确的默认按钮', () => {
    const wrapper = render(<Button {...defaultProps}>hi</Button>);
    const ele = wrapper.getByText('hi') as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('BUTTON');
    expect(ele).toHaveClass('btn btn-default');
    expect(ele.disabled).toBeFalsy();
    fireEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
  }) 
  it ('根据不同的props渲染不同的样式', () => {
    const wrapper = render(<Button {...testProps}>hi</Button>);
    const ele = wrapper.getByText('hi');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('btn-primary btn-lg ccy');
  })
  it ('渲染成a标签，当提供link和href属性时', () => {
    const wrapper = render(<Button btnType='link' href="http://chenchunyang.site">Link</Button>);
    const ele = wrapper.getByText('Link');
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('A');
    expect(ele).toHaveClass('btn btn-link');
  })
  it ('渲染disabled的样式', () => {
    const wrapper = render(<Button {...disabledProps}>hi</Button>);
    const ele = wrapper.getByText('hi') as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.disabled).toBeTruthy();
    fireEvent.click(ele);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})