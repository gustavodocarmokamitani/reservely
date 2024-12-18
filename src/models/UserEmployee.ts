// src/models/Profissional.ts
export interface UserEmployee {
  id: number;
  userId: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  active: string;
  servicesId: number[];
  password: string;
  userTypeId: number;
}

export interface UserEmployeeUpdate {
  id: number;
  employeeId: number; 
  userTypeId: number;
  userId: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  active: string;
  servicesId: number[];
  password: string;
}