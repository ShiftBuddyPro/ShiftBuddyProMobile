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

export interface ShiftResponse {
  data: {
    data: Shift;
    included: Array<ShiftItem>;
  };
}

export type ShiftItem = PaidOut &
  CashDrop &
  Note &
  Check &
  ChangeSheet &
  InventoryItem;

export interface PaidOut {
  id: number;
  type: 'paid_out';
  attributes: {
    company: string;
    amount: number;
  };
}

export interface CashDrop {
  id: number;
  type: 'cash_drop';
  attributes: {
    amount: number;
    number: number;
    created_at: Date;
  };
}

export interface Note {
  id: number;
  type: 'note';
  attributes: {
    message: string;
    title: string | null;
  };
}

export interface Check {
  id: number;
  type: 'check';
  attributes: {
    company: string;
    amount: number;
    number: number;
  };
}

export interface ChangeSheet {
  id: number;
  type: 'change_sheet';
  attributes: {
    start_pennies: number;
    start_nickels: number;
    start_dimes: number;
    start_quarters: number;
    start_ones: number;
    start_fives: number;
    start_tens: number;
    start_twenties: number;

    end_pennies: number;
    end_nickels: number;
    end_dimes: number;
    end_quarters: number;
    end_ones: number;
    end_fives: number;
    end_tens: number;
    end_twenties: number;
    [key: string]: number;
  };
}

export interface InventoryItem {
  id: number;
  type: 'inventory_item';
  attributes: {
    name: string;
    start_amount: number;
    end_amount: number;
  };
}

export interface Shift {
  attributes: {
    created_at: Date;
    employee_id: number;
    employee_name: string;
    id: number;
  };
  id: number;
  type: 'shifts';
}

export type ActivitiesResponse = any;
