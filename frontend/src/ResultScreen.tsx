import React, { useEffect } from 'react';
import useProcessImage, { ProcessImageProps } from './hooks/useProcessImage';
import { containerStyle, headerStyle, textStyle, selectedCharacterStyle, buttonStyle, imageStyle } from './styles';

interface ResultScreenProps {
  image: string;
  character: string;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ image, character, onBack }) => {
  const props: ProcessImageProps = {
    imageString64: image,
    true_character: character,
    host: '10.0.0.8',
    port: '5000',
    endPoint: 'process_image'
  };

  const { data, loading, error, processImage } = useProcessImage(props);

  useEffect(() => {
    processImage();
  }, []);

  const base64path = 'data:image/${format};base64,';
  
  return (
    <div style={containerStyle}>
      <p style={headerStyle}>
        האות שבחרת היא: <span style={selectedCharacterStyle}>{character}</span>
      </p>

      {loading && <p style={textStyle}>...מעבד את התמונה</p>}
      {error && <p style={textStyle}>שגיאה: {error}</p>}
      {data && data.result && (
        <div style={{ textAlign: 'center' }}>
          <p style={textStyle}>האות שזוהה: {data.result.detected_character}</p>
          <img src={base64path + data.result.og_image} alt="מקורי" style={imageStyle} />
          <p style={textStyle}>חותם זמן מהשרת: {data.result.server_time_stamp}</p>
        </div>
      )}

      <button style={buttonStyle} onClick={onBack}>
        חזור
      </button>
    </div>
  );
};

export default ResultScreen;
