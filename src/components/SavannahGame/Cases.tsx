import React, { Component } from 'react';

interface CasesProps {
  currentWord: { word: string; wordTranslate: string };
  answers: string[];
  newRound: (index: number, isAnswerCorrect: boolean) => void;
  index: number;
  correctKey: number;
}

class Cases extends Component<CasesProps> {
  handleClick(selectedWord: string): void {
    const {
      newRound,
      index,
      currentWord: { wordTranslate },
    } = this.props;
    const isAnswerCorrect = selectedWord === wordTranslate;
    newRound(index + 1, isAnswerCorrect);
  }

  handleKeyUp = (key: string) => {
    const { correctKey, index, newRound } = this.props;
    const isAvailibleKey = ['1', '2', '3', '4'].includes(key);
    if (isAvailibleKey) {
      const isAnswerCorrect = correctKey === +key;
      newRound(index + 1, isAnswerCorrect);
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', ({ key }) => this.handleKeyUp(key));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', ({ key }) => this.handleKeyUp(key));
  }

  render(): JSX.Element {
    const { answers } = this.props;

    return (
      <div className="game-answers">
        {answers.map((translateWord, index) => {
          const buttonName = `${index + 1}. ${translateWord}`;
          return (
            <button key={index} data-answer={translateWord} onClick={() => this.handleClick(translateWord)}>
              {buttonName}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Cases;
