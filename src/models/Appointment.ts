export interface Appointment {
    id: number;
    clientId: number;
    employeeId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentStatusId: number;
    serviceIds: number[];
    storeId: number;
  }
  