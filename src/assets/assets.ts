const comment = `
<!-- 
あなたは開発者ツールを使って、実際に表示されているHTMLの構造を確認した。
ソースを表示しただけよりは少し構造が見えるようになった。
しかし、隠しリンクにあたるタグは見当たらない。
どうやら、隠しリンクは、HTMLにではなく、完全にJavaScriptによって作られているようだ。
しかし、JavaScriptを確認しようにも、人間に読めるものではなかった。
あなたは、せめて何か情報がないかと思って、「コンソール」もしくは「Console」という機能を確認してみる。
-->
`;

/**
 * tensor.artを使い無料で作った画像
 * 
 * low quality, monochrome photo, japanese little girl, horror taste, no face, no eye, empty face, blur face, scratched face, by window, many shadow, ghosts, juon, 
 * 
 * みたいなプロンプトを入れるとこんな感じの画像が出てくる
 */
const image1 = `
<p>この子を見かけませんでしたか。</p>
<img src="/photo1.jpg" />
`;

/**
 * tensor.artを使い無料で作った画像
 * 
 * low quality, monochrome photo, japanese little girl, horror taste, no face, no eye, empty face, blur face, scratched face, by window, many shadow, ghosts, juon, 
 * 
 * みたいなプロンプトを入れるとこんな感じの画像が出てくる
 */
const image2 = `
<p>ありがとうございます。見つかりました。</p>
<img src="/photo2.jpg" />
<img class="hidden" src="/photo3.jpg" />
`;

/**
 * open_jtalkを使って作った読み上げをAudacityを使って加工した。
 */
const sound = `
<audio controls src="/voice.wav" />
`;

const assets = ["", comment, "", "", image2, "", image1, sound];

export const randomHtml = (seed: number) => {
    const randomValue = seed % assets.length;
    return assets[randomValue];
}
