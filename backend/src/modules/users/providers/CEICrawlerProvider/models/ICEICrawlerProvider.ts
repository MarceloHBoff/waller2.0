export default interface ICEICrawlerProvider {
  findUserActivesByCEI(user_id: string): Promise<void>;
}
