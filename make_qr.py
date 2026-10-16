"""公開後のURLから配布用QRコードを生成します。"""
import sys
from pathlib import Path
try:
    import qrcode
except ImportError:
    raise SystemExit('qrcodeが必要です: python -m pip install "qrcode[pil]"')

if len(sys.argv) != 2 or not sys.argv[1].startswith('https://'):
    raise SystemExit('使い方: python make_qr.py https://ユーザー名.github.io/リポジトリ名/')
url = sys.argv[1]
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=14, border=4)
qr.add_data(url)
qr.make(fit=True)
out = Path(__file__).parent / 'share-qr.png'
qr.make_image(fill_color='#17152e', back_color='white').convert('RGB').save(out)
print(f'QRコードを作成しました: {out}\nリンク: {url}')
