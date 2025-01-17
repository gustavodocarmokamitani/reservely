export interface Service {
  id: number;
  name: string;
  description: string;
  value: string;
  durationMinutes: string;
  active: string;
  storeId: number;
}

export interface ServiceServiceType {
  id: number,
  name: string,
  description: string,
  value: number,
  active: boolean,
  durationMinutes: number,
  services: [{
    id: number,
    serviceTypeId: number,
    storeId: number
  }]
}
