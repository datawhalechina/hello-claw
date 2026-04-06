<div align="center">

<img src="asset/logo.png" alt="Hello Claw Logo" width="400">

<p align="center"><em>とある目立たないリポジトリから、一匹のロブスターが生まれた。<br>一匹選んで学校に送り出すもよし、自分だけの未定義なロブスターを書くもよし。<br>その夢は、初日から大きかった。</em></p>

# Hello Claw 👋

<p align="center"><em>Hello Claw: AIロブスターアシスタントを迎え、ロブスター大学でSkillsを学び、あなただけの知的エージェントをゼロから構築しよう</em></p>

<p align="center">
  📌 <a href="https://datawhalechina.github.io/hello-claw/">オンラインで読む</a> | 🚀 <a href="https://github.com/datawhalechina/easy-vibe">Vibe Coding も学びたい？</a>
</p>

<p align="center">
    <a href="https://github.com/datawhalechina/hello-claw/stargazers" target="_blank">
        <img src="https://img.shields.io/github/stars/datawhalechina/hello-claw?color=660874&style=for-the-badge&logo=star&logoColor=white&labelColor=1a1a2e" alt="Stars"></a>
    <a href="https://github.com/datawhalechina/hello-claw/network/members" target="_blank">
        <img src="https://img.shields.io/github/forks/datawhalechina/hello-claw?color=660874&style=for-the-badge&logo=git-fork&logoColor=white&labelColor=1a1a2e" alt="Forks"></a>
    <a href="LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/License-CC_BY_NC_SA_4.0-4ecdc4?style=for-the-badge&logo=creative-commons&logoColor=white&labelColor=1a1a2e" alt="License"></a>
</p>

<p align="center">
  <a href="README.md"><img alt="简体中文" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
  <a href="README_EN.md"><img alt="English" src="https://img.shields.io/badge/English-d9d9d9"></a>
  <a href="README_JA.md"><img alt="日本語" src="https://img.shields.io/badge/日本語-d9d9d9"></a>
</p>

</div>

## オンラインで読む

https://datawhalechina.github.io/hello-claw

## はじめに

本プロジェクトは OpenClaw を体系的に学ぶための完全ガイドです。強力なコマンドライン AI アシスタントシステムである OpenClaw を、ゼロから理解して使いこなせるよう支援します。OpenClaw をすばやく導入して生産性を高めたい方にも、その仕組みを深く理解して自分のバージョンを構築したい方にも、明確な学習ルートを提供します。

**本プロジェクトは 3 つの中核モジュールで構成されています:**

1. **Clawを迎える（ユーザー編）**: 11 章 + 7 つの付録で構成され、導入（第 1-3 章）、コア設定（第 4-6 章）、運用と拡張（第 7-9 章）、セキュリティとクライアント（第 10-11 章）をカバーします
2. **ロブスター大学（実践シナリオ編）**: Skills の選び方と典型ワークフローを中心に、再利用しやすい実践ケースを紹介します
3. **Clawを構築する（開発編）**: 11 章構成で、まず OpenClaw のソースコードと代替案を分解し、その後 Skills、チャネル、完全なカスタマイズへ進みます

**こんな人におすすめです:**

- 初心者: プログラミング経験がなくても、いつでも使える AI アシスタントがほしい方
- 効率化志向の方: QQ / Feishu / Telegram から AI をリモート操作したい方
- 技術好きの方: OpenClaw のスキルシステムや自動化能力に興味がある方
- 開発者: Agent アーキテクチャを深く理解し、自分のバージョンを構築したい方

**学習のすすめ方:**

- 初心者: 第 1 部「Clawを迎える」から始めて、導入と基本自動化を先に動かしましょう
- シナリオベースで早く成果を出したい方: 「ロブスター大学」に進み、用途に応じて 5〜10 個の Skills を選んで実践しましょう
- 開発者: 「Clawを構築する」に進み、内部実装を理解しながら自分の Claw をカスタマイズしましょう

## 🔥 最新情報

- **[2026-03-25]** ✅ ロブスター大学のシナリオを大幅拡充し、初心者向けに全面リライト。個人の生産性、プログラミング、コンテンツ制作、ビジネス・営業、マルチエージェント協調、その他シナリオを合わせた 11 本の実践事例を追加し、README のカテゴリ別に整理
- **[2026-03-25]** 🔥 OpenClaw v2026.3.24：Gateway の OpenAI 互換エンドポイント（`/v1/models`、`/v1/embeddings`）、Microsoft Teams 公式 SDK 統合（ストリーミング返信 / ウェルカムカード / メッセージ編集・削除）、Skills ワンクリックインストールレシピと Control UI のステータスフィルタ、Slack リッチリプライ復元、CLI `--container` によるコンテナ内実行、Discord LLM 自動スレッド命名、`before_dispatch` プラグインフック、サンドボックスメディアセキュリティ修正 — 全チュートリアル章を同期
- **[2026-03-23]** 🔥 OpenClaw 3.22 メジャーリリース：プラグイン SDK リファクタ（旧 `extension-api` は廃止）、セキュリティ強化（SMB 認証情報漏洩 / 環境変数インジェクション / Unicode なりすまし修正）、GPT-5.4 がデフォルトに、Feishu インタラクティブカード / Telegram 話題自動命名、Agent タイムアウトを 48h に延長
- **[2026-03-12]** ✅ Build Claw 第 1-10 章を公開: コアアーキテクチャ解析（プロンプトシステム、ツールシステム、メッセージループ、マルチチャネル接続）、代替案の探究（軽量化、セキュリティ強化、ハードウェア化）、そして全体を俯瞰する総括
- **[2026-03-10]** ✅ Build Claw 第 13 章を公開: Skill ファイル構造、Frontmatter、非同期処理、デバッグ
- **[2026-03-10]** ✅ ロブスター大学を追加: メニュー式の Skills 選修ガイドで、ロブスターに「戦闘用アドオン」を装備
- **[2026-03-08]** ✅ Adopt Claw 第 1-11 章を公開: 導入（AutoClaw + 手動インストール + 初期設定ウィザード）、コア設定（チャットプラットフォーム、モデル、エージェント）、運用と拡張（ツールと定期実行、ゲートウェイ、リモートアクセス）、セキュリティとクライアント（安全対策、Web インターフェース）
- **[2026-03-04]** 🦞 プロジェクトを開始し、「Adopt Claw」と「Build Claw」の 2 つのコアモジュールを企画

## 📖 目次

### ロブスター大学

<table align="center">
  <tr>
    <td valign="top" width="33%">
      <b>🌅 個人の生産性</b><br>
      • <a href="./docs/en/university/email-assistant/index.md">メールアシスタント実践（163）</a><br>
      • <a href="./docs/en/university/local-health-assistant/index.md">Skill 開発実践: ローカル健康管理アシスタント</a><br>
      • <a href="./docs/en/university/daily-briefing/index.md">朝のブリーフィング自動化</a><br>
      • <a href="./docs/en/university/calendar-ops/index.md">スマートカレンダー管理</a>
    </td>
    <td valign="top" width="33%">
      <b>💻 プログラミングと開発</b><br>
      • <a href="./docs/en/university/vibe-coding/index.md">Vibe Coding 実践</a><br>
      • <a href="./docs/en/university/ci-cd-assistant/index.md">自動テストとデプロイ: CI/CD アシスタント実践</a><br>
      • <a href="./docs/en/university/docs-automation/index.md">ドキュメント自動生成: コード変更から公開可能ドキュメントまで</a>
    </td>
    <td valign="top" width="33%">
      <b>📢 コンテンツ制作</b><br>
      • <a href="./docs/en/university/vibe-research/index.md">自動化科研実践</a><br>
      • <a href="./docs/en/university/content-studio/index.md">コンテンツ制作スタジオ: SNS 運用・執筆補助・マルチプラットフォーム配信</a>
    </td>
  </tr>
  <tr>
    <td valign="top" width="33%">
      <b>🏢 ビジネスと営業</b><br>
      • <a href="./docs/en/university/revops-assistant/index.md">ビジネス営業実践: カスタマーサポートと CRM 協調アシスタント</a><br>
      • <a href="./docs/en/university/meeting-ops/index.md">ビジネス営業実践: 会議予約と議事録自動化</a>
    </td>
    <td valign="top" width="33%">
      <b>🤖 マルチエージェント協調</b><br>
      • <a href="./docs/en/university/multi-claw-hiclaw/index.md">マルチエージェント協調（Multi OpenClaw / HiClaw）</a><br>
      • <a href="./docs/en/university/knowledge-base/index.md">マルチエージェント協調実践: ナレッジベース共有と検索</a><br>
      • <a href="./docs/en/university/one-person-company/index.md">一人会社実践（一人でもチーム）</a>
    </td>
    <td valign="top" width="33%">
      <b>🔧 その他のシナリオ</b><br>
      • <a href="./docs/en/university/security/index.md">セキュリティチェックリスト</a><br>
      • <a href="./docs/en/university/paper-assistant/index.md">Agent 論文プッシュアシスタント</a><br>
      • <a href="./docs/en/university/smart-home-control/index.md">その他の実践: スマートホーム制御アシスタント</a><br>
      • <a href="./docs/en/university/finance-research/index.md">その他の実践: 金融データ分析アシスタント</a><br>
      • <a href="./docs/en/university/training-assistant/index.md">その他の実践: 教育・研修支援アシスタント</a>
    </td>
  </tr>
</table>

### 第1部：Clawを迎える（ユーザー編、11 章 + 付録 A-G）

| 章 | 説明 | 状態 |
| ------------------------------ | --------------------------------------------------------- | ---- |
| **はじめに** | **OpenClaw とは何か、4 ステップの導入法、学習ロードマップ** | ✅ |
| **🔵 導入** |  |  |
| 第 1 章 AutoClaw ワンクリック導入 | AutoClaw デスクトップクライアントをダウンロードし、5 分で手軽に体験 | ✅ |
| 第 2 章 OpenClaw 手動インストール | ターミナルの基礎、Node.js の導入、`npm install`、onboarding ウィザード | ✅ |
| 第 3 章 初期設定ウィザード | CLI ウィザード、macOS ガイド、Custom Provider、再設定 | ✅ |
| **🟢 コア設定** |  |  |
| 第 4 章 チャットプラットフォーム接続 | 対応プラットフォーム一覧、Feishu を例にした完全導入、ペアリング、グループチャット | ✅ |
| 第 5 章 モデル管理 | モデルの基本概念、CLI 管理、複数プロバイダ設定、API キーのローテーション、フェイルオーバー | ✅ |
| 第 6 章 エージェント管理 | マルチエージェント管理、ワークスペース、ハートビート、バインディングルール | ✅ |
| **🟡 運用と拡張** |  |  |
| 第 7 章 ツールと定期実行 | ツールセット階層、定期実行（`cron` / `at` / `every`）、Web 検索 | ✅ |
| 第 8 章 ゲートウェイ運用 | 起動管理、ホットリロード、認証セキュリティ、鍵管理、サンドボックス方針、ログ監視 | ✅ |
| 第 9 章 リモートアクセスとネットワーク | SSH トンネル、Tailscale ネットワーク、デプロイ構成、安全運用のベストプラクティス | ✅ |
| **🔴 セキュリティとクライアント** |  |  |
| 第 10 章 セキュリティ対策と脅威モデル | 脅威全体像、VM 分離、信頼境界、MITRE ATLAS、サプライチェーンセキュリティ | ✅ |
| 第 11 章 Web インターフェースとクライアント | Dashboard、WebChat、Control UI、TUI、サードパーティクライアント | ✅ |
| **付録** |  |  |
| 付録 A: 学習リソースまとめ | 8 分類、80+ リンクを編者が厳選 | ✅ |
| 付録 B: コミュニティの声とエコシステム展望 | 6 つの主要論点の深掘りと名言集 | ✅ |
| 付録 C: Claw系ソリューション比較と選定 | デスクトップクライアント / ホステッドサービス / クラウドベンダー / OSS 自前構築 / モバイルの 5 分類 | ✅ |
| 付録 D: Skill 開発と公開ガイド | `SKILL.md` 形式、`skill-creator`、ClawHub 公開フロー | ✅ |
| 付録 E: モデルプロバイダ選定ガイド | 集約ゲートウェイ / 中国本土 / 海外 / ローカルの 4 分類を比較 | ✅ |
| 付録 F: コマンド早見表 | インストール、設定、ログ、cron、チャネルなど全 CLI コマンドの参照 | ✅ |
| 付録 G: 設定ファイル詳解 | `openclaw.json` の各項目を詳しく解説 | ✅ |

---

### 第2部：Clawを構築する（開発編、11 章）

| 章 | 説明 | 状態 |
| -------------------------------------------------- | -------------------------------------------------------------------- | ---- |
| **はじめに** | **なぜゼロから Claw を構築するのか、OpenClaw の複雑性という課題、学習ロードマップ** | ✅ |
| **🔵 OpenClaw 内部の分解**（第 1〜7 章） |  |  |
| 第 1 章 アーキテクチャ設計思想 | AI Agent アーキテクチャの進化と、OpenClaw の 6 つの設計上の革新 | ✅ |
| 第 2 章 ReAct ループ | Agent の「思考して行動する」エンジンと実行ループ | ✅ |
| 第 3 章 プロンプトシステム | プロンプト構造、ホットリロード機構、持続的な人格設計 | ✅ |
| 第 4 章 ツールシステム | 4 つのプリミティブツール、登録方式、組み合わせ能力の詳細 | ✅ |
| 第 5 章 メッセージループとイベント駆動 | スイムレーンモデル、ハートビート、並行安全性、時間起点の処理 | ✅ |
| 第 6 章 統一ゲートウェイ | Gateway アーキテクチャ、マルチチャネル接続、メッセージ正規化 | ✅ |
| 第 7 章 セキュリティサンドボックス | 自由と制約のバランス、実行環境の分離、権限制御 | ✅ |
| **🟢 カスタム方針**（第 8〜10 章） |  |  |
| 第 8 章 軽量化ソリューション | NanoClaw、Nanobot、ZeroClaw などのコミュニティ派生版 | ✅ |
| 第 9 章 セキュリティ強化ソリューション | IronClaw のセキュリティ設計、サンドボックス分離、監査ログ | ✅ |
| 第 10 章 ハードウェアソリューション | PicoClaw のハードウェア選定と低消費電力な組み込み展開 | ✅ |
| **🟡 第3レベル: あなただけの Claw を作る**（第 13 章） |  |  |
| 第 13 章 Skill の作成 | Skill ファイル構造、Frontmatter、非同期処理、デバッグ | ✅ |

---

### 第3部：ロブスター大学（実践シナリオ編）

| 記事 | 説明 | 状態 |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| [ロブスター大学: はじめにと Skills 選修ガイド](./docs/en/university/intro.md) | ClawHub と SkillHub の二重入口、スキル分類マップ、選び方の原則、推奨カリキュラム | ✅ |
| [Vibe Coding 実践](./docs/en/university/vibe-coding/index.md) | Feishu 対話から要件整理、PR までをつなぐ「会話即開発」のフルループ | ✅ |
| [メールアシスタント実践（163）](./docs/en/university/email-assistant/index.md) | IMAP/SMTP 設定からスクリプト検証、cron 自動化まで | ✅ |
| [Skill 開発実践: ローカル健康管理アシスタント](./docs/en/university/local-health-assistant/index.md) | MediWise をベースにしたローカル優先の家庭向け健康管理ループの構築 | ✅ |
| [朝のブリーフィング自動化](./docs/en/university/daily-briefing/index.md) | 天気・カレンダー・ToDo を一括配信する朝の自動ブリーフィング | ✅ |
| [スマートカレンダー管理](./docs/en/university/calendar-ops/index.md) | 衝突検出・日程調整・議事録自動化 | ✅ |
| [自動テストとデプロイ: CI/CD アシスタント実践](./docs/en/university/ci-cd-assistant/index.md) | テスト・デプロイパイプラインの自動化実践 | ✅ |
| [ドキュメント自動生成](./docs/en/university/docs-automation/index.md) | コード変更から公開可能ドキュメントまでの標準化 | ✅ |
| [自動化科研実践](./docs/en/university/vibe-research/index.md) | 説明するだけで論文が出てくる自動科研ループ | ✅ |
| [コンテンツ制作スタジオ](./docs/en/university/content-studio/index.md) | SNS 運用・執筆補助・マルチプラットフォーム配信 | ✅ |
| [ビジネス営業実践: カスタマーサポートと CRM 協調アシスタント](./docs/en/university/revops-assistant/index.md) | 顧客サポートと CRM を連携させた営業自動化 | ✅ |
| [ビジネス営業実践: 会議予約と議事録自動化](./docs/en/university/meeting-ops/index.md) | 会議スケジューリングから議事録作成まで | ✅ |
| [マルチエージェント協調（Multi OpenClaw / HiClaw）](./docs/en/university/multi-claw-hiclaw/index.md) | 単一 Worker のボトルネックから、追跡可能なマルチエージェント協調へ | ✅ |
| [マルチエージェント協調実践: ナレッジベース共有と検索](./docs/en/university/knowledge-base/index.md) | 複数エージェント間でのナレッジベース共有と検索 | ✅ |
| [一人会社実践（一人でもチーム）](./docs/en/university/one-person-company/index.md) | 144 専門 AI エージェントで会社全体の機能を一人でまかなう | ✅ |
| [セキュリティチェックリスト](./docs/en/university/security/index.md) | Skills とツールのセキュリティ境界、監査、インジェクション対策の要点 | ✅ |
| [Agent 論文プッシュアシスタント](./docs/en/university/paper-assistant/index.md) | Agent 論文の自動収集・整理・配信 | ✅ |
| [その他の実践: スマートホーム制御アシスタント](./docs/en/university/smart-home-control/index.md) | スマートホームデバイスの AI 制御実践 | ✅ |
| [その他の実践: 金融データ分析アシスタント](./docs/en/university/finance-research/index.md) | 金融データの自動収集・分析・レポート生成 | ✅ |
| [その他の実践: 教育・研修支援アシスタント](./docs/en/university/training-assistant/index.md) | 教育コンテンツの自動生成と研修支援 | ✅ |
---

> 🎉 **事例の貢献を歓迎します！**
>
> OpenClaw のユニークな活用事例や実践経験があれば、ぜひ次の形で共有してください:
>
> - この章に事例を追加する PR を送る
> - 活用シナリオを説明する Issue を作る
> - コミュニティに参加して他の開発者と知見を交換する
>
> 一つひとつの貢献が、OpenClaw の可能性をもっと多くの人に届けてくれます。

## 🙏 コントリビューター

| 名前 | 役割 |
| :-------------------------------------- | :--------- |
| [桂子轩](https://github.com/zixuangui-rgb) | コアコントリビューター |
| [赵志民](https://github.com/zhimin-z) | コアコントリビューター |
| [李秀奇](https://github.com/li-xiu-qi) | コアコントリビューター |
| [刘丽欣](https://github.com/liulx25xx) | コアコントリビューター |
| [刘思怡](https://github.com/liusiyi77m) | コアコントリビューター |
| [散步](https://github.com/sanbuphy) | コアコントリビューター |

*より多くのコントリビューターを歓迎します*

## 🤝 貢献方法

- 問題を見つけた場合は Issue でフィードバックしてください。反応がない場合は [サポートチーム](https://github.com/datawhalechina/DOPMC/blob/main/OP.md) に連絡してフォローアップできます。
- このプロジェクトに貢献したい場合は Pull Request を送ってください。反応がない場合は [サポートチーム](https://github.com/datawhalechina/DOPMC/blob/main/OP.md) に連絡してフォローアップできます。
- Datawhale に興味があり、新しいプロジェクトを立ち上げたい場合は [Datawhale オープンソースプロジェクトガイド](https://github.com/datawhalechina/DOPMC/blob/main/GUIDE.md) を参照してください。

## 📧 フォローする

<div align=center>
<p>下の QR コードをスキャンして Datawhale の WeChat 公式アカウントをフォローしてください</p>
<img src="https://raw.githubusercontent.com/datawhalechina/pumpkin-book/master/res/qrcode.jpeg" width = "180" height = "180">
</div>

## 📄 LICENSE

<div align="center">
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
  <img
    alt="クリエイティブ・コモンズ・ライセンス"
    style="border-width:0"
    src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey"
  />
</a>
<br />
この作品は
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
  クリエイティブ・コモンズ 表示-非営利-継承 4.0 国際ライセンス
</a>
の下で提供されています。
</div>

---

<div align="center">
  <h3>⭐ このプロジェクトが役に立ったら、Star をお願いします ❤️</h3>
</div>

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=datawhalechina/hello-claw&type=Date)](https://star-history.com/?type=date&legend=top-left&repos=datawhalechina%2Fhello-claw)
