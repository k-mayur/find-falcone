/* eslint-disable no-undef */
describe("Header", () => {
  it("Title, reset button and home button in header exist", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Finding Falcone");
    cy.get('[data-test="resetBtn"]').click();
    cy.contains("Time taken : 0");
    cy.get('[data-test="homeBtn"]').click();
    cy.contains("Select planets you want to search in :");
  });
});
