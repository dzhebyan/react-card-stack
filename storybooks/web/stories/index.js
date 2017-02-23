import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Example from './Example';

storiesOf('Examples', module)
  .add('4 cards', () => (
    <div>
      <style>
        {`html, body, #CardsApp {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          background-color: #eeeae5;
        }`}
      </style>
      <Example />
    </div>
  ));
