export interface Shop {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo_url: string;
  address: string;
  phone: string;
  hours: Record<string, { open: string; close: string }>;
}

export interface Barber {
  id: string;
  name: string;
  photo_url: string;
  bio: string;
  specialties: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  category: string;
}

export interface Slot {
  datetime: string;
  barber_id: string;
  available: boolean;
}

export interface Booking {
  id: string;
  shop_id: string;
  barber_id: string;
  service_id: string;
  datetime: string;
  duration_minutes: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface CreateBookingRequest {
  shop_slug: string;
  barber_id: string;
  service_id: string;
  datetime: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  shop_name: string;
}

export interface LoginResponse {
  token: string;
  shop: Shop;
}
