import orderReducer, { initialState, submitOrder, getOrders } from './orderSlice';

describe('orderReducer', () => {
    it('should handle submitOrder.pending', () => {
        const nextState = orderReducer(initialState, {
            type: submitOrder.pending.type,
            payload: undefined,
        });
        expect(nextState.isLoading).toBe(true);
        expect(nextState.error).toBe(null);
    });
    
        it('should handle submitOrder.fulfilled', () => {
            const payload = { order: { number: 12345 } };
            const nextState = orderReducer(initialState, {
                type: submitOrder.fulfilled.type,
                payload,
            });
            expect(nextState.isLoading).toBe(false);
            expect(nextState.orderNumber).toBe(12345);
            expect(nextState.error).toBe(null);
        });
    
        it('should handle submitOrder.rejected', () => {
            const error = { message: 'Something went wrong' };
            const nextState = orderReducer(initialState, {
                type: submitOrder.rejected.type,
                error,
            });
            expect(nextState.isLoading).toBe(false);
            expect(nextState.error).toBe('Something went wrong');
            expect(nextState.orderNumber).toBe(null);
        });
    
        it('should handle getOrders.pending', () => {
            const nextState = orderReducer(initialState, {
                type: getOrders.pending.type,
                payload: undefined,
            });
            expect(nextState.isLoading).toBe(true);
            expect(nextState.error).toBe(null);
        });
    
        it('should handle getOrders.fulfilled', () => {
            const payload = { orderNumber: 12345 };
            const nextState = orderReducer(initialState, {
                type: getOrders.fulfilled.type,
                payload,
            });
            expect(nextState.isLoading).toBe(false);
            expect(nextState.currentOrder).toEqual(payload);
        });
    
        it('should handle getOrders.rejected', () => {
            const error = { message: 'Failed to get orders' };
            const nextState = orderReducer(initialState, {
                type: getOrders.rejected.type,
                error,
            });
            expect(nextState.isLoading).toBe(false);
            expect(nextState.error).toBe('Failed to get orders');
        });
});
