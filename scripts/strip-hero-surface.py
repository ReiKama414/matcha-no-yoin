"""Remove white plate / tabletop from hero packshot, keep desserts centered on cream."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

SRC = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-Rei-Code-Web-matcha-no-yoin\assets\hero-v6.png"
)
OUT = Path(r"c:\Users\User\Rei\Code\Web\matcha-no-yoin\public\hero.png")


def corner_bg(im: Image.Image) -> tuple[int, int, int]:
    w, h = im.size
    samples: list[tuple[int, int, int]] = []
    for box in (
        (0, 0, 48, 48),
        (w - 48, 0, w, 48),
        (0, h - 48, 48, h),
        (w - 48, h - 48, w, h),
    ):
        crop = im.crop(box)
        pixels = [p[:3] for p in crop.getdata()]
        samples.append(tuple(sum(c) // len(c) for c in zip(*pixels)))  # type: ignore[misc]
    return tuple(sum(c) // len(c) for c in zip(*samples))  # type: ignore[return-value]


def is_surface(r: int, g: int, b: int) -> bool:
    avg = (r + g + b) / 3
    chroma = max(r, g, b) - min(r, g, b)
    # bright near-white / cool plate; also soft gray plate shadow
    if avg >= 200 and chroma <= 30:
        return True
    if avg >= 175 and chroma <= 16 and abs(r - g) < 12 and abs(g - b) < 12:
        return True
    return False


def main() -> None:
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    bg = corner_bg(im)
    print("bg", bg)

    # ellipse roughly covering the circular plate
    cx, cy = w * 0.50, h * 0.58
    rx, ry = w * 0.42, h * 0.40

    base = Image.new("RGBA", (w, h), (*bg, 255))
    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    pix = im.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            dx = (x - cx) / rx
            dy = (y - cy) / ry
            inside = dx * dx + dy * dy <= 1.05
            if inside and is_surface(r, g, b):
                # feather near ellipse rim
                d = (dx * dx + dy * dy) ** 0.5
                strength = 255 if d < 0.88 else int(255 * max(0.0, (1.05 - d) / 0.17))
                mp[x, y] = strength
            elif (not inside) and is_surface(r, g, b) and avg_row_bright(y, h):
                # stray plate glare outside ellipse
                mp[x, y] = 200

    mask = mask.filter(ImageFilter.GaussianBlur(radius=2.5))
    cleaned = Image.composite(base, im, mask)

    # second pass: any remaining near-white plate pixels -> bg
    cp = cleaned.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = cp[x, y]
            if is_surface(r, g, b):
                # only if neighbors lean cream (avoid frosting)
                if g >= r - 8:  # not strongly green frosting
                    if not is_greenish(r, g, b) and not is_brownish(r, g, b):
                        cp[x, y] = (*bg, 255)

    cleaned.convert("RGB").save(OUT, "PNG", optimize=True)
    print("saved", OUT, OUT.stat().st_size)


def avg_row_bright(y: int, h: int) -> bool:
    return y > h * 0.35


def is_greenish(r: int, g: int, b: int) -> bool:
    return g > r + 12 and g > b + 8


def is_brownish(r: int, g: int, b: int) -> bool:
    return r > 90 and g > 50 and b < 90 and r >= g >= b and (r - b) > 40


if __name__ == "__main__":
    main()
