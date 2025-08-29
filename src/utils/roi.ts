export const calculateROI = (
  initial: number,
  final: number,
  years: number
): number => {
  return ((final / initial) ** (1 / years) - 1) * 100;
};
