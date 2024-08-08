import React, { useRef, useCallback } from "react";
import { isMobile } from "react-device-detect";
import Webcam from "react-webcam";

const videoConstraints: MediaStreamConstraints["video"] = {
  width: isMobile ? 640 : 1280,
  height: isMobile ? 480 : 720,
  facingMode: isMobile ? "environment" : "user",
};

interface CameraProps {
  onImageCapture: (imageSrc: string) => void;
}

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
  }, [webCamRef, onImageCapture]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark">
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
      <button className="btn btn-primary" onClick={capture}>
        צלם תמונה
      </button>
      {!isCameraReady && <p className="text-light">המצלמה עדיין לא מוכנה...</p>}
    </div>
  );
}

export default Camera;