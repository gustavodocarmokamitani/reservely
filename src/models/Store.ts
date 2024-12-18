export interface Store {
    id: number;
    name: string;
    address: string;
    status: boolean;
    openingTime: string;
    closingDays: string[];
    openingDays: string[];
    paymentMethod: number[];
  }
  