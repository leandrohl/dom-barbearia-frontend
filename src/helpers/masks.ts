import Masker from 'vanilla-masker';

function maskCPF(cpf: string): string {
  return cpf ? Masker.toPattern(cpf, '999.999.999-99') : '';
}

function maskCEP(cep: string): string {
  return cep ? Masker.toPattern(cep, '99999-999') : '';
}

function maskPhone(phone: string): string {
  return phone ? Masker.toPattern(phone, '(99) 99999-9999') : '';
}

function maskDate(data: string): string {
  const partsData = data.split('-');

  if (partsData.length === 3) {
      const formattedDate = `${partsData[2]}/${partsData[1]}/${partsData[0]}`;
      return formattedDate;
  }

  return data;
}

function maskMoney(value: string | number): string {
  const unmaskedValue = (typeof value === 'number' ? value : parseFloat(value)) * 100;

  return Masker.toMoney(unmaskedValue, {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: 'R$',
    suffixUnit: '',
  });
}

const MaskService = {
  maskCPF,
  maskCEP,
  maskMoney,
  maskDate,
  maskPhone
};

export default MaskService;
