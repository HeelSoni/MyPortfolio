import os
from PIL import Image

def get_brightness(image_path):
    with Image.open(image_path) as img:
        img = img.convert('L') # Convert to grayscale
        stat = img.resize((50, 50)) # Shrink for speed
        pixels = list(stat.getdata())
        return sum(pixels) / len(pixels)

seq_dir = "public/sequence"
frames = [f for f in os.listdir(seq_dir) if f.endswith(".png")]
frames.sort()

results = []
for f in frames:
    b = get_brightness(os.path.join(seq_dir, f))
    results.append((f, b))

# Print top 10 brightest
results.sort(key=lambda x: x[1], reverse=True)
print("Top 15 brightest frames:")
for f, b in results[:15]:
    print(f"{f}: {b}")
