export interface Store {
    id: number;
    storeCode: string;
    name: string;
    address: string;
    status: boolean;
    operatingHours: string;
    closingDays: string[];
    operatingDays: string[];
    paymentMethods: number[];
  }
  