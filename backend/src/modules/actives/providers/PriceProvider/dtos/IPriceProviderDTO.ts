export default interface IPriceProviderDTO {
  code: string;
  name: string;
  type: string;
  price: number;
  last_price?: number;
}
