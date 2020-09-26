export default interface ICEICrawlerProvider {
  findUserActivesByCEI(
    user_id: string,
    cpf: string,
    password: string,
  ): Promise<void>;
  closeCrawler(): Promise<void>;
}
