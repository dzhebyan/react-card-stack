import React from 'react';
import { Text } from 'react-native';

const propTypes = {
  cards: React.PropTypes.any,
  isCardVisible: React.PropTypes.func,
  minHeight: React.PropTypes.number,
  pageWidth: React.PropTypes.number.isRequired,
  selectedCardIndex: React.PropTypes.number,
  useMoreButton: React.PropTypes.bool,
  onCardSelect: React.PropTypes.func,
  onCardMoreClick: React.PropTypes.func,
  onCheckboxChange: React.PropTypes.func,
};

const defaultProps = {
  cards: [],
  isHardRender: true,
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
