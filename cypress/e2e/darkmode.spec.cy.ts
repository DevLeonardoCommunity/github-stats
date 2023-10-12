describe("DarkMode test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(3000);
    cy.get('[data-testid="darkModeButton"]').click();
  });

  it("should select light Mode", () => {
    cy.get('[data-testid="light-mode-option"]').click();
    cy.get("html").should("have.data", "theme", "light");
  });

  it("should select dark mode", () => {
    cy.get('[data-testid="dark-mode-option"]').click();
    cy.get("html").should("have.data", "theme", "custom-dark");
  });

  it("should select system preference", () => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: true,
            assListener: () => {},
          });
      },
    });
    cy.wait(3000);
    cy.get('[data-testid="darkModeButton"]').click();
    cy.get('[data-testid="system-mode-option"]').click();
    cy.get("html").should("have.data", "theme", "custom-dark");
  });
});
