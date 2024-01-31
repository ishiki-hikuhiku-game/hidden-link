/**
 * URLのクエリ文字列から乱数のシードを取得
 */
export const parseParameter = (parameter: string) => {
    const num = parseInt(parameter.substring(1), 10);
    if (isNaN(num)) {
      return 0;
    } else {
      return num;
    }
  };