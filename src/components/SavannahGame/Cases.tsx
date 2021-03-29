import React, { Component } from 'react';

interface CasesProps {
  answers: string[];
  newRound: (index: number) => void;
  index: number;
}

class Cases extends Component<CasesProps> {
  handleClick(target: any) {
    
    console.log(target);
    const { newRound, index } = this.props;

    newRound(index + 1);
  }

  render(): JSX.Element {
    const { answers } = this.props;

    return (
      <div className="game-answers">
        {answers.map((translateWord, index) => {
          const buttonName = `${index + 1}. ${translateWord}`;
          return (
            <button key={index} data-answer={translateWord} onClick={({ target }) => this.handleClick(target)}>
              {buttonName}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Cases;
