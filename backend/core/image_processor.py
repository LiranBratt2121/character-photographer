import io
import os
from PIL import Image
import cv2
import numpy as np

class ImageProcessor:
    def __ensure_png_format(self, image_path: str) -> Image.Image:
        """Ensure the image is in PNG format, converting if necessary."""
        with Image.open(image_path) as input_image:
            if input_image.format != 'PNG':
                print(f"Converting {image_path} to PNG format...")
                with io.BytesIO() as temp_stream:
                    input_image.save(temp_stream, format='PNG')
                    temp_stream.seek(0)
                    input_image = Image.open(temp_stream).copy()
                print("Image converted to PNG format.")
            else:
                input_image = input_image.copy()
        return input_image

    def __convert_to_grayscale(self, image_np: np.ndarray) -> np.ndarray:
        """Convert the image to grayscale."""
        return cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

    def __apply_gaussian_blur(self, gray_image: np.ndarray) -> np.ndarray:
        """Apply Gaussian blur to reduce noise."""
        return cv2.GaussianBlur(gray_image, (5, 5), 0)

    def __apply_adaptive_threshold(self, blurred_image: np.ndarray) -> np.ndarray:
        """Apply adaptive thresholding to separate the foreground from the background."""
        return cv2.adaptiveThreshold(blurred_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY_INV, 11, 2)

    def __fill_contours(self, thresholded_image: np.ndarray, gray_image: np.ndarray) -> np.ndarray:
        """Find and fill contours."""
        contours, _ = cv2.findContours(thresholded_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        filled_image = np.ones_like(gray_image) * 255  # Create a white background
        cv2.drawContours(filled_image, contours, -1, (0), thickness=cv2.FILLED)  # Fill the contours with black
        return filled_image

    def __save_image(self, image_np: np.ndarray, output_path: str) -> None:
        """Save the processed image as a PNG file."""
        result_image = Image.fromarray(image_np)
        result_image.save(output_path)

    def process_image(self, input_path: str, save=False, output_path='images/output.png') -> Image.Image:
        """Process the image through the OpenCV pipeline and optionally save the result."""
        # Step 1: Load the image and ensure it's in PNG format
        image = self.__ensure_png_format(input_path)
        
        # Step 2: Convert the image to a NumPy array for OpenCV processing
        image_np = np.array(image)

        # Step 3: Apply grayscale conversion
        gray_image = self.__convert_to_grayscale(image_np)

        # Step 4: Apply Gaussian blur to the grayscale image
        blurred_image = self.__apply_gaussian_blur(gray_image)

        # Step 5: Apply adaptive thresholding
        thresholded_image = self.__apply_adaptive_threshold(blurred_image)

        # Step 6: Fill contours
        filled_image = self.__fill_contours(thresholded_image, gray_image)

        # Step 7: Optionally save the processed image
        if save:
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            self.__save_image(filled_image, output_path)

        # Convert the final NumPy array back to a PIL image and return it
        return Image.fromarray(filled_image)
 