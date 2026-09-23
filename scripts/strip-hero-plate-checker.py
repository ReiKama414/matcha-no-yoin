"""Replace white plate with surrounding checkerboard floor pixels."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

SRC = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-Rei-Code-Web-matcha-no-yoin\assets\hero-v7.png"
)
OUT = Path(r"c:\Users\User\Rei\Code\Web\matcha-no-yoin\public\hero.png")


def is_plate(r: int, g: int, b: int) -> bool:
    avg = (r + g + b) / 3
    chroma = max(r, g, b) - min(r, g, b)
    # cool/neutral bright white plate (not warm yellow checks, not green desserts)
    if avg >= 205 and chroma <= 28 and abs(r - b) < 25:
        return True
    if avg >= 185 and chroma <= 14 and abs(r - g) < 10 and abs(g - b) < 10:
        return True
    return False


def is_dessert(r: int, g: int, b: int) -> bool:
    if g > r + 10 and g > b + 8:
        return True  # matcha green
    if r > 90 and g > 45 and b < 100 and r >= g and (r - b) > 35:
        return True  # caramel / crust brown
    if avg := (r + g + b) / 3:
        if 90 < avg < 190 and abs(r - g) < 20 and g > b + 5 and g > 100:
            # soft green-cream frosting
            if g >= r - 5:
                return chroma_ok(r, g, b)
    return False


def chroma_ok(r: int, g: int, b: int) -> bool:
    return max(r, g, b) - min(r, g, b) > 18


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    w, h = im.size
    pix = im.load()

    # plate ellipse roughly center-lower
    cx, cy = w * 0.50, h * 0.62
    rx, ry = w * 0.28, h * 0.22

    # build fill from nearby checker pixels outside plate
    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = pix[x, y]
            dx = (x - cx) / rx
            dy = (y - cy) / ry
            if dx * dx + dy * dy <= 1.0 and is_plate(r, g, b) and not is_dessert(r, g, b):
                d = (dx * dx + dy * dy) ** 0.5
                mp[x, y] = 255 if d < 0.82 else int(255 * max(0.0, (1.0 - d) / 0.18))

    mask = mask.filter(ImageFilter.GaussianBlur(3))

    # synthesize checker fill sample from band below plate
    fill = Image.new("RGB", (w, h))
    fp = fill.load()
    for y in range(h):
        src_y = min(h - 1, max(0, int(cy + ry + 8 + (y - cy) * 0.15)))
        for x in range(w):
            # sample slightly outward radially to pull checker pattern
            sx = min(w - 1, max(0, int(cx + (x - cx) * 1.35)))
            sy = min(h - 1, max(0, int(cy + (y - cy) * 1.35)))
            # prefer lower checker band
            if sy < cy + ry:
                sy = min(h - 1, int(cy + ry + 12 + abs(y - cy) * 0.2))
            fp[x, y] = pix[sx, sy] if not is_dessert(*pix[sx, sy]) else pix[x, src_y]

    # simpler: for masked pixels, sample from mirrored point outside ellipse
    result = im.copy()
    rp = result.load()
    for y in range(h):
        for x in range(w):
            alpha = mp[x, y] / 255.0
            if alpha <= 0.01:
                continue
            # ray from center through (x,y) to outside ellipse
            dx = x - cx
            dy = y - cy
            dist = (dx * dx + dy * dy) ** 0.5 or 1.0
            scale = (max(rx, ry) * 1.25) / dist
            sx = int(cx + dx * scale)
            sy = int(cy + dy * scale)
            sx = min(w - 1, max(0, sx))
            sy = min(h - 1, max(0, sy))
            sr, sg, sb = pix[sx, sy]
            # if sample lands on dessert, walk further out
            tries = 0
            while is_dessert(sr, sg, sb) and tries < 8:
                scale += 0.12
                sx = min(w - 1, max(0, int(cx + dx * scale)))
                sy = min(h - 1, max(0, int(cy + dy * scale)))
                sr, sg, sb = pix[sx, sy]
                tries += 1
            r, g, b = rp[x, y]
            rp[x, y] = (
                int(r * (1 - alpha) + sr * alpha),
                int(g * (1 - alpha) + sg * alpha),
                int(b * (1 - alpha) + sb * alpha),
            )

    result.save(OUT, "PNG", optimize=True)
    print("saved", OUT, OUT.stat().st_size)


if __name__ == "__main__":
    main()
