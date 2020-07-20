export default interface ICreateUserActiveDTO {
  user_id: string;
  code: string;
  quantity: number;
  buy_price: number;
  buy_date: Date;
  automatic?: boolean;
}
