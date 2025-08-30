import requests
import json
import os
import subprocess
import time

# Credentials depuis env
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
    # Filtre post-30 août 2025 à fin 2026
    current_ts = 1756598400  # Approx 30 août 2025
    end_ts = 1798761600  # 1er janv. 2027
    body = f'fields name, cover.url, first_release_date, summary, involved_companies.company.name, platforms.name, url; where first_release_date > {current_ts} & first_release_date < {end_ts}; sort first_release_date asc; limit 500;'
    response = requests.post('https://api.igdb.com/v4/games', headers=headers, data=body)
    return response.json()

def update_json(data):
    releases = []
    for item in data:
        cover_url = item.get('cover', {}).get('url', '')
        if cover_url:
            cover_url = f'https:{cover_url.replace("t_thumb", "t_cover_big")}'
        platforms = [p['name'] for p in item.get('platforms', [])]
        companies = [c['company']['name'] for c in item.get('involved_companies', [])]
        releases.append({
            'title': item.get('name', ''),
            'date': time.strftime('%Y-%m-%d', time.localtime(item.get('first_release_date', 0))),
            'summary': item.get('summary', ''),
            'companies': companies,
            'platforms': platforms,
            'url': item.get('url', ''),
            'image': cover_url
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
