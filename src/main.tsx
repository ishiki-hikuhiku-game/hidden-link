import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
declare global {
  interface Console {
    hint: () => void;
  }
}

const hints = [
  "隠し要素は、画像３つ、音声１つ",
  "３つ目の画像は目に見えない",
  "試しに画像をダウンロードしてみよう。呪われるのが怖くなければ……",
];

const makeHintFunction = () => {
  let count = 0;
  return () => {
    const hint = hints[count];
    count = (count + 1) % hints.length;
    return hint;
  };
};

console.hint = makeHintFunction();

console.log(`
      ここに
      console.hint();
      と書いてみて。
      `);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
