/**
 * URLのクエリ文字列から乱数のシードを取得
 */
export const parseParameter = (parameter: string | undefined) => {
  if (parameter === undefined) {
    return 0;
  }
  const num = parseInt(parameter, 10);
  if (isNaN(num)) {
    return 0;
  } else {
    return num;
  }
};