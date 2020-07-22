export interface IUserActives {
  quantity: number;
  buy_price: number;
  active: {
    id: string;
    type: string;
    code: string;
    name: string;
    price: number;
    last_price: number;
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
