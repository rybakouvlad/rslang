import React, { Component } from 'react';

interface CasesProps {
  currentWord: { word: string; wordTranslate: string };
  answers: string[];
  newRound: (index: number, isAnswerCorrect: boolean) => void;
  index: number;
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

  render(): JSX.Element {
    const { answers } = this.props;

    return (
      <div className="game-answers">
        {answers.map((translateWord, index) => {
          const buttonName = `${index + 1}. ${translateWord}`;
          return (
            <button className='btn-answer' key={index} data-answer={translateWord} onClick={() => this.handleClick(translateWord)}>
              {buttonName}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Cases;
