/**
 * URLのクエリ文字列から乱数のシードを取得
 * 
 * シードは1以上の自然数。
 * 
 * そうでない値は1にする。
 */
export const parseParameter = (parameter: string | undefined) => {
  if (parameter === undefined) {
    return 1;
  }
  const num = parseInt(parameter, 10);
  if (isNaN(num) || num === 0) {
    return 1;
  } else {
    return num;
  }
};