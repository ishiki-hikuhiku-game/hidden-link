import { Link } from "react-router-dom";
import "./Top.screen.css";

export const TopScreen = () => {
  return (
    <div id="top-container">
      <h1 id="top-title">無限隠しリンク</h1>
      <div id="top-description">
        <p>
          <Link to="/pages/1">このリンク</Link>
          の先にあるページ群はWeb上で偶然発見されました。
        </p>
        <p>
          一見、何もない空白のページのようですが、
          よく調べると隠しリンクがあり、別のよく似たページに飛びます。
        </p>
        <p>
          そのページにも同様に隠しリンクがあり、それがどこまでも続くのです。
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
          それ以外の意味では、この作品はフェイクドキュメンタリー「Q」、その他実在の人物・組織・出来事とは一切関係ありません。
        </p>
        <p>
          <a href="https://github.com/ishiki-hikuhiku-game/hidden-link">
            ソースコード
          </a>
        </p>
      </div>
      <div id="top-credit">
        <hr />
        <p>
          制作：
          <a href="https://github.com/ishiki-hikuhiku-game">
            意識ひくひくゲーム制作同好会
          </a>
          <br />
          （代表：淡中圏 &lt;tannakaken@gmail.com&gt;）
        </p>
      </div>
    </div>
  );
};
