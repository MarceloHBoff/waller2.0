function orderDesc<T>(a: T[], b: T[], index: string): 1 | -1 | 0 {
  if (b[index] < a[index]) return -1;
  if (b[index] > a[index]) return 1;
  return 0;
}

export function Sorting<T>(
  getOrder: string,
  getOrderBy: string,
): (a: T[], b: T[]) => number {
  return getOrder === 'desc'
    ? (a, b) => orderDesc<T>(a, b, getOrderBy)
    : (a, b) => -orderDesc<T>(a, b, getOrderBy);
}

export function SortArray<T>(
  array: T[],
  sorting: (a: T[], b: T[]) => number,
): T[] {
  const stabilizedArray = array.map((el: T, index: number) => [el, index]);

  stabilizedArray.sort((a: T[], b: T[]) => {
    const element = sorting(a[0], b[0]);

    if (element !== 0) return element;

    return a[1] - b[1];
  });

  return stabilizedArray.map(el => el[0]);
}
