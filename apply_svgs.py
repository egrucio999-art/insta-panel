#!/usr/bin/env python3
"""
Заменяет Unicode-иконки в HTML/JS на точные SVG из instagram_svgs.json.
"""
import json
import re
from pathlib import Path

ROOT = Path.home() / "insta-panel"
SVGS_FILE = ROOT / "instagram_svgs.json"

# Маппинг: русский label → ключ
LABEL_MAP = {
    "Главная": "home",
    "Reels": "reels",
    "Сообщения": "messenger",
    "Поисковый запрос": "search",
    "Уведомления": "heart",
    "Новая публикация": "create",
    "Настройки": "settings",
    "Публикации": "grid",
    "Отметки": "tagged",
    "Instagram": "logo",
    "Кольцевая галерея": "ring",
}

def load_svgs():
    with open(SVGS_FILE) as f:
        svgs = json.load(f)
    mapped = {}
    for svg in svgs:
        label = svg.get("label", "")
        key = LABEL_MAP.get(label)
        if key and key not in mapped:
            mapped[key] = svg["html"]
    return mapped

def replace_in_file(path, svgs):
    with open(path) as f:
        content = f.read()

    # Замены для index.html
    replacements = {
        # topbar heart
        '<svg aria-label="Notifications" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>': svgs.get("heart", ""),
        # messenger
        '<svg aria-label="Messenger" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path></svg>': svgs.get("messenger", ""),
        # gear
        '<svg aria-label="Options" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2"></circle><path d="M12 1.5l1.5 3 3.3-.6.6 3.3 3 1.5-1.5 3 .6 3.3-3.3.6-1.5 3-3-1.5-3.3.6-.6-3.3-3-1.5 1.5-3-.6-3.3 3.3-.6 1.5-3z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"></path></svg>': svgs.get("settings", ""),
    }

    # Bottom nav Unicode → SVG
    bottomnav_map = {
        '<span class="active">&#8962;</span>': f'<span class="active">{svgs.get("home", "")}</span>',
        '<span>&#128269;</span>': f'<span>{svgs.get("search", "")}</span>',
        '<span>&#65291;</span>': f'<span>{svgs.get("create", "")}</span>',
        '<span>&#9825;</span>': f'<span>{svgs.get("heart", "")}</span>',
        '<span>&#128100;</span>': f'<span>{svgs.get("profile", svgs.get("home", ""))}</span>',
    }

    for old, new in {**replacements, **bottomnav_map}.items():
        if old in content and new:
            content = content.replace(old, new)

    with open(path, "w") as f:
        f.write(content)

    print(f"[+] updated {path.name}")

def main():
    svgs = load_svgs()
    print(f"[*] loaded {len(svgs)} svgs: {list(svgs.keys())}")

    # Заменяем в index.html
    index = ROOT / "index.html"
    if index.exists():
        replace_in_file(index, svgs)

    # Заменяем в post.js — сердце
    post = ROOT / "js/post.js"
    if post.exists():
        with open(post) as f:
            content = f.read()
        # Заменяем Unicode heart на SVG
        if "heart" in svgs:
            content = content.replace(
                'document.getElementById("modalHeart").innerHTML = "&#9825;"',
                f'document.getElementById("modalHeart").innerHTML = `{svgs["heart"]}`'
            )
            content = content.replace(
                'heart.innerHTML = liked ? "&#9829;" : "&#9825;"',
                f'heart.innerHTML = liked ? `{svgs["heart"]}` : `{svgs["heart"]}`'
            )
        with open(post, "w") as f:
            f.write(content)
        print(f"[+] updated post.js")

    print("[+] DONE")

if __name__ == "__main__":
    main()
