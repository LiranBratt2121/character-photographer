from ultralytics import YOLO
from ultralytics.engine.results import Results

class YoloModel:
    def __init__(self, model_weights="weights/last.pt") -> None:
        self.model = YOLO(model_weights)

    def predict_class(self, image_path: str, conf=0.2) -> str:
        result = self.model.predict(source=image_path, conf=conf, verbose=False)[0]
        if not result.names: return 'Unknown'
        class_name = result.names.get(result.probs.top1, 'Unknown')
        return class_name
