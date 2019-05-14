export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: Manager;
}

export interface Manager {
  auth_token: string;
  name: string;
  id: string;
  email: string;
}

export interface EmployeesResponse {
  data: Employee[];
}

export interface Employee {
  created_at: string;
  id: number;
  name: string;
  status: 'not_working' | 'working';
  username: string;
}

export interface ShiftsResponse {
  data: {
    data: Shift[];
  };
}

export interface Shift {
  attributes: {
    data: Date;
    employee_name: string;
    id: number;
  };
  id: number;
  type: 'shifts';
}

export type ActivitiesResponse = any;
