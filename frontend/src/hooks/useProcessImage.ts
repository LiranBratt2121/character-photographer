import axios from 'axios';
import {useState} from 'react'

export interface ProcessImageProps {
    imageString64: string;
    true_character: string;
    host: string
    port: string
    endPoint: string
    args?: string
}

export type ProcessedImageResponse = {
    result? : {
        detected_character: string;
        true_character: string;
        og_image: string;
        processed_image: string;
        server_time_stamp: string;
    };
    error?: string
}

const useProcessImage = ({imageString64, true_character, host, port, endPoint, args}: ProcessImageProps) => {
  const [data, setData] = useState<ProcessedImageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image_string', imageString64);
    formData.append('true_character', true_character);

    const path = !args ? `http://${host}:${port}/${endPoint}` : `https://${args}/${endPoint}`
    console.log(path)
    try {
        const response = await axios.post(
            path,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        setData(response.data);
    }catch (error) {
        if (error instanceof Error){
            setError(error.message);
        }else {
            setError('An unknown error occurred');
        }

    }finally {
        setLoading(false);
    }
  }
  return {data, loading, error, processImage}
}

export default useProcessImage