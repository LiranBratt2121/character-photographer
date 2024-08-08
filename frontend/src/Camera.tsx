import React, { useRef, useCallback, useState } from "react";
import { isMobile } from "react-device-detect";
import Webcam from "react-webcam";
import AssetDisplay from "./components/AssetDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const videoConstraints: MediaStreamConstraints["video"] = {
  width: isMobile ? 640 : 1280,
  height: isMobile ? 480 : 720,
  facingMode: isMobile ? "environment" : "user",
};

interface CameraProps {
  onImageCapture: (imageSrc: string) => void;
  hebrewCharacter: string;
}

const Camera: React.FC<CameraProps> = ({ onImageCapture, hebrewCharacter }) => {
  const [isCameraReady, setCameraReady] = useState(false);

  const webCamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    if (!isCameraReady) {
      alert('המצלמה עדיין לא מוכנה');
      return;
    }

    const imageSrc = webCamRef.current?.getScreenshot();
    if (imageSrc) {
      const base64Data = imageSrc.replace(/^data:image\/png;base64,/, '');
      onImageCapture(base64Data);
    }
  }, [webCamRef, onImageCapture, isCameraReady]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark position-relative">
      <div className="position-absolute top-50 start-50 translate-middle z-index-10">
        {isCameraReady && (
          <AssetDisplay hebrewCharacter={hebrewCharacter} />
        )}
      </div>
      <Webcam
        className="w-100 max-w-sm rounded-3 shadow-lg"
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        ref={webCamRef}
        screenshotQuality={0.3}
        onUserMedia={() => setCameraReady(true)}
        onUserMediaError={() => setCameraReady(false)}
      />
      <button
        className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center position-absolute bottom-0 mb-4"
        style={{
          width: '80px',
          height: '80px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: '24px',
          zIndex: 1000,
        }}
        onClick={capture}
        disabled={!isCameraReady}
      >
      <FontAwesomeIcon icon={faCamera} style={{ color: '#FFA500' }}/>
      </button>
      {!isCameraReady && <p className="text-light">המצלמה עדיין לא מוכנה...</p>}
    </div>
  );
}

export default Camera;
