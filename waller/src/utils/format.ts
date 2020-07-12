import numeral from 'numeral';
import 'numeral/locales/pt-br';

numeral.locale('pt-br');

export function formatPrice(number: number | undefined): string {
  if (number) {
    return `R$ ${numeral(number).format('0,0.00')}`;
  }

  return '';
}

export const round10 = (num, places = 2) => {
  if (!`${num}`.includes('e')) {
    return +`${Math.round(`${num}e+${places}`)}e-${places}`;
  }
  const arr = `${num}`.split('e');
  let sig = '';
  if (+arr[1] + places > 0) {
    sig = '+';
  }

  return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + places}`)}e-${places}`;
};
