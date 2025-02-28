export interface Appointment {
    id: number;
    clientId: number;
    employeeId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentStatusId: number;
    googleEventId: string;
    serviceIds: number[];
    storeId: number;
  }
  