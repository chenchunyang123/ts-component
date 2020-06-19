import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import '../src/styles/index.scss';
import './fix_table_bug.scss';

configure(require.context('../src', true, /\.stories\.tsx$/), module);

// const styles: React.CSSProperties = {
//   textAlign: 'center',
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

// addDecorator(CenterDecorator);