import requests
import json
import os
import subprocess

# Credentials depuis env (ajoutez-les à GitHub Secrets)
CLIENT_ID = os.getenv('IGDB_CLIENT_ID')
CLIENT_SECRET = os.getenv('IGDB_CLIENT_SECRET')
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

def get_token():
    response = requests.post(
        'https://id.twitch.tv/oauth2/token',
        params={
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'client_credentials'
        }
    )
    return response.json()['access_token']

def fetch_releases(token):
    headers = {
        'Client-ID': CLIENT_ID,
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json'
    }
    # Filtre pour post-août 2025 à 2026
    body = 'fields game.name, game.cover.url, game.url, date, platform.name; where date > 1743465600 & date < 1798761600; sort date asc; limit 500;'
    response = requests.post('https://api.igdb.com/v4/release_dates', headers=headers, data=body)
    return response.json()

def update_json(data):
    releases = []
    for item in data:
        platforms = [p['name'] for p in item.get('platform', [])]
        image_url = item.get('game', {}).get('cover', {}).get('url', '') if 'cover' in item.get('game', {}) else ''
        releases.append({
            'title': item['game']['name'],
            'date': item['date'],  # Timestamp, convertissez si besoin
            'platforms': platforms,
            'url': item['game'].get('url', ''),
            'image': f'https:{image_url}' if image_url else ''
        })
    with open('sorties_2025-2026.json', 'w', encoding='utf-8') as f:
        json.dump(releases, f, ensure_ascii=False, indent=4)

def git_push():
    subprocess.run(['git', 'add', 'sorties_2025-2026.json'])
    subprocess.run(['git', 'commit', '-m', 'Mise à jour automatique des sorties 2025-2026'])
    subprocess.run(['git', 'push', 'origin', 'main'])

if __name__ == '__main__':
    token = get_token()
    data = fetch_releases(token)
    update_json(data)
    git_push()
