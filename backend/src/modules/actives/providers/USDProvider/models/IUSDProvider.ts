export default interface IUSDProvider {
  getUSD(): Promise<number>;
}
