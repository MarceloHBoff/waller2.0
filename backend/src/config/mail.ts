interface IMailConfig {
  driver: 'ethereal';
  defautls: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defautls: {
    from: {
      name: 'Equipe GoBarber',
      email: 'equipe@gobarber.com.br',
    },
  },
} as IMailConfig;
