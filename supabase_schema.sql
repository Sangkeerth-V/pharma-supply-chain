-- Supabase schema for pharma-chain
-- Corrected SQL statements for users, medicines, batches, shipments, transactions,
-- ownership_history, verification_logs, indexes, trigger, and basic RLS.

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manufacturer', 'distributor', 'pharmacy', 'consumer')),
  company_name VARCHAR(255),
  wallet_address VARCHAR(255) UNIQUE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_name VARCHAR(255) NOT NULL,
  manufacturer_id UUID NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_medicine_manufacturer FOREIGN KEY (manufacturer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL,
  batch_number VARCHAR(255) UNIQUE NOT NULL,
  manufacture_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  blockchain_batch_id BIGINT UNIQUE,
  qr_code TEXT,
  current_owner UUID,
  status VARCHAR(50) DEFAULT 'MANUFACTURED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_batch_medicine FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE,
  CONSTRAINT fk_batch_owner FOREIGN KEY (current_owner) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  shipment_status VARCHAR(50) DEFAULT 'PENDING',
  tracking_number VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_shipment_batch FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT fk_shipment_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_shipment_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  tx_hash VARCHAR(255) NOT NULL UNIQUE,
  action_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_transaction_batch FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ownership_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  previous_owner UUID,
  new_owner UUID,
  tx_hash VARCHAR(255),
  transferred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_owner_history_batch FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT fk_previous_owner FOREIGN KEY (previous_owner) REFERENCES users(id),
  CONSTRAINT fk_new_owner FOREIGN KEY (new_owner) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  verified_by UUID,
  verification_result BOOLEAN DEFAULT TRUE,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_verification_batch FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT fk_verified_user FOREIGN KEY (verified_by) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_batches_batch_number ON batches(batch_number);
CREATE INDEX IF NOT EXISTS idx_batches_owner ON batches(current_owner);
CREATE INDEX IF NOT EXISTS idx_shipments_batch ON shipments(batch_id);
CREATE INDEX IF NOT EXISTS idx_transactions_batch ON transactions(batch_id);
CREATE INDEX IF NOT EXISTS idx_ownership_batch ON ownership_history(batch_id);
CREATE INDEX IF NOT EXISTS idx_verification_batch ON verification_logs(batch_id);

CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_update_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER medicines_update_trigger
  BEFORE UPDATE ON medicines
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER batches_update_trigger
  BEFORE UPDATE ON batches
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER shipments_update_trigger
  BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownership_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_users_read_users" ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_read_medicines" ON medicines
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_read_batches" ON batches
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_read_shipments" ON shipments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_read_transactions" ON transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_read_ownership_history" ON ownership_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_read_verification_logs" ON verification_logs
  FOR SELECT
  TO authenticated
  USING (true);
