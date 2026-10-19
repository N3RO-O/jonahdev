"""Render NeroSec's code-designed social card and app icons (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math
import random

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'public' / 'assets'
BG, CREAM, ACCENT, MUTED = '#121214', '#f4f4f0', '#d97757', '#a1a1aa'
FONT_DIR = Path('C:/Windows/Fonts')

def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)

def asterisk(draw, x, y, radius, width):
    for angle in [90, 30, -30]:
        dx, dy = radius * math.cos(math.radians(angle)), radius * math.sin(math.radians(angle))
        draw.line((x-dx, y-dy, x+dx, y+dy), fill=ACCENT, width=width)

def render():
    card = Image.new('RGB', (1200, 630), BG)
    pixels = card.load()
    rng = random.Random(42)
    for y in range(card.height):
        for x in range(card.width):
            noise = rng.choice([-2, -1, 0, 0, 1, 2])
            pixels[x,y] = tuple(max(0, min(255, c+noise)) for c in (18,18,20))
    draw = ImageDraw.Draw(card)
    asterisk(draw, 73, 70, 18, 3)
    draw.text((110, 45), 'NeroSec', fill=CREAM, font=font('arialbd.ttf', 43))
    draw.text((58, 180), 'Logic meets', fill=CREAM, font=font('arial.ttf', 106))
    draw.text((58, 287), 'instinct.', fill=ACCENT, font=font('georgiai.ttf', 124))
    asterisk(draw, 1000, 290, 100, 5)
    draw.line((60, 485, 1140, 485), fill='#363638', width=1)
    draw.text((60, 518), 'JONAH MARK TABUZO / NEROSEC', fill=CREAM, font=font('consola.ttf', 17))
    draw.text((60, 553), 'Full-Stack Developer / Systems Creator / Visual Storyteller', fill=MUTED, font=font('arial.ttf', 19))
    draw.text((1005, 533), 'VOL. 01 / 2026', fill=MUTED, font=font('consola.ttf', 13))
    card.save(ASSETS / 'nerosec-social.png', optimize=True)
    # Keep old externally linked social artwork consistent with the new identity.
    card.save(ASSETS / 'og-image.png', optimize=True)
    for size in (192, 512):
        image = Image.new('RGB', (size, size), BG)
        asterisk(ImageDraw.Draw(image), size/2, size/2, size*.30, max(3, round(size*.055)))
        image.save(ASSETS / 'icons' / f'icon-{size}.png', optimize=True)
    print('Rendered social artwork (1200x630) and app icons (192 / 512).')

if __name__ == '__main__':
    render()
