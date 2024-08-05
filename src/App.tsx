import React, { useState } from "react";
import Camera from "./Camera";
import HebrewCharacterSelector from "./HebrewCharacterSelector";
import ResultScreen from "./ResultScreen";

const App: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
  };

  const handleCameraOpen = (open: boolean) => {
    setIsCameraOpen(open);
  };

  const handleOnImageCapture = (imageString: string) => {
    setImg(imageString);
    setIsCameraOpen(false);
  };

  const handleBackToSelector = () => {
    setImg("");
    setSelectedCharacter("");
  };

  return (
    <div>
      {img && selectedCharacter ? (
        <ResultScreen 
          image={img} 
          character={selectedCharacter} 
          onBack={handleBackToSelector} 
        />
      ) : isCameraOpen ? (
        <Camera OnImageCapture={handleOnImageCapture} />
      ) : (
        <HebrewCharacterSelector 
          onCharacterSelect={handleCharacterSelect} 
          onOpenCamera={handleCameraOpen} 
        />
      )}
    </div>
  );
};

export default App;
