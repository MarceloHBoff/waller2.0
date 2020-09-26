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
      name: 'Equipe Waller',
      email: 'equipe@waller.com.br',
    },
  },
} as IMailConfig;
