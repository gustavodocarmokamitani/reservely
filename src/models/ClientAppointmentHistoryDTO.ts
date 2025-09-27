export interface ClientAppointmentHistoryDTO {
  appointmentId: number;
  storeName: string;
  storeCode: string;
  appointmentDate: string;  
  appointmentTime: string;
  appointmentStatus: string;  
  employeeName: string;
  professionalPhoneNumber: string;
  totalPrice: number;  
  services: { name: string; value: number }[];
}
