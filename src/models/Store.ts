export interface Store {
    id: number;
    name: string;
    address: string;
    status: boolean;
    operatingHours: string;
    multipleAppointments: boolean;
    closingDays: string[];
    operatingDays: string[];
    paymentMethods: number[];
  }
  