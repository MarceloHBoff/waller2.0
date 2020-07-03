export default interface IPriceProviderDTO {
  code: string;
  name: string;
  type: string;
  price: number;
  lastPrice?: number;
}
