import json
import base64
import os
import re

def slugify(text):
    text = str(text).lower()
    return re.sub(r'[\W_]+', '-', text).strip('-')

def fix_json_content(content):
    # Remove trailing commas in objects
    content = re.sub(r',(\s*})', r'\1', content)
    # Remove trailing commas in lists
    content = re.sub(r',(\s*])', r'\1', content)
    return content

def fix_base64_padding(data):
    return data + '=' * (-len(data) % 4)

def process_file(filepath):
    print(f"Processing {filepath}...")
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # Attempt to fix common JSON syntax errors
        content = fix_json_content(content)

        data = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON in {filepath}: {e}")
        # print(f"Context: {content[e.pos-20:e.pos+20]}")
        return

    modified = False

    # Traverse the data to find lists of items
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, list):
                if process_list(value):
                    modified = True
    elif isinstance(data, list):
        if process_list(data):
            modified = True

    if modified:
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")

def process_list(items):
    modified = False
    for item in items:
        if not isinstance(item, dict):
            continue

        logo_data = item.get('logo')
        if logo_data and isinstance(logo_data, str) and logo_data.startswith('data:image'):
            # Extract mime type and base64 data
            # Handle potential newlines or spaces in base64 string
            logo_data = logo_data.replace('\n', '').replace('\r', '')
            match = re.match(r'data:image/(?P<ext>\w+);base64,(?P<data>.+)', logo_data)
            if match:
                ext = match.group('ext')
                b64_data = match.group('data')

                # Fix padding
                b64_data = fix_base64_padding(b64_data)

                # Get a name for the file
                name = item.get('title') or item.get('name') or 'unknown'
                filename = slugify(name) + '.' + ext
                # Handle filename collisions? simplistic for now
                image_path = os.path.join('images', filename)

                # Save image
                try:
                    with open(image_path, 'wb') as img_f:
                        img_f.write(base64.b64decode(b64_data))

                    # Update JSON
                    item['logo'] = image_path
                    modified = True
                    print(f"Extracted image for {name} to {image_path}")
                except Exception as e:
                    print(f"Failed to save image for {name}: {e}")
            else:
                print(f"Could not parse data URI for {item.get('title') or item.get('name')}")
    return modified

def main():
    files = [
        'jeux_2025.json',
        'Sorties2025',
        'consoles',
        'online',
        'sorties_2025-2026.json',
        'sport.json',
        'strategie.json'
    ]

    for filename in files:
        if os.path.exists(filename):
            process_file(filename)
        else:
            print(f"File {filename} not found.")

if __name__ == "__main__":
    main()
