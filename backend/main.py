from argparse import ArgumentParser
import os

from core.image_processor import ImageProcessor
from core.yolo_model import YoloModel
from api.server import Server

def run_server() -> None:
    print('Server starting to run...')
    server = Server()
    server.run()

def process_image(image_path) -> None:
    print('Loading models...')
    image_processor = ImageProcessor()
    yolo_model = YoloModel()
    os.mkdir('images') if not os.path.isdir('images') else None
    
    try:
        print('Processing image...')
        image_processor.process_image(image_path, save=True, output_path='images/output.png')
        
        detected_class = yolo_model.predict_class('images/output.png')
        print(f"Detected class: {detected_class}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == '__main__':
    parser = ArgumentParser(description="Run server or process an image.")
    parser.add_argument('command', choices=['run_server', 'process_image'], help="Choose operation to perform.")
    parser.add_argument('--image_path', type=str, default='example_images/test4.jpeg', help="Path to the image for processing (only for 'process_image' command).")

    args = parser.parse_args()

    if args.command == 'run_server':
        run_server()
    elif args.command == 'process_image':
        process_image(args.image_path)