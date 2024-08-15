import React from "react";
import { HebrewCharacterSelectorProps } from "../HebrewCharacterSelector";
import { hebrew2english, hebrewPhotoContainer } from "../assets/AssetLogic";
import { characterStyle, photoCharacter, selectedStyle } from "../styles";

interface ChacterSpanProps extends HebrewCharacterSelectorProps {
  hebrewCurrentCharacter: string;
}

const CharacterSpan: React.FC<ChacterSpanProps> = ({
  hebrewCurrentCharacter,
  selectedCharacter,
  onCharacterSelect,
}) => {
  const currentEnglishCharacter = hebrew2english[hebrewCurrentCharacter];
  const currentPhoto = hebrewPhotoContainer[currentEnglishCharacter];

  return (
    <span
      key={hebrewCurrentCharacter}
      style={
        selectedCharacter === hebrewCurrentCharacter
          ? selectedStyle
          : characterStyle
      }
      onClick={() => onCharacterSelect(hebrewCurrentCharacter)}
    >
      <img src={currentPhoto} alt={currentEnglishCharacter} style={photoCharacter}/>
    </span>
  );
};

export default CharacterSpan;
