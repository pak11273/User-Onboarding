describe("form test", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const textInput = () => cy.get(".name > label > input");
  const submitBtn = () => cy.get("button");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const checkbox = () => cy.get(".terms > label > input");

  it("should contain valid elements", () => {
    textInput().should("exist");
    submitBtn().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
  });

  describe("input element", () => {
    it("should be empty", () => {
      textInput().should("have.value", "");
    });

    it("should contain the name you provided", () => {
      textInput().type("isaac pak").should("have.value", "isaac pak");
    });
  });

  describe("email element", () => {
    it("email input should be empty", () => {
      emailInput().should("have.value", "");
    });

    it("email should have the email address inputted in it", () => {
      emailInput()
        .type("isaac@email.com")
        .should("have.value", "isaac@email.com");
    });
  });

  describe("password element", () => {
    it("allows you to type a password in it", () => {
      passwordInput().type("password").should("have.value", "password");
    });
  });

  describe("terms", () => {
    it("should allow user to check it", () => {
      checkbox().check().should("be.checked");
    });
  });

  describe("submit", () => {
    it("submitBtn is disabled", () => {
      submitBtn().should("be.disabled");
    });

    it("should let user submit a form if all inputs are valid", () => {
      textInput().type("something");
      emailInput().type("email@something.com");
      passwordInput().type("something");
      checkbox().check();
      submitBtn().should("not.be.disabled");
    });
  });

  describe("validations", () => {
    it("should error on no input for textInput", () => {
      textInput().type(" ");
      submitBtn().should("be.disabled");
    });
    it("should error on no email for emailInput", () => {
      emailInput().type(" ");
      submitBtn().should("be.disabled");
    });
    it("should error on no email for emailInput", () => {
      passwordInput().type(" ");
      submitBtn().should("be.disabled");
    });
    it("should error on no email for emailInput", () => {
      checkbox().uncheck();
      submitBtn().should("be.disabled");
    });
  });
});
