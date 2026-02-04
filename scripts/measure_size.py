import os

files = ['jeux_2025.json', 'sorties_2025-2026.json', 'Sorties2025', 'online', 'consoles']

total_size = 0
print(f"{'File':<25} | {'Size (bytes)':<15} | {'Size (KB)':<15}")
print("-" * 60)

for f in files:
    if os.path.exists(f):
        size = os.path.getsize(f)
        total_size += size
        print(f"{f:<25} | {size:<15} | {size/1024:<15.2f}")
    else:
        print(f"{f:<25} | {'NOT FOUND':<15} | {'-':<15}")

print("-" * 60)
print(f"{'TOTAL':<25} | {total_size:<15} | {total_size/1024:<15.2f}")
