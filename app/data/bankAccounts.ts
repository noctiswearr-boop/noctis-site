export type BankAccount = {
  id: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  isDefault: boolean;
};

export const bankAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "Banka adı buraya gelecek",
    accountHolder: "Ad Soyad / NOCTIS",
    iban: "TR00 0000 0000 0000 0000 0000 00",
    isDefault: true,
  },
];