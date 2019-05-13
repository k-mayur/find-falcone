/* eslint-disable no-undef */
describe("app test", () => {
  it("welcome text on homepage", () => {
    cy.visit("http://localhost:3000").contains("Find Falcone");
  });
});
