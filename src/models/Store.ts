export interface Store {
    id: number;
    name: string;
    address: string;
    status: boolean;
    operatingHours: string;
    closingDays: string[];
    operatingDays: string[];
    paymentMethod: number[];
  }
  