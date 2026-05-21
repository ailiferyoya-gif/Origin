# GitHub管理メモ

## 推奨方針

- まずローカルGitで履歴管理を始め、問題がないことを確認してからGitHubへpushする。
- `_backups/`、Unityの生成フォルダ、`node_modules/`、zip、実行ログはGitHubに含めない。
- `web/logs/` は謎解きのコンテンツなので除外しない。
- Booth同梱版も販売物の確認用として管理対象に含める。

## 初回セットアップ手順

Gitが使える状態になったら、`C:\Users\kogit\Documents\GitHub\Nazotoki` で以下を実行する。

```powershell
cd C:\Users\kogit\Documents\GitHub\Nazotoki
git init
git status --ignored
git add .gitignore GITHUB_MIGRATION.md AGENTS.md *.md
git add CrimsonClinicMystery CrimsonClinicMystery_BoothPackage
git commit -m "Initialize mystery site source management"
```

まずは `CrimsonClinicMystery` だけで開始し、問題がなければ他作品を作品単位で追加する。

```powershell
git add KurobaraCinemaMystery KurobaraCinemaMystery_BoothPackage
git commit -m "Add Kurobara cinema mystery site"
```

## GitHubへpushする前の確認

```powershell
git status --short
git status --ignored
git ls-files | Select-String "_backups|node_modules|/Library/|\\.zip$|\\.log$"
```

上の最後のコマンドで不要ファイルが出た場合は、コミット前に `.gitignore` を調整する。

## GitHubリポジトリ作成後

GitHub側で空のprivate repositoryを作成してから、表示されたURLを使う。

```powershell
git remote add origin https://github.com/USER/REPO.git
git branch -M main
git push -u origin main
```

公開予定前の制作物なので、最初はprivate repository推奨。

## 運用ルール

- 1作品または1修正単位でコミットする。
- 公式サイト修正、Booth版同期、引継ぎMD更新を同じコミットにまとめる。
- 画像生成素材を使った場合は、生成後にプロジェクト内 `web/assets/` にコピーしたファイルだけを管理する。
- `_backups/` はGitではなくローカル保険として残す。
