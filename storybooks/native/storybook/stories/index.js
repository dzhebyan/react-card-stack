import React from 'react';
import { StatusBar, View } from 'react-native';
import { storiesOf } from '@kadira/react-native-storybook';
import Example from './Example';

storiesOf('Examples', module)
  .add('4 cards', () => (
    <View>
      <StatusBar hidden />
      <Example />
    </View>
  ));
