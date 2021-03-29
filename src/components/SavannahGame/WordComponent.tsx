import React, { Component } from 'react';

interface WordComponentProps {
  currentWord: string;
}

class WordComponent extends Component<WordComponentProps> {
  render(): JSX.Element {
    const { currentWord } = this.props;

    return (
      <>
        <div className="game-word">{currentWord}</div>
      </>
    );
  }
}

export default WordComponent;
