import { Link } from "react-router-dom";
import "./Top.screen.css";

export const TopScreen = () => {
  return (
    <div id="top-container">
      <h1 id="top-title">隠しリンク</h1>
      <div id="top-description">
        <p>
          <Link to="/pages/0">このリンク</Link>
          の先にあるページ群はWeb上で偶然発見されました。
        </p>
        <p>
          一見、何もない空白のページのようですが、
          よく調べると、隠しリンクがあり、別のページに飛びます。
        </p>
        <p>時々、空白ではないページが発見されます。</p>
        <p>どれだけのページが存在するかはわかっていません。</p>
      </div>
      <div id="top-notice">
        <p>
          このページは
          <a href="https://www.youtube.com/@pro9ramQ">
            フェイクドキュメンタリー「Q」
          </a>
          の『
          <a href="https://www.youtube.com/watch?v=sTEB5N9ysf0&t=803s">
            隠しリンク
          </a>
          』を見て作った作品です。
        </p>
        <p>
          それ以外の意味では、この作品はフェイクドキュメンタリ「Q」とは一切関係ありません。
        </p>
      </div>
      <div id="top-credit">
        <p>
          制作：意識ひくひくゲーム制作同好会（代表：淡中圏
          &lt;tannakaken@gmail.com&gt;）
        </p>
      </div>
    </div>
  );
};
