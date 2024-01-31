/**
 * 乱数の挙動を再現性のあるものにするためXorShiftによる乱数を作成する。
 *
 * @see https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
 */
export class MyRandom {
    x: number;
    y: number;
    z: number;
    w: number;
  
    constructor(seed = 88675123) {
      this.x = 123456789;
      this.y = 362436069;
      this.z = 521288629;
      this.w = seed;
    }
  
    // XorShift
    next() {
      const t = this.x ^ (this.x << 11);
      this.x = this.y;
      this.y = this.z;
      this.z = this.w;
      return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
    }
  }