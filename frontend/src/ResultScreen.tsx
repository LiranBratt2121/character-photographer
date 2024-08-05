import React from 'react';

interface ResultScreenProps {
  image: string;
  character: string;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ image, character, onBack }) => {
  return (
    <div className="text-center">
      <p>האות שבחרת היא: <span>{character}</span></p>
      <div>
        <img src={image} alt="Captured" className="img-fluid" />
      </div>
      <button className="btn btn-primary mt-3" onClick={onBack}>
        חזור
      </button>
    </div>
  );
};

export default ResultScreen;