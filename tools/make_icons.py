#!/usr/bin/env python3
"""生成扩展图标（纯标准库）：蓝底圆角方块 + 白色进度条（填充 56.66%）。
用法：python3 make_icons.py  → 输出到 ../extension/icons/icon{16,32,48,128}.png
"""
import os
import struct
import zlib

PCT = 0.5666          # 进度条填充比例（和当前人生进度保持一致即可，纯装饰）
BG = (42, 120, 214)   # #2a78d6

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'extension', 'icons')


def clamp01(v):
    return max(0.0, min(1.0, v))


def rounded_square_sdf(x, y, cx, cy, hw, r):
    """圆角方块带符号距离（内负外正）：内缩方块的 SDF 再减角半径。"""
    qx = abs(x - cx) - (hw - r)
    qy = abs(y - cy) - (hw - r)
    ax, ay = max(qx, 0.0), max(qy, 0.0)
    return (ax * ax + ay * ay) ** 0.5 + min(max(qx, qy), 0.0) - r


def pill_sdf(x, y, cx, cy, hw, r):
    """横向胶囊（总半长 hw、半径 r=半高）带符号距离：到中轴线段的 SDF 再减 r。"""
    qx = abs(x - cx) - (hw - r)
    qy = abs(y - cy)
    ax, ay = max(qx, 0.0), max(qy, 0.0)
    return (ax * ax + ay * ay) ** 0.5 + min(max(qx, qy), 0.0) - r


def render(size):
    """渲染一张 size×size 的 RGBA 像素阵。坐标按画布比例，SDF 用像素单位做抗锯齿。"""
    px = []
    track_hw, bar_r = 0.31 * size, 0.075 * size   # 轨道半宽 / 半高（胶囊半径）
    fill_hw = track_hw * PCT
    for iy in range(size):
        row = []
        for ix in range(size):
            x, y = ix + 0.5, iy + 0.5
            c = size / 2
            sq = clamp01(0.5 - rounded_square_sdf(x, y, c, c, size / 2, 0.22 * size))
            tr = clamp01(0.5 - pill_sdf(x, y, c, c, track_hw, bar_r))
            fl = clamp01(0.5 - pill_sdf(x, y, c - track_hw * (1 - PCT), c, fill_hw, bar_r))
            r_, g_, b_ = BG
            a_tr = tr * 0.35                          # 白色轨道 35% 不透明度
            r_ += (255 - r_) * a_tr; g_ += (255 - g_) * a_tr; b_ += (255 - b_) * a_tr
            r_ += (255 - r_) * fl; g_ += (255 - g_) * fl; b_ += (255 - b_) * fl  # 白色填充
            row.append((round(r_), round(g_), round(b_), round(sq * 255)))
        px.append(row)
    return px


def write_png(path, pixels):
    h = len(pixels)
    w = len(pixels[0])
    raw = b''.join(
        b'\x00' + b''.join(struct.pack('4B', *p) for p in row)
        for row in pixels
    )

    def chunk(tag, data):
        body = tag + data
        return struct.pack('>I', len(data)) + body + struct.pack('>I', zlib.crc32(body) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(raw, 9))
    png += chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(png)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for size in (16, 32, 48, 128):
        path = os.path.join(OUT_DIR, f'icon{size}.png')
        write_png(path, render(size))
        print(f'wrote {path}')


if __name__ == '__main__':
    main()
