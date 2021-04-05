import React, { Component } from 'react';

interface WordComponentProps {
  currentWord: { word: string; wordTranslate: string };
}

class WordComponent extends Component<WordComponentProps> {
  render() {
    const {
      currentWord: { word },
    } = this.props;

    return (
      <>
        <div className="game-word contrast-color">{word}</div>
      </>
    );
  }
}

export default WordComponent;
