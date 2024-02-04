import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { randomHtml } from "../assets/assets";
import { LCGRandom } from "../helpers/random.helper";
import { useNavigate, useParams } from "react-router-dom";
import { near } from "../helpers/geometry.helper";
import { parseParameter } from "../helpers/url.helper";
import "./Page.screen.css";

declare global {
  interface Window {
    showAnswer: () => void;
    goNext1: () => void;
    goNext2: () => void;
  }
}

const targetX = (rand: LCGRandom) => rand.nextUnder(window.innerWidth);
const targetY = (rand: LCGRandom) => rand.nextUnder(window.innerHeight * 2);
const colorDiff = (rand: LCGRandom) => rand.nextUnder(10);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
};

type PathParams = {
  pageId: string;
};

export const PageScreen = () => {
  const { pageId } = useParams<PathParams>();
  // 乱数を生成機を作成
  const seed = parseParameter(pageId);
  // 注意：この定数をuseMemoすると、状態が持ち越しされるので再レンダリング時に結果が変わる。
  const rand = new LCGRandom(seed);

  // 一つ目の隠しリンクの作成
  const targetX1 = targetX(rand);
  const targetY1 = targetY(rand);
  const next = rand.next();

  // 二つ目の隠しリンクを作ることもある。
  const targetX2 = seed % 7 === 0 ? targetX(rand) : targetX1;
  const targetY2 = seed % 7 === 0 ? targetY(rand) : targetY1;
  const next2 = seed % 7 === 0 ? rand.next() : next;

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
  const goNext1 = useCallback(() => {
    setIsOnLink1(false);
    navigate(`/pages/${next}`);
    scrollToTop();
  }, [next, navigate]);
  const goNext2 = useCallback(() => {
    setIsOnLink1(false);
    navigate(`/pages/${next2}`);
    scrollToTop();
  }, [next2, navigate]);
  const onClick: MouseEventHandler = useCallback(() => {
    if (isOnLink1) {
      goNext1();
    } else if (isOnLink2) {
      goNext2();
    }
  }, [isOnLink1, isOnLink2, goNext1, goNext2]);
  const isOnLink = isOnLink1 || isOnLink2;

  // 背景の色を微妙に変える。
  const red = colorDiff(rand);
  const green = colorDiff(rand);
  const blue = colorDiff(rand);

  useEffect(() => {
    const showAnswer = () => {
      if (next === next2) {
        console.log(targetX1, targetY1);
      } else {
        console.log("一つ目", targetX1, targetY1);
        console.log("二つ目", targetX2, targetY2);
      }
    };
    window.showAnswer = showAnswer;
    window.goNext1 = goNext1;
    window.goNext2 = goNext2;
  }, [targetX1, targetY1, targetX2, targetY2, next, next2, goNext1, goNext2]);

  const __html = randomHtml(seed);
  return (
    <div
      className={isOnLink ? "void hidden-link" : "void"}
      onMouseMove={onMouseMove}
      onClick={onClick}
      style={{
        background: `linear-gradient(rgb(${red},${green},${blue}), gray)`,
      }}
      dangerouslySetInnerHTML={{
        __html,
      }}
    />
  );
};
