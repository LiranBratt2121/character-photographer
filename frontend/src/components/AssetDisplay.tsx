import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import useSound from 'use-sound';
import { hebrewAudioContainer, hebrewPhotoContainer, hebrew2english } from '../assets/AssetLogic';

interface PhotoDisplayProps {
  hebrewCharacter: string;
}

const AssetDisplay: React.FC<PhotoDisplayProps> = ({ hebrewCharacter }) => {
  const [show, setShow] = useState(false);

  const englishCharacter = hebrew2english[hebrewCharacter]
  const hebrewAudio = hebrewAudioContainer[englishCharacter]
  const hebrewPhoto = hebrewPhotoContainer[englishCharacter] 

  const animationProps = useSpring({
    transform: show ? 'scale(1)' : 'scale(0)',
    config: { tension: 280, friction: 20 },
  });

  const [play] = useSound(hebrewAudio, {
    onend: () => setShow(false),
  });

  useEffect(() => {
    if (hebrewPhoto) {
      setShow(true);
      play();
    }
  }, [play]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <animated.img
        src={hebrewPhoto}
        alt="Displayed"
        style={animationProps}
        className="img-fluid"
      />
    </div>
  );
};

export default AssetDisplay;