import React from "react";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import HebrewCharacterSelector from "../HebrewCharacterSelector";
import Camera from "../Camera";
import ResultScreen from "../ResultScreen";

const AppContent: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [capturedImage, setCapturedImage] = useState<string>("");
  const navigate = useNavigate();

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setTimeout(handleOpenCamera, 1200)
  };

  const handleOpenCamera = () => {
    navigate("/camera");
  };

  const handleImageCapture = (imageString: string) => {
    setCapturedImage(imageString);
    navigate("/result");
  };

  const handleBackToSelector = () => {
    setSelectedCharacter("");
    setCapturedImage("");
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HebrewCharacterSelector
            selectedCharacter={selectedCharacter}
            onCharacterSelect={handleCharacterSelect}
          />
        }
      />
      <Route
        path="/camera"
        element={<Camera onImageCapture={handleImageCapture} hebrewCharacter={selectedCharacter}/>}
      />
      <Route
        path="/result"
        element={
          <ResultScreen
            image={capturedImage}
            character={selectedCharacter}
            onBack={handleBackToSelector}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppContent;
