import React, { useState } from 'react';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import Card from './../../components/Card/Card';

export const DictionaryDeleted: React.FC = () => {
  const { words } = useTypeSelector((state) => state.book);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { wordsSettings } = useTypeSelector((state) => state.userWords);
  console.log('66666', new Array(...wordsSettings));
  return (
    <>
      <h1>Dictionary Deleted</h1>
      <div className="dictionary-cards-wrapper">
        {words.map((elem) => {
          return (
            wordsSettings.has(elem.id) &&
            wordsSettings.get(elem.id).difficulty === 'delete' && (
              <Card key={elem.id} data={elem} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />
            )
          );
        })}
      </div>
    </>
  );
};
