import os
import json
import base64
import hashlib
import re

def optimize_images():
    files = [f for f in os.listdir('.') if f.endswith('.json')]

    for filename in files:
        print(f"Processing {filename}...")
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()

            # Sanitize trailing commas
            content = re.sub(r',(\s*?[\]}])', r'\1', content)

            try:
                data = json.loads(content)
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON in {filename}: {e}")
                continue

            updated = False

            def process_value(val):
                nonlocal updated
                if isinstance(val, str) and val.startswith('data:image/'):
                    try:
                        header, encoded = val.split(',', 1)
                        # Extract extension
                        ext = header.split(';')[0].split('/')[1]
                        if ext == 'jpeg':
                            ext = 'jpg'

                        # Fix padding if necessary
                        missing_padding = len(encoded) % 4
                        if missing_padding:
                            encoded += '=' * (4 - missing_padding)

                        image_data = base64.b64decode(encoded)
                        md5_hash = hashlib.md5(image_data).hexdigest()
                        image_filename = f"{md5_hash}.{ext}"
                        image_path = os.path.join('images', image_filename)

                        if not os.path.exists(image_path):
                            with open(image_path, 'wb') as img_f:
                                img_f.write(image_data)
                            print(f"Saved {image_path}")

                        updated = True
                        return image_path
                    except Exception as e:
                        print(f"Failed to process image in {filename}: {e}")
                        return val
                elif isinstance(val, dict):
                    for k, v in val.items():
                        val[k] = process_value(v)
                    return val
                elif isinstance(val, list):
                    for i in range(len(val)):
                        val[i] = process_value(val[i])
                    return val
                else:
                    return val

            data = process_value(data)

            if updated:
                with open(filename, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=4, ensure_ascii=False)
                print(f"Updated {filename}")
            else:
                print(f"No changes for {filename}")

        except Exception as e:
            print(f"Error processing file {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
