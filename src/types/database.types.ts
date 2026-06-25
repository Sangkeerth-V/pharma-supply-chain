export type UserRole = 'admin' | 'manufacturer' | 'distributor' | 'pharmacy' | 'consumer';
export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  company_name: string;
  wallet_address: string | null;
  is_approved: boolean;
  created_at: string;
}

export interface Medicine {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  manufacturer_id: string;
  formula: string;
  requires_refrigeration: boolean;
  created_at: string;
}

export interface Batch {
  id: string;
  medicine_id: string;
  batch_number: string;
  quantity: number;
  manufacturing_date: string;
  expiry_date: string;
  blockchain_hash: string | null;
  current_owner_id: string;
  status: 'active' | 'recalled' | 'depleted';
  created_at: string;
}

export interface Shipment {
  id: string;
  batch_id: string;
  sender_id: string;
  receiver_id: string;
  tracking_number: string;
  status: ShipmentStatus;
  temperature_logs: number[] | null;
  departure_time: string | null;
  arrival_time: string | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  tx_hash: string;
  block_number: number | null;
  sender_wallet: string;
  receiver_wallet: string;
  action_type: string;
  timestamp: string;
}

export interface OwnershipHistory {
  id: string;
  batch_id: string;
  previous_owner_id: string | null;
  new_owner_id: string;
  transaction_id: string | null;
  transferred_at: string;
}

export interface VerificationLog {
  id: string;
  batch_id: string | null;
  scanned_by: string | null; // User ID or null if public consumer
  ip_address: string | null;
  is_authentic: boolean;
  verified_at: string;
}