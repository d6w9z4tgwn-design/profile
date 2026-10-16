# 高専生向け自己紹介サイト（検索非掲載設定版）

## ファイル構成
- `index.html`: 自己紹介ページ（検索非掲載メタタグ設定済み）
- `style.css`: デザイン
- `script.js`: アニメーション
- `profile.jpg`: 顔写真
- `make_qr.py`: 公開URLからQRコードを生成するスクリプト

## 公開方法（GitHub Pages）
1. GitHubで新しい **Public** リポジトリを作成します（例: `hello-kosen`）。
2. `index.html`、`style.css`、`script.js`、`profile.jpg` をリポジトリのルートにアップロードします。`make_qr.py` と `README.md` はアップロード不要です。
3. リポジトリの **Settings → Pages → Build and deployment** で **Deploy from a branch** を選び、`main` / `/(root)` を保存します。
4. 表示されるURL（例: `https://ユーザー名.github.io/hello-kosen/`）にアクセスして動作確認します。

## QRコードの生成
PCでこのフォルダを開き、以下を実行します。

```bash
python -m pip install "qrcode[pil]"
python make_qr.py https://ユーザー名.github.io/hello-kosen/
```

`share-qr.png` が生成されます。スライドや印刷物に貼って高専生へ共有してください。

## 検索非掲載設定
`index.html` に以下を追加済みです。

```html
<meta name="robots" content="noindex, nofollow, noimageindex, nosnippet" />
<meta name="googlebot" content="noindex, nofollow, noimageindex" />
<meta name="referrer" content="no-referrer" />
```

`robots.txt` でクロールをブロックすると、Googleが`noindex`を読み取れなくなる場合があるため、クロール禁止の`robots.txt`は追加していません。

**重要:** 非掲載指示はアクセス制限ではありません。URLを知っている人は誰でも閲覧でき、写真の直接URLもアクセス可能です。検索エンジンすべてが指示に従う保証はありません。また、GitHubのPublicリポジトリ内のソースと画像は誰でも閲覧できます。写真の公開範囲を厳密に制限する場合は認証付きホスティングを使ってください。
