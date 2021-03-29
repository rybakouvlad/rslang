import React, { Component } from 'react';

interface LifesProps {
  lifesCounter: number;
}

class Lifes extends Component<LifesProps> {
  constructor(props: LifesProps) {
    super(props);
  }
  render() {
    const { lifesCounter } = this.props;
    return (
      <>
        <div className="game-lifes">
          <div>Lifes:</div>
          <div>{lifesCounter}/5</div>
        </div>
      </>
    );
  }
}

export default Lifes;
