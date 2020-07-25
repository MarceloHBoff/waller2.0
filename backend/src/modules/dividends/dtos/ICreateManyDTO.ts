export default interface ICreateManyDTO {
  type: 'jscp' | 'dividends';
  EX_date: Date;
  pay_date: Date;
  value: number;
}
