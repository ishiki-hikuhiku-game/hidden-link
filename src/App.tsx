import { useCallback, useState, MouseEventHandler } from "react";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { novel1 } from "./novel";

/**
 * 目標にこれだけ近づければカーソルの表示をポインターに変えて、隠しリンクのクリックを許可する閾値
 */
const THRESHOLD = 6400;

/**
 * 距離が十分近いかどうかを判定
 */
const near = (x1: number, y1: number, x2: number, y2: number): boolean => {
  const diffX = x1 - x2;
  const diffY = y1 - y2;
  if (diffX * diffX + diffY * diffY < THRESHOLD) {
    return true;
  }
  return false;
};

/**
 * 乱数の挙動を再現性のあるものにするためXorShiftによる乱数を作成する。
 *
 * @see https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
 */
class MyRandom {
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

/**
 * URLのクエリ文字列から乱数のシードを取得
 */
const parseParameter = (parameter: string) => {
  const num = parseInt(parameter.substring(1), 10);
  if (isNaN(num)) {
    return 0;
  } else {
    return num;
  }
};

const targetX = (rand: MyRandom) => Math.abs(rand.next()) % window.innerWidth;
const targetY = (rand: MyRandom) =>
  Math.abs(rand.next()) % (window.innerHeight * 2);
const colorDiff = (rand: MyRandom) => Math.abs(rand.next()) % 10;

function App() {
  // 乱数を生成機を作成
  const parameter = useLocation().search;
  const seed = parseParameter(parameter);
  const rand = new MyRandom(seed);

  // 一つ目の隠しリンクの作成
  const targetX1 = targetX(rand);
  const targetY1 = targetY(rand);
  const next = rand.next();

  // 二つ目の隠しリンクを作ることもある。
  const targetX2 = next % 11 === 0 ? targetX(rand) : targetX1;
  const targetY2 = next % 11 === 0 ? targetY(rand) : targetY1;
  const next2 = next % 11 === 0 ? rand.next() : next;

  // 隠しリンクの挙動をコントロールする。
  const [isOnLink1, setIsOnLink1] = useState(false);
  const [isOnLink2, setIsOnLink2] = useState(false);
  const navigate = useNavigate();
  const onMouseMove: MouseEventHandler = useCallback(
    (event) => {
      if (
        near(
          event.nativeEvent.pageX,
          event.nativeEvent.pageY,
          targetX1,
          targetY1
        )
      ) {
        setIsOnLink1(true);
        setIsOnLink2(false);
      } else if (
        near(
          event.nativeEvent.pageX,
          event.nativeEvent.pageY,
          targetX2,
          targetY2
        )
      ) {
        setIsOnLink2(false);
        setIsOnLink1(false);
      } else {
        setIsOnLink1(false);
        setIsOnLink2(false);
      }
    },
    [targetX1, targetY1, targetX2, targetY2]
  );
  const onClick: MouseEventHandler = useCallback(() => {
    if (isOnLink1) {
      setIsOnLink1(false);
      navigate({ search: `?${next}` });
    } else if (isOnLink2) {
      setIsOnLink2(false);
      navigate({ search: `?${next2}` });
    }
  }, [isOnLink1, isOnLink2, navigate, next, next2]);
  const isOnLink = isOnLink1 || isOnLink2;

  // 背景の色を微妙に変える。
  const red = colorDiff(rand);
  const green = colorDiff(rand);
  const blue = colorDiff(rand);
  return (
    <div
      className={isOnLink ? "void hidden-link" : "void"}
      onMouseMove={onMouseMove}
      onClick={onClick}
      style={{
        background: `linear-gradient(rgb(${red},${green},${blue}), gray)`,
      }}
      dangerouslySetInnerHTML={{
        __html: `
      <!-- ${novel1} -->`,
      }}
    />
  );
}

export default App;
