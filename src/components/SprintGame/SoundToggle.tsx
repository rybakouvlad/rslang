import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';

export const SoundToggle = () => {
  const { setIsPlaySound } = useSprintGame();

  return (
    <ToggleButtonGroup className="sprint-sound" type="radio" name="options" defaultValue="true">
      <ToggleButton onClick={() => setIsPlaySound(true)} variant="info" value="true">
        Звук вкл
      </ToggleButton>
      <ToggleButton onClick={() => setIsPlaySound(false)} variant="info" value="false">
        Звук выкл
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
