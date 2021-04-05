import React from 'react';
import { SprintGameProvider } from 'Components/SprintGame/sprintGame.hook';
import { CheckPositionProvider } from '../../hooks/CheckPositionHook';
import { SprintGame } from 'Components/SprintGame/SprintGame';

export const SprintGameWrapper = () => {
  return (
    <>
      <SprintGameProvider>
        <CheckPositionProvider>
          <SprintGame />
        </CheckPositionProvider>
      </SprintGameProvider>
    </>
  );
};
