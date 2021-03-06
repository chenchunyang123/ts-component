import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabeld?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabeld, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', classNames, {
    'is-disabled': disabeld,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabeld && (typeof index === 'string')) {
      context.onSelect(index);
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;