import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Medicine, Batch, Shipment } from '@/types/database.types';

// ==========================================
// 1. MEDICINES HOOKS
// ==========================================

export function useMedicines() {
    return useQuery({
        queryKey: ['medicines'],
        queryFn: async (): Promise<Medicine[]> => {
            const { data, error } = await supabase
                .from('medicines')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return data || [];
        },
    });
}

export function useCreateMedicine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newMedicine: Omit<Medicine, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('medicines')
                .insert([newMedicine])
                .select();

            if (error) throw new Error(error.message);
            return data[0];
        },
        onSuccess: () => {
            // Invalidate the cache to trigger an immediate, seamless UI update
            queryClient.invalidateQueries({ queryKey: ['medicines'] });
        },
    });
}

// ==========================================
// 2. BATCHES HOOKS
// ==========================================

export function useBatches(roleFilter?: string, userId?: string) {
    return useQuery({
        queryKey: ['batches', roleFilter, userId],
        queryFn: async (): Promise<Batch[]> => {
            let query = supabase.from('batches').select('*');

            if (roleFilter === 'manufacturer' && userId) {
                query = query.eq('current_owner_id', userId);
            }

            const { data, error } = await query.order('created_at', { ascending: false });
            if (error) throw new Error(error.message);
            return data || [];
        },
    });
}

// ==========================================
// 3. SHIPMENTS HOOKS
// ==========================================

export function useShipments() {
    return useQuery({
        queryKey: ['shipments'],
        queryFn: async (): Promise<Shipment[]> => {
            const { data, error } = await supabase
                .from('shipments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return data || [];
        },
    });
}

export function useUpdateShipmentStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: Shipment['status'] }) => {
            const { data, error } = await supabase
                .from('shipments')
                .update({ status })
                .eq('id', id)
                .select();

            if (error) throw new Error(error.message);
            return data[0];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shipments'] });
            queryClient.invalidateQueries({ queryKey: ['batches'] });
        },
    });
}