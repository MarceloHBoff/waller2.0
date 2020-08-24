export default interface ICreateUserActiveDTO {
  user_id: string;
  type: string;
  code: string;
  quantity: number;
  buy_price: number;
  buy_date: Date;
  automatic?: boolean;
}
