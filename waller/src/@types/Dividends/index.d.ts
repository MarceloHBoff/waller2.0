export interface IDividend {
  id: string;
  type: string;
  value: number;
  EX_date: string;
  pay_date: string;
  active: {
    id: string;
    code: string;
    name: string;
    type: string;
    price: number;
    last_price: number;
  };
  active_id?: string;
  quantity: number;
}

export interface IDividendsResponse {
  dividends: IDividend[];
  total: number;
}

export interface IMonthly {
  month: number;
  year: number;
  total: number;
  dividends: IDividend[];
}

export interface IDividendsMonthly {
  dividends: IMonthly[];
  total: number;
}
