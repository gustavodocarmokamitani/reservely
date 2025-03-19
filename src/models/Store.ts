export interface Store {
    id: number;
    storeCode: string;
    name: string;
    address: string;
    status: boolean;
    multipleAppointments: boolean;
    operatingHours: string;
    closingDays: string[];
    operatingDays: string[];
    paymentMethods: number[];
  }
  