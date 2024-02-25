import * as fs from "fs";

fs.readFile("./dist/index.html", { encoding: "utf8" }, (error, data) => {
  if (error) {
    console.warn(error);
    return;
  }
  data = data.replace(
    "</html>",
    `</html>
<!--
    おかしなページを見つけたあなたは、まずはページを右クリックして「ページのソースを表示」を選択した。
    しかしそこに表示されたのは、非常に簡素なHTMKだった。
    body要素の中には<div id="root"></div>しか入っていない。
    これでは、ほぼ空なのと同じだ。
    ちょっと待てよ、その下にscript要素がある。
    どうやらこのページはJavaScriptを使って構築されているらしい。
    それならば、ページのソースを表示しただけでは何もわからない。
    ブラウザの「開発者ツール」を使って、「要素」とか「Elements」と呼ばれる機能を使えば、
    実際に表示されているページと同じHTMLの構造が見られるはずだ。
-->`
  );
  fs.writeFileSync("./dist/index.html", data);
  console.log("Done");
});