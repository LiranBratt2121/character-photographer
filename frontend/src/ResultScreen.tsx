import React, { useEffect } from 'react';
import useSound from 'use-sound';
import useProcessImage, { ProcessImageProps } from './hooks/useProcessImage';
import { containerStyle, headerStyle, textStyle, selectedCharacterStyle, buttonStyle, imageStyle } from './styles';
import { feedbackAudio } from '../src/assets/AssetLogic'

interface ResultScreenProps {
  image: string;
  character: string;
  onBack: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ image, character, onBack }) => {
  const props: ProcessImageProps = {
    imageString64: image,
    true_character: character,
    host: '127.0.0.1',
    port: '8080',
    endPoint: 'process_image',
    args: 'backend-892865752857.europe-central2.run.app'
  };

  const { data, loading, error, processImage } = useProcessImage(props);

  const [playSuccess] = useSound(feedbackAudio.success);
  // const [playFailure] = useSound(feedbackAudio.failure);
  const [playFailure] = useSound(feedbackAudio.success);

  const isRight = () => {
      if (data && data.result) {
        return data.result.true_character === data.result.detected_character;
      }
      return false
  }

  useEffect(() => {
    const process = async () => {
      await processImage();
    }
    process()
  }, []);

  useEffect(() => {
    isRight() ? playSuccess() : playFailure()
  }, [data, data?.result])

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
