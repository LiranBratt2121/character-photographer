from flask import Flask, request, jsonify, Response
from PIL import Image
import os

from core.image_processor import ImageProcessor
from core.yolo_model import YoloModel

class Server:
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.image_processor = ImageProcessor()
        self.yolo_model = YoloModel()

        self.__register_routes()

    def __register_routes(self) -> None:
        self.app.add_url_rule('/process_image', 'process_image', self.process_image, methods=['POST'])

    def process_image(self) -> Response:
        try:
            if 'image' not in request.files:
                return jsonify({'error': 'No file part'}), 400
            
            image_file: Image.Image = request.files['image']

            if image_file.filename == '':
                return jsonify({'error': 'No selected file'}), 400
            
            os.mkdir('images') if not os.path.isdir('images') else None
            image_path = 'images/uploaded_image.jpeg'  # Save uploaded image temporarily
            image_file.save(image_path)
            
            self.image_processor.process_image(image_path, save=True, output_path='images/output.png')
            detected_class = self.yolo_model.predict_class('images/output.png')
            
            return jsonify({'detected_class': detected_class})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def run(self):
        self.app.run(debug=True)

if __name__ == '__main__':
    server = Server()
    server.run()
