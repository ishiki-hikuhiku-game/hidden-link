import { MyRandom } from "../helpers/random.helper";

const comment = `
<!-- ここになんか小説を書く。 -->
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
`;

const assets = ["", image1, image2, comment];

export const randomHtml = (random: MyRandom) => {
    const randomValue = random.nextUnder(assets.length); 
    return assets[randomValue];
}