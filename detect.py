import os
from PIL import Image

seq_dir = "public/sequence"
frames = [f for f in os.listdir(seq_dir) if f.endswith(".png")]
frames.sort()

results = []
for f in frames:
    img_path = os.path.join(seq_dir, f)
    with Image.open(img_path) as img:
        img = img.convert('RGB')
        # Resize small to evaluate faster
        img = img.resize((100, 100))
        data = img.getdata()
        
        # Lightning color mask (cyan/white high intensity)
        lightning_pixels = 0
        for r, g, b in data:
            if r > 150 and g > 200 and b > 230:
                lightning_pixels += 1
                
        results.append((f, lightning_pixels))

results.sort(key=lambda x: int(x[0].split('_')[1]))

print("Frames with highest cyan/white (lightning) pixel count:")
for f, count in results:
    if count > 0:
        print(f"{f}: {count} lightning pixels")
