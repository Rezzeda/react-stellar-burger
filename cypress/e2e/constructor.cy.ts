import {BASE_URL} from '../../src/utils/api'

const selectors = {
  ingredients: '[data-cy="ingredients"]',
  constructor: '[data-cy="constructor"]',
  orderButton: '[data-cy="order-button"]',
  bunTop: '[data-cy="bun-top"]',
  bunBottom: '[data-cy="bun-bottom"]',
  constructorIngredients: '[data-cy="constructor-ingredients"]',
  orderNumber: '[data-cy="order-number"]',
  closeModal: '[data-cy="close-modal"]'
};

//типы ингредиентов
const BUN_1 = "Булка 1";
const BUN_2 = "Булка 2";
const FILLING_1 = "Начинка 1";
const FILLING_2 = "Начинка 2";
const ORDER_NUMBER = "123456";

Cypress.Commands.add("dragIngredientToConstructor", ingredient => {
  cy.get(selectors.ingredients).contains(ingredient).trigger("dragstart");
  cy.get(selectors.constructor).trigger("drop");
});

Cypress.Commands.add("createOrder", () => {
  cy.dragIngredientToConstructor(BUN_1);
  cy.dragIngredientToConstructor(FILLING_1);
  cy.dragIngredientToConstructor(FILLING_2);
  cy.get(selectors.orderButton).click();
});

describe("correct drag&drop from ingredients to constructor", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}ingredients`, { fixture: "ingredients-example.json" });
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("should drag bun to constructor", () => {
    cy.dragIngredientToConstructor(BUN_1);
    cy.get(selectors.bunTop).contains(BUN_1).should("exist");
    cy.get(selectors.bunBottom).contains(BUN_1).should("exist");
  });

  it("should change the bun in constructor", () => {
    cy.dragIngredientToConstructor(BUN_1);
    cy.get(selectors.bunTop).contains(BUN_1).should("exist");
    cy.get(selectors.bunBottom).contains(BUN_1).should("exist");
    cy.dragIngredientToConstructor(BUN_2);
    cy.get(selectors.bunTop).contains(BUN_1).should("not.exist");
    cy.get(selectors.bunBottom).contains(BUN_1).should("not.exist");
    cy.get(selectors.bunTop).contains(BUN_2).should("exist");
    cy.get(selectors.bunBottom).contains(BUN_2).should("exist");
  });
  
  it("should drag ingredients to constructor", () => {
    cy.dragIngredientToConstructor(FILLING_1);
    cy.dragIngredientToConstructor(FILLING_2);
    cy.get(selectors.constructorIngredients).contains(FILLING_1).should("exist");
    cy.get(selectors.constructorIngredients).contains(FILLING_2).should("exist");
  });
});

describe("correctly creates order", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}ingredients`, { fixture: "ingredients-example.json" });
    cy.intercept("GET", `${BASE_URL}auth/user`, { fixture: "login-example.json" });
    cy.intercept("POST", `${BASE_URL}orders`, { fixture: "order-example.json" });
    cy.setCookie("accessToken", "mockAccessToken");
    cy.setCookie("refreshToken", "mockRefreshToken");
    cy.viewport(1920, 1080);
    cy.visit("/");
  });
  afterEach(() => {
    cy.clearCookies();
  });

  it("should create an order & open order-modal", () => {
    cy.createOrder();
    cy.get(selectors.orderNumber).contains(ORDER_NUMBER).should("exist");
  });

  it("should clear constructor after accepting an order", () => {
    cy.createOrder();
    cy.get(selectors.closeModal).click();
    cy.get(selectors.orderNumber).should("not.exist");
    cy.get(selectors.constructorIngredients).contains(FILLING_1).should("not.exist");
  });
});