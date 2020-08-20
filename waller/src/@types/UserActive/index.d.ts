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

export interface IActiveTypes {
  [key: string]: number;
}

export interface IUserActivesResponse {
  actives: IUserActives[];
  types: IActiveTypes;
  totals: {
    investment: number;
    currentValue: number;
    profit: number;
    percent: number;
  };
}
