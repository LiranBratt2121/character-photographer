FROM python:3.12

ENV PYTHONUNBUFFERED=true
ENV APP_HOME=/backend
ENV PORT=8080
ENV XDG_CACHE_HOME=/backend/cache 

WORKDIR $APP_HOME
COPY . ./

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# # Preload rembg model by running it once
# RUN python -c "from rembg import remove; import PIL.Image as Image; remove(Image.new('RGBA', (1, 1), (255, 255, 255, 255)))"

# Use shell form for CMD to enable environment variable substitution
CMD exec gunicorn --bind "0.0.0.0:$PORT" --workers 1 --threads 8 --timeout 0 main:app
