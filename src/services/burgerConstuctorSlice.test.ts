import { addBun, addIngredient, removeIngredient, reorderIngredient, clearBurger } from './burgerConstuctorSlice';
import burgerConstructorReducer, { initialState } from './burgerConstuctorSlice';

const testBun = {
    _id: "1",
    name: "Test bun",
    type: "bun",
    image: "bun",
    price: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    uniqueId: "1",
};

const testOtherIngredient = {
    _id: "2",
    name: "Test other ingredient",
    type: "other",
    image: "other",
    price: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    uniqueId: "2",
};

const testAnotherIngredient = {
    _id: "3",
    name: "Test another ingredient",
    type: "other",
    image: "other",
    price: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    uniqueId: "3",
};

const stateWithIngredients = {
    ...initialState,
    burgerBuns: [testBun],
    otherIngredients: [ testOtherIngredient, testAnotherIngredient ],
};

describe('burgerConstructorSlice reducer', () => {
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should add a bun', () => {
        expect(burgerConstructorReducer(initialState, addBun(testBun))).toEqual({
            ...initialState,
            burgerBuns: [testBun],
        });
    });

    it('should add an ingredient', () => {
        expect(burgerConstructorReducer(initialState, addIngredient (testOtherIngredient))).toEqual({
            ...initialState,
            otherIngredients: [testOtherIngredient],
        });
    });

    it('should remove an ingredient', () => {
        expect(burgerConstructorReducer(stateWithIngredients, removeIngredient(testOtherIngredient))).toEqual({
            ...initialState,
            burgerBuns: [testBun],
            otherIngredients: [testAnotherIngredient],
        });
    });

    it('should reorder ingredients', () => {
        const dragIndex = 0; // индекс перемещаемого элемента
        const hoverIndex = 1; // индекс элемента, на который перемещается перемещаемый элемент
        //ожидаем, что изменится порядок ингредиентов
        expect(burgerConstructorReducer(stateWithIngredients, reorderIngredient({ from: dragIndex, to: hoverIndex }))).toEqual({
            ...initialState,
            burgerBuns: [testBun],
            otherIngredients: [testAnotherIngredient, testOtherIngredient],
        });
    });

    it('should clear the burger', () => {
        expect(burgerConstructorReducer(stateWithIngredients, clearBurger())).toEqual(initialState);
    });
});