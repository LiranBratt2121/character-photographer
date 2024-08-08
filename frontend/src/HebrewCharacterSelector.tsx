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
}

const HebrewCharacterSelector: React.FC<HebrewCharacterSelectorProps> = ({ 
  selectedCharacter, 
  onCharacterSelect, 
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
    </div>
  );
};

export default HebrewCharacterSelector;