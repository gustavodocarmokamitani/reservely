export interface Appointment {
    id: number;
    clientId: number;
    employeeId: number;
    appointmentDate: Date;
    appointmentStatusId: number;
    serviceIds: number[];
    storeId: number;
  }
  