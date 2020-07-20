export default interface ICreateUserBondDTO {
  user_id: string;
  name: string;
  buy_price: number;
  now_price: number;
  due_date: Date;
  automatic?: boolean;
}
