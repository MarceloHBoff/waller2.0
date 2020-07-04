export default interface ICreateUserBondDTO {
  user_id: string;
  name: string;
  buyPrice: number;
  nowPrice: number;
  dueDate: Date;
}
