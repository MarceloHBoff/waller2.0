export default interface ICreateManyDTO {
  active_id?: string;
  type: 'jscp' | 'dividends';
  EX_date: Date | undefined;
  pay_date: Date | undefined;
  value: number;
}
