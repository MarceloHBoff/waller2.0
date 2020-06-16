export default interface IPriceProviderDTO {
  code: string;
  name: string;
  // type: 'Acao' | 'Stock' | 'ETF' | 'FII' | 'Reit' | 'Bond';
  type: string;
  price: number;
  lastPrice?: number;
}
