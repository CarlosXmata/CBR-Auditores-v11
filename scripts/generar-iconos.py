"""Genera favicons, íconos de app, manifest e imagen para compartir de CBR desde el logo.

Uso (desde la raíz del proyecto, después de `npm install`):
    pip install Pillow fonttools brotli
    python3 scripts/generar-iconos.py <logo_transparente.png> public

El logo no se redibuja ni se recolorea: solo se recortan los márgenes vacíos y se escala.
Las fuentes (Manrope e Inter) se toman de node_modules/@fontsource-variable.
"""
import json
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

LOGO, PUBLIC = Path(sys.argv[1]), Path(sys.argv[2])
FONTS = Path(tempfile.mkdtemp())


def prepare_fonts():
    """Convierte las fuentes woff2 del proyecto a TTF para que Pillow pueda usarlas."""
    from fontTools.ttLib import TTFont
    base = Path("node_modules/@fontsource-variable")
    for name, src in [("Manrope", "manrope/files/manrope-latin-wght-normal.woff2"),
                      ("Inter", "inter/files/inter-latin-wght-normal.woff2")]:
        path = base / src
        if not path.exists():
            sys.exit(f"No se encontró {path}. Ejecute `npm install` primero.")
        font_file = TTFont(path)
        font_file.flavor = None
        font_file.save(FONTS / f"{name}.ttf")

# Colores de DESIGN.md
NAVY, BLUE, INK, INK3 = "#0a1f4a", "#0f5bc8", "#1c2a40", "#66748b"
WASH_TOP, WASH_BOTTOM = (255, 255, 255), (234, 241, 251)  # bg -> wash-2
APP_ICON_PADDING = 0.12   # margen en íconos de app para que el anillo exterior no toque el borde
MASKABLE_SAFE = 0.80      # Android recorta los íconos "maskable" a un círculo del 80 % central


def trimmed_logo() -> Image.Image:
    im = Image.open(LOGO).convert("RGBA")
    crop = im.crop(im.getchannel("A").getbbox())
    side = max(crop.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(crop, ((side - crop.width) // 2, (side - crop.height) // 2))
    return square


def fit(logo, size, padding=0.0, bg=None):
    canvas = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    inner = round(size * (1 - 2 * padding))
    scaled = logo.resize((inner, inner), Image.LANCZOS)
    offset = (size - inner) // 2
    canvas.alpha_composite(scaled, (offset, offset))
    return canvas


def font(name, size, weight):
    f = ImageFont.truetype(str(FONTS / f"{name}.ttf"), size)
    f.set_variation_by_axes([weight])
    return f


def centered(draw, y, text, f, fill, width=1200):
    w = draw.textlength(text, font=f)
    draw.text(((width - w) / 2, y), text, font=f, fill=fill)


def og_image(logo):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H))
    top, bottom = WASH_TOP, WASH_BOTTOM
    for y in range(H):  # degradado vertical suave, como el hero de la web
        t = y / (H - 1)
        img.paste(tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)), (0, y, W, y + 1))
    img = img.convert("RGBA")
    img.alpha_composite(logo.resize((230, 230), Image.LANCZOS), ((W - 230) // 2, 84))
    d = ImageDraw.Draw(img)
    centered(d, 340, "CBR Auditores & Consultores", font("Manrope", 66, 800), NAVY)
    centered(d, 434, "Auditoría · Contabilidad · Impuestos · Ley 155-17", font("Inter", 31, 500), INK)
    centered(d, 492, "República Dominicana", font("Inter", 26, 600), BLUE)
    d.rectangle((0, H - 14, W, H), fill=NAVY)
    d.rectangle((0, H - 14, W // 3, H), fill=BLUE)
    return img.convert("RGB")


def main():
    prepare_fonts()
    logo = trimmed_logo()
    PUBLIC.mkdir(parents=True, exist_ok=True)

    # Pestaña del navegador: fondo transparente
    fit(logo, 32).save(PUBLIC / "favicon-32.png", optimize=True)
    fit(logo, 48).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # Íconos de app: fondo blanco (iOS pinta de negro lo transparente)
    white = (255, 255, 255, 255)
    fit(logo, 180, APP_ICON_PADDING, white).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
    fit(logo, 192, APP_ICON_PADDING, white).convert("RGB").save(PUBLIC / "favicon-192.png", optimize=True)
    fit(logo, 512, APP_ICON_PADDING, white).convert("RGB").save(PUBLIC / "icon-512.png", optimize=True)
    fit(logo, 512, (1 - MASKABLE_SAFE) / 2 + 0.04, white).convert("RGB").save(PUBLIC / "icon-maskable-512.png", optimize=True)

    # Logo para buscadores (JSON-LD): transparente, 512 px
    fit(logo, 512).save(PUBLIC / "logo-cbr.png", optimize=True)

    og_image(logo).save(PUBLIC / "og-cbr.png", optimize=True)

    manifest = {
        "name": "CBR Auditores & Consultores",
        "short_name": "CBR Auditores",
        "lang": "es-DO",
        "start_url": "/",
        "display": "browser",
        "background_color": "#ffffff",
        "theme_color": "#0b1f3a",
        "icons": [
            {"src": "/favicon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
            {"src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
    }
    (PUBLIC / "site.webmanifest").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for f in sorted(PUBLIC.glob("*")):
        if f.suffix in {".png", ".ico", ".webmanifest"}:
            print(f"{f.name:24} {f.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
