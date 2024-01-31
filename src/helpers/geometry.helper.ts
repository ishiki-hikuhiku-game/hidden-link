/**
 * 目標にこれだけ近づければカーソルの表示をポインターに変えて、隠しリンクのクリックを許可する閾値
 */
const THRESHOLD = 6400;

/**
 * 距離が十分近いかどうかを判定
 */
export const near = (x1: number, y1: number, x2: number, y2: number): boolean => {
  const diffX = x1 - x2;
  const diffY = y1 - y2;
  if (diffX * diffX + diffY * diffY < THRESHOLD) {
    return true;
  }
  return false;
};
