import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = ( props: MenuProps ) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabeld>disabled</MenuItem>
      <MenuItem>ccy</MenuItem>
      <SubMenu title='nihao'>
        <MenuItem>hello</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .ccy-submenu {
      display: none;
    }
    .ccy-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
}

// 声明测试组件变量
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('测试Menu和MenuItem组件', () => {
  // 每次进入测试的时候都会经过
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());  // 插入css样式
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })
  it('正确地渲染Menu及MenuItem上的默认的props属性', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('ccy-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })
  it('点击MenuItem应该正确地变化，并且执行callback函数', () => {
    const thirdItem = wrapper.getByText('ccy');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  })
  it('当设置mode=vertical时应正确渲染竖向菜单样式', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })
  // SubMenu相关
  it('当鼠标hover到SubMenu上的时候需要展示子项', async () => {
    expect(wrapper.queryByText('hello')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('nihao');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {  // 解决hover时，有个人为设定的定时器，等待出现再断言
      expect(wrapper.queryByText('hello')).toBeVisible();
    })
    fireEvent.click(wrapper.getByText('hello'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('hello')).not.toBeVisible();
    })
  })
})