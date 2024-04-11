import {BASE_URL} from '../../src/utils/api'

//типы ингредиентов
const BUN_1 = "Булка 1";
const BUN_2 = "Булка 2";
const FILLING_1 = "Начинка 1";
const FILLING_2 = "Начинка 2";
const ORDER_NUMBER = "123456";

Cypress.Commands.add("dragIngredientToConstructor", ingredient => {
  cy.get('[data-cy="ingredients"]').contains(ingredient).trigger("dragstart");
  cy.get('[data-cy="constructor"]').trigger("drop");
});

Cypress.Commands.add("createOrder", () => {
  cy.dragIngredientToConstructor(BUN_1);
  cy.dragIngredientToConstructor(FILLING_1);
  cy.dragIngredientToConstructor(FILLING_2);
  cy.get('[data-cy="order-button"]').click();
});

// describe('service is available', function() {
//   it('should be available on localhost:3000', function() {
//     cy.viewport(1920, 1080);
//     cy.visit('http://localhost:3000');
//   });

describe("correct drag&drop from ingredients to constructor", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}ingredients`, { fixture: "ingredients-example.json" });
    cy.viewport(1920, 1080);
    cy.visit("/");
  });
  it("should drag bun to constructor", () => {
    cy.dragIngredientToConstructor(BUN_1);
    cy.get('[data-cy="bun-top"]').contains(BUN_1).should("exist");
    cy.get('[data-cy="bun-bottom"]').contains(BUN_1).should("exist");
  });
  it("should change the bun in constuctor", () => {
    cy.dragIngredientToConstructor(BUN_1);
    cy.get('[data-cy="bun-top"]').contains(BUN_1).should("exist");
    cy.get('[data-cy="bun-bottom"]').contains(BUN_1).should("exist");
    cy.dragIngredientToConstructor(BUN_2);
    cy.get('[data-cy="bun-top"]').contains(BUN_1).should("not.exist");
    cy.get('[data-cy="bun-bottom"]').contains(BUN_1).should("not.exist");
    cy.get('[data-cy="bun-top"]').contains(BUN_2).should("exist");
    cy.get('[data-cy="bun-bottom"]').contains(BUN_2).should("exist");
  });
  it("should drag ingredients to constructor", () => {
    cy.dragIngredientToConstructor(FILLING_1);
    cy.dragIngredientToConstructor(FILLING_2);
    cy.get('[data-cy="constructor-ingredients"]').contains(FILLING_1).should("exist");
    cy.get('[data-cy="constructor-ingredients"]').contains(FILLING_1).should("exist");
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
    cy.get('[data-cy="order-number"]').contains(ORDER_NUMBER).should("exist");
  });

  it("should clear constructor after acception an order", () => {
    cy.createOrder();
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="order-number"]').should("not.exist");
    cy.get('[data-cy="constructor-ingredients"]').contains(FILLING_1).should("not.exist");
  });
});