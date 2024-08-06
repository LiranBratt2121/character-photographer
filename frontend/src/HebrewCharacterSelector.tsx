import React from 'react';
import { containerStyle, headerStyle, textStyle, characterContainerStyle, characterStyle, selectedStyle, selectedCharacterStyle } from './styles';

const hebrewCharacters = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
  'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר',
  'ש', 'ת'
];

interface HebrewCharacterSelectorProps {
  selectedCharacter: string;
  onCharacterSelect: (character: string) => void;
  onOpenCamera: () => void;
}

const HebrewCharacterSelector: React.FC<HebrewCharacterSelectorProps> = ({ 
  selectedCharacter, 
  onCharacterSelect, 
  onOpenCamera 
}) => {
  return (
    <div style={containerStyle}>
      <p style={headerStyle}>תבחר אות</p>
      <div style={characterContainerStyle}>
        {hebrewCharacters.map((character) => (
          <span
            key={character}
            style={selectedCharacter === character ? selectedStyle : characterStyle}
            onClick={() => onCharacterSelect(character)}
          >
            {character}
          </span>
        ))}
      </div>
      {selectedCharacter && (
        <div className="text-center">
          <p style={textStyle}>
            האות שבחרת לבנות היא:
            <span style={selectedCharacterStyle}>{' ' + selectedCharacter}</span>
          </p>
          <button className="btn btn-primary mx-auto d-block" onClick={onOpenCamera}>
            תפתח מצלמה
          </button>
        </div>
      )}
    </div>
  );
};

export default HebrewCharacterSelector;