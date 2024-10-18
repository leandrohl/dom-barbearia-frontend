export interface OrderItem {
  type: string;
  value: string;
  amount: number;
  serviceId?: string;
  productId?: string;
  employeeId?: string;
}
