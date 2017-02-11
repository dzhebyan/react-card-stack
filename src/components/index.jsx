import React from 'react';
import CardContainer from '../components-styled/CardContainer';
import CardsStackRender from '../components-styled/CardsStackRender';

const propTypes = {
  cardHeight: React.PropTypes.number,
  cards: React.PropTypes.array,
  children: React.PropTypes.func.isRequired,
  containerHeightLimit: React.PropTypes.number,
  isCardVisible: React.PropTypes.func,
  selectedIndex: React.PropTypes.number.isRequired,
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

  constructor(props) {
    super(props);
    this.state = {
      selectedCardIndex: props.selectedIndex,
    };
    this.onCardSelect = this.onCardSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { cards, selectedIndex } = this.props;
    // reset state when new list of cards coming
    if (cards !== nextProps.cards) {
      this.setState({ selectedCardIndex: nextProps.selectedIndex });
    }
    // reset state when new default card index is set
    if (selectedIndex !== nextProps.selectedIndex) {
      this.setState({ selectedCardIndex: nextProps.selectedIndex });
    }
  }

  onCardSelect(selectedCardIndex) {
    this.setState({ selectedCardIndex });
  }

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
    return index === cards.length - 1;
  }

  renderCards(cards, selectedCardIndex) {
    const { children, isCardVisible, transitionTime, visibleAreaHeight } = this.props;
    return cards.map((cardItem, index) => {
      const cardShift = this.getCalculatedShift(visibleAreaHeight, index, selectedCardIndex);
      const isVisible = isCardVisible ? isCardVisible(index, cardShift) : true;
      if (!isVisible) {
        return null;
      }
      const style = {
        zIndex: index,
        transform: `translate3d(0px, ${cardShift}px, 0px)`,
        transition: `transform ${transitionTime}s`,
      };
      return (
        <CardContainer
          key={`card-index-${index}`}
          style={style}
          onClick={() => { this.onCardSelect(index); }}
        >
          {children(cardItem, index)}
        </CardContainer>
      );
    });
  }

  render() {
    const { cards, containerHeightLimit, transitionTime } = this.props;
    const { selectedCardIndex } = this.state;
    const cardsHeight = this.getCalculatedHeight(cards, selectedCardIndex);
    // fulfill empty space as part of this component
    const containerHeight = containerHeightLimit !== undefined && cardsHeight < containerHeightLimit
      ? containerHeightLimit
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
