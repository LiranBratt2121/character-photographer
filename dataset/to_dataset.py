import os
from edgeprocessor import FrequencyEdgeProcessor
import cv2
from pathlib import Path
import numpy as np

hebrew_to_translit = {
    'א': 'alef', 'ב': 'bet', 'ג': 'gimel', 'ד': 'dalet', 'ה': 'he', 'ו': 'vav', 
    'ז': 'zayin', 'ח': 'het', 'ט': 'tet', 'י': 'yod', 'כ': 'kaf', 'ל': 'lamed', 
    'מ': 'mem', 'נ': 'nun', 'ס': 'samekh', 'ע': 'ayin', 'פ': 'pe', 'צ': 'tsadi', 
    'ק': 'qof', 'ר': 'resh', 'ש': 'shin', 'ת': 'tav'
}

def translate_folder_name(hebrew_name):
    return ''.join([hebrew_to_translit.get(letter, letter) for letter in hebrew_name])

def get_subdirs(path: Path):
    return [d for d in path.iterdir() if d.is_dir()]

def process_images(input_path: str, output_path: str):
    # Convert string paths to Path objects
    input_path = Path(input_path)
    output_path = Path(output_path)
    
    # Create processor
    processor = FrequencyEdgeProcessor()
    
    # Ensure the output path exists
    output_path.mkdir(exist_ok=True)
    
    print("Starting processing...")
    
    for subdir in get_subdirs(input_path):
        hebrew_name = subdir.name
        english_name = translate_folder_name(hebrew_name)
        where2save = output_path / english_name
        where2save.mkdir(exist_ok=True)
        
        # Get all image files in the directory
        image_files = [f for f in subdir.glob('*') if f.suffix.lower() in {'.jpg', '.jpeg', '.png', '.bmp'}]
        
        for idx, file_path in enumerate(image_files):
            try:
                # Use str(file_path) to get the proper Unicode path
                mat = cv2.imdecode(
                    np.fromfile(file_path, dtype=np.uint8),
                    cv2.IMREAD_COLOR
                )
                
                if mat is None:
                    print(f"Warning: Could not read image {file_path}. Skipping...")
                    continue
                
                processed = processor.process_image(mat)
                
                # Save processed image using imencode
                save_path = where2save / f"processed_{idx}{file_path.suffix}"
                is_success, buffer = cv2.imencode(file_path.suffix, processed)
                if is_success:
                    with open(save_path, 'wb') as f:
                        f.write(buffer)
                else:
                    print(f"Warning: Could not save image {save_path}")
                
            except Exception as e:
                print(f"Error processing {file_path}: {str(e)}")
        
        print(f'Done processing folder: {english_name}')
    
    print("Processing completed.")

if __name__ == "__main__":
    input_path = r'dataset\Tap2tell-letters'
    output_path = r'Translated_Letters'
    process_images(input_path, output_path)