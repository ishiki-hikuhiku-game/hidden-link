/**
 * Park & Milleが「より良い他の選択肢が無いのならばこれを使うべき」とした実装の定数。
 * @see https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E5%90%88%E5%90%8C%E6%B3%95
 */
const A = 48271;

/**
 * Park & Milleが「より良い他の選択肢が無いのならばこれを使うべき」とした実装の定数。
 * @see https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E5%90%88%E5%90%8C%E6%B3%95
 */
const BASE = 4294967295;

/**
 * JavaScriptが提供する乱数はシードを指定できないので、再現性がない（毎回結果が変わる）。
 * 今回の用途では再現性が必要なので、乱数を自分で自分で実装する必要がある。
 * 
 * 候補としては、メルセンヌ・ツイスター、XorShift、線形合同法（Linear congruential generators, LCGs）などがあったが、
 * 
 * - メルセンヌ・ツイスターは良い性質を持っていることで知られているが、実装が複雑
 * - XorShiftは実装の楽さの割に良い性質を持っていることで知られているが、シードでは内部状態を指定しきれず、
 * 前回の出力を次回のシードに入れても、前回の続きにはならない。
 * そのせいで、今回XorShiftを使うと、短いループが発生してしまうことがあったので、使わないことにした。
 * - 線形合同法は実装がとても簡単だが、ビット列の低い方でのランダムさが低いなど、あまり良い性質を持たないことから最近は使われない。
 * しかし、今回は乱数としての良い性質がそれほど重要ではない（見た目に乱数っぽければ良い）ので採用することにした。
 * 
 * 線形合同法の実装についてはWikipediaを参考にした。
 * @see https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E5%90%88%E5%90%8C%E6%B3%95
 * 
 * XorShiftでの実装の例として以下のサイトがある。XorShiftで試すときに参考にした。
 * @see https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
 */
export class MyRandom {
  /**
   * 前回の乱数
   */
  previous: number;

  constructor(seed = 88675123) {
    this.previous = seed;
  }

  /**
   * 
   * @returns 次の乱数
   */
  next() {
    return (this.previous = (A * this.previous) % BASE);
  }

  /**
   * 
   * @param min
   * @param max 
   * @returns min以上、max以下の次の乱数
   */
  nextBetween(min: number, max: number) {
    const r = this.next();
    return min + (r % (max + 1 - min));
  }

  /**
   * 
   * @param max 
   * @returns max以下の次の乱数
   */
  nextUnder(max: number) {
    return this.nextBetween(0, max);
  }

}