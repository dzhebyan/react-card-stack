import React from 'react';
import { Text } from 'react-native';

const propTypes = {
  cardHeight: React.PropTypes.number,
  cards: React.PropTypes.array,
  children: React.PropTypes.func.isRequired,
  containerHeightLimit: React.PropTypes.number,
  isCardVisible: React.PropTypes.func,
  selectedIndex: React.PropTypes.number.isRequired,
  transitionTime: React.PropTypes.number,
  visibleAreaHeight: React.PropTypes.number,
  onCardSelect: React.PropTypes.func,
};

const defaultProps = {
  cardHeight: 234,
  cards: [],
  transitionTime: 0.3,
  visibleAreaHeight: 50,
};

export default class StackCards extends React.Component {

  render() {
    return (
      <Text>Cards</Text>
    );
  }
}

StackCards.propTypes = propTypes;
StackCards.defaultProps = defaultProps;
