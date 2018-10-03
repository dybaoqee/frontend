import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Example', module)
  .add('basic example', () => (
    <button>Hello Button</button>
  ))
  .add('with some emoji', () => (
    <button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></button>
  ));
