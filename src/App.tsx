import { useCallback, useState, MouseEventHandler } from "react";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { novel1 } from "./assets/novel";
import { near } from "./helpers/geometry.helper";
import { MyRandom } from "./helpers/random.helper";
import { parseParameter } from "./helpers/url.helper";

const targetX = (rand: MyRandom) => Math.abs(rand.next()) % window.innerWidth;
const targetY = (rand: MyRandom) =>
  Math.abs(rand.next()) % (window.innerHeight * 2);
const colorDiff = (rand: MyRandom) => Math.abs(rand.next()) % 10;

const returnTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
};

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
      returnTop();
    } else if (isOnLink2) {
      setIsOnLink2(false);
      navigate({ search: `?${next2}` });
      returnTop();
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
