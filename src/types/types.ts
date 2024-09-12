export interface Product {
  _id: string;
  name: string;
  price: number;
  stockQuantity: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  _id: string;
  products: OrderItem[];
  status: string;
  tracking?: TrackingInfo;
}

export interface TrackingInfo {
  company: string;
  trackingNumber: string;
}

export interface ProductsResponse {
  products: Product[];
  totalItems: number;
}

export interface OrdersResponse {
  orders: Order[];
  totalItems: number;
}

export interface OrderResponse {
  data: Order;
}

export interface ApiError {
  message: string;
}

export type CreateOrderFunc = (orderData: Order) => Promise<OrderResponse>;
export type UpdateOrderStatusFunc = (
  orderId: string,
  status: string
) => Promise<OrderResponse>;
export type UpdateOrderShippingFunc = (
  orderId: string,
  tracking: TrackingInfo
) => Promise<OrderResponse>;
