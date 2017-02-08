import React from 'react';
import StackCards from 'react-card-stack';

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCardId: 4,
    };
    this.onCardSelect = this.onCardSelect.bind(this);
  }

  onCardSelect(selectedCardId) {
    this.setState({
      selectedCardId,
    });
  }

  render() {
    const CARD_TRANSITION = 0.3;
    return (
      <StackCards
        cardHeight={234}
        cards={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
        selectedCardIndex={this.state.selectedCardId}
        transitionTime={CARD_TRANSITION}
        visibleAreaHeight={50}
      >
        {(cardItem, index, cardShift) => {
          const style = {
            backgroundColor: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px 0px',
            height: 234,
            position: 'absolute',
            transform: `translate3d(0px, ${cardShift}px, 0px)`,
            transition: `transform ${CARD_TRANSITION}s`,
            width: 400,
            zIndex: index,
          };
          return (
            <div
              key={`card-${cardItem.id}`}
              style={style}
              onClick={() => { this.onCardSelect(index); }}
            >
              {`Card ${cardItem.id}`}
            </div>
          );
        }}
      </StackCards>
    );
  }
}
