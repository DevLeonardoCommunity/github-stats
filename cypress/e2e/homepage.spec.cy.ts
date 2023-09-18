describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has the Sign In button on the navbar", () => {
    cy.get(".navbar-end > .btn").contains("Sign in");
  });
});
