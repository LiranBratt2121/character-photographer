from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError
from io import BytesIO
from datetime import datetime
from time import time
from random import random
from dotenv import  load_dotenv
import base64
import os

from core.image_processor import ImageProcessor
from core.yolo_model import YoloModel
from firebase.utils import save_to_firebase
from api.server_utils import english2hebrew

class Server:
    def __init__(self) -> None:
        load_dotenv()
        
        self.app = Flask(__name__)
        self.CORS = CORS(self.app)
        self.image_processor = ImageProcessor()
        self.yolo_model = YoloModel()
        self.__register_routes()
        print(os.environ.get('DEBUG'))
        print('Server initialized...')

    def __register_routes(self) -> None:
        self.app.add_url_rule('/process_image', 'process_image', self.process_image, methods=['POST'])
        self.app.add_url_rule('/test', 'test', self.test, methods=['GET'])

    def test(self) -> Response:
        return "hello world"
    
    def process_image(self) -> Response:
        try:
            if 'image_string' not in request.form:
                return jsonify({'error': 'No image_string part'}), 400
            if 'true_character' not in request.form:
                return jsonify({'error': 'No true_character part'}), 400

            image_64string: str = request.form.get('image_string', '')
            try:
                image = Image.open(BytesIO(base64.b64decode(image_64string)))
            except UnidentifiedImageError:
                return jsonify({'error': 'The image file could not be identified'}), 400

            try:
                os.makedirs('images', exist_ok=True)
                image_path = f'images/uploaded_image_{time() + random()}.png'  # Save uploaded image temporarily
                image.save(image_path)
                output_path = f'images/output_{time() + random()}.png'
                self.image_processor.process_image(image_path, save=True, output_path=output_path)
                detected_character = self.yolo_model.predict_class(output_path)
                processed_image = Image.open(output_path)
                processed_image_output = BytesIO()
                processed_image.save(processed_image_output, format='PNG')
                processed_image_64string = base64.b64encode(processed_image_output.getvalue()).decode()
                time_stamp = datetime.now().strftime('%Y-%m-%d_%H:%M:%S')
            except Exception as e:
                print(f'Processing error: {e}')
                return jsonify({'error': 'An error occurred during image processing'}), 500

            data = {
                'detected_character': english2hebrew.get(detected_character, detected_character),
                'true_character': request.form['true_character'],
                'og_image': image_64string,
                'processed_image': processed_image_64string,
                'server_time_stamp': time_stamp
            }
            
            save_to_firebase('images', time_stamp, data)

            # Clean up temporary files
            for path in [image_path, output_path]:
                if os.path.exists(path):
                    os.remove(path)

            return jsonify({'result': data})

        except Exception as e:
            print(f'Error: {e}')
            return jsonify({'error': 'An unexpected error occurred'}), 500

    def run(self):
        self.app.run(debug=int(os.environ.get('DEBUG')) == 1, port=int(os.environ.get('PORT', 8080)))
