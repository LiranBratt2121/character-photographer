import React from "react";
import { containerStyle, headerStyle, characterContainerStyle } from "./styles";
import { hebrewCharacters } from "./assets/AssetLogic";
import CharacterSpan from "./components/CharacterSpan";

export interface HebrewCharacterSelectorProps {
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
          <CharacterSpan
            hebrewCurrentCharacter={character}
            selectedCharacter={selectedCharacter}
            onCharacterSelect={onCharacterSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default HebrewCharacterSelector;
