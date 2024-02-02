import { MyRandom } from "../helpers/random.helper";

const comment = `
<!-- ここになんか小説を書く。 -->
`

const image = `
<p>この人を見かけませんでしたか。</p>
<img src="/photo1.jpg" />
`

const assets = ["", image, comment];

export const randomHtml = (random: MyRandom) => {
    const randomValue = Math.abs(random.next()) % assets.length; 
    return assets[randomValue];
}