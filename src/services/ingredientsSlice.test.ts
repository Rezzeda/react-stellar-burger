import ingredientsReducer, { initialState, fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should fetch ingredients pending', () => {
        const nextState = ingredientsReducer(initialState, fetchIngredients.pending);
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBe(null);
    });

    it('should fetch ingredients fulfilled', () => {
        const fakeIngredients = [{ id: '1', name: 'Ingredient 1' }, { id: '2', name: 'Ingredient 2' }];
        const nextState = ingredientsReducer(initialState, fetchIngredients.fulfilled(fakeIngredients, 'requestId'));
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(null);
        expect(nextState.allIngredients).toEqual(fakeIngredients);
    });

    it('should fetching ingredients rejected', () => {
        const errorMessage = 'Failed to fetch ingredients';
        const nextState = ingredientsReducer(initialState, fetchIngredients.rejected(new Error(errorMessage), 'requestId'));
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(errorMessage);
    });
});
