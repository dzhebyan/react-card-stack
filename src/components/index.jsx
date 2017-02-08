import React from 'react';
import CardsStackRender from '../components-styled';

const propTypes = {
  cardHeight: React.PropTypes.number,
  cards: React.PropTypes.array,
  children: React.PropTypes.func.isRequired,
  isCardVisible: React.PropTypes.func,
  minHeight: React.PropTypes.number,
  selectedCardIndex: React.PropTypes.number,
  transitionTime: React.PropTypes.number,
  visibleAreaHeight: React.PropTypes.number,
};

const defaultProps = {
  cardHeight: 234,
  cards: [],
  transitionTime: 0.3,
  visibleAreaHeight: 50,
};

export default class StackCards extends React.Component {

  getCalculatedHeight(filteredCards, selectedCardIndex) {
    const { cardHeight, visibleAreaHeight } = this.props;
    const cardBody = cardHeight - visibleAreaHeight;
    const numberOfCards = filteredCards.length;
    if (this.isLastCard(filteredCards, selectedCardIndex)) {
      return numberOfCards * visibleAreaHeight + cardBody;
    }
    return numberOfCards * visibleAreaHeight + 2 * cardBody;
  }

  getCalculatedShift(transformYShift, index, selectedCardIndex) {
    const { cardHeight } = this.props;
    if (index <= selectedCardIndex) {
      return transformYShift * index;
    }
    return transformYShift * (index - 1) + cardHeight;
  }

  isLastCard(cards, index) {
    const numberOfCards = cards.length;
    return index === (numberOfCards - 1);
  }

  renderCards(cards, selectedCardIndex) {
    const { isCardVisible, visibleAreaHeight, children } = this.props;
    return cards.map((cardItem, index) => {
      const cardShift = this.getCalculatedShift(visibleAreaHeight, index, selectedCardIndex);
      const isVisible = isCardVisible ? isCardVisible(index, cardShift) : true;
      if (!isVisible) {
        return null;
      }
      return children(cardItem, index, cardShift);
    });
  }

  render() {
    const { cards, minHeight, selectedCardIndex, transitionTime } = this.props;
    const cardsHeight = this.getCalculatedHeight(cards, selectedCardIndex);
    const containerHeight = minHeight !== undefined && cardsHeight < minHeight
      ? minHeight
      : cardsHeight;
    const style = {
      height: `${containerHeight}px`,
      transition: `height ${transitionTime}s`,
    };
    return (
      <CardsStackRender style={style} >
        {this.renderCards(cards, selectedCardIndex)}
      </CardsStackRender>
    );
  }
}

StackCards.propTypes = propTypes;
StackCards.defaultProps = defaultProps;
