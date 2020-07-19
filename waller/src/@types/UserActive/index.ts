export interface IUserActives {
  quantity: number;
  buyPrice: number;
  active: {
    id: string;
    type: string;
    code: string;
    name: string;
    price: number;
    lastPrice: number;
  };
}

export interface IUserActivesResponse {
  actives: IUserActives[];
  types: {
    Acao: number;
    Stock: number;
    ETF: number;
    FII: number;
    Reit: number;
    Bond: number;
  };
  totals: {
    investment: number;
    currentValue: number;
    profit: number;
    percent: number;
  };
}
