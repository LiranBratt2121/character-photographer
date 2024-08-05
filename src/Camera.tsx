import { useRef, useCallback } from "react";
import { isMobile } from "react-device-detect";
import Webcam from "react-webcam";

const videoConstraints: MediaStreamConstraints["video"] = {
  width: isMobile ? 640 : 1280,
  height: isMobile ? 480 : 720,
  facingMode: isMobile ? "environment" : "user",
};

interface CameraProps {
  OnImageCapture: (imageSrc: string) => void;
}

const Camera: React.FC<CameraProps> = ({OnImageCapture}) => {
  const webCamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webCamRef.current?.getScreenshot();
    OnImageCapture(imageSrc ?? "");
  }, [webCamRef, OnImageCapture]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark">
      <Webcam
        className="w-100 max-w-sm rounded-3 shadow-lg"
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        ref={webCamRef}
      />
      <button className="btn btn-primary" onClick={capture}>
        צלם תמונה
      </button>
    </div>
  );
}

export default Camera;
