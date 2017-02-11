import React from 'react';
import StackCards from 'react-card-stack';

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
    };
  }

  addCard() {
    this.setState({ cards: [...this.state.cards, { id: this.state.cards.length }] });
  }

  render() {
    const CARD_TRANSITION = 0.3;
    return (
      <div>
        <div onClick={() => { this.addCard(); }}>Add Card</div>
        <StackCards
          cardHeight={234}
          cards={this.state.cards}
          defaultSelectedIndex={this.state.cards.length - 1}
          transitionTime={CARD_TRANSITION}
          visibleAreaHeight={50}
        >
          {(cardItem) => {
            const style = {
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px 0px',
              height: 234,
              width: 400,
            };
            return (
              <div style={style} >
                {`Card ${cardItem.id}`}
              </div>
            );
          }}
        </StackCards>
      </div>
    );
  }
}
