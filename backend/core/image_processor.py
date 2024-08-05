from rembg import remove
from PIL import Image

class ImageProcessor:
    def __remove_background(self, image_path: str) -> Image.Image:
        input_image = Image.open(image_path)
        output_image = remove(input_image)
        return output_image.convert("RGBA")

    def __manipulate_image(self, image: Image.Image) -> Image.Image:
        data = image.getdata()
        updated_image_data = [(0, 0, 0, 255) if item[3] > 0 else item for item in data]
        image.putdata(updated_image_data)
        return image.resize((640, 480))

    def __add_white_background(self, image: Image.Image) -> Image.Image:
        white_background = Image.new("RGBA", list(map(lambda s: s * 5, image.size)), (255, 255, 255, 255))
        white_background.paste(image, list(map(lambda s: s // 5, image.size)), image)
        return white_background

    def __save_image(self, image: Image.Image, output_path: str) -> None:
        image.save(output_path)

    def process_image(self, input_path: str, save=False, output_path='output.png') -> Image.Image:
        image = self.__remove_background(input_path)
        image = self.__manipulate_image(image)
        image = self.__add_white_background(image)

        if save:
            self.__save_image(image, output_path)
        
        return image