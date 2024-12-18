// src/models/Servico.ts
export interface Service {
  id: number;
  name: string;
  description: string;
  value: string;
  durationMinutes: string;
  active: string;
  storeId: number;
}