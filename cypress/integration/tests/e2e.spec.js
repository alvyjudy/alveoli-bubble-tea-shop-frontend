const HOME = "http://localhost:3001/"

describe('new user flow', ()=>{

  beforeEach(()=>{
    cy.visit(HOME)
  })

  it("Sign up", ()=>{
    cy
    .get("[data-cy=SignUpButton]")
    .should("have.text", "Sign up")
    .click()

    cy
    .get('[data-cy="Email address"]')
    .type("test1@mail.com")

    cy
    .get('[data-cy="Password"]')
    .type("password")
    
    cy
    .get('[data-cy="SubmitSignup"]')
    .should("have.text", "Sign up")
    .click()

    cy
    .url()
    .should("equal", HOME)

    cy
    .get('[data-cy="LogOutButton"]')
    .click()

    cy
    .get("[data-cy=SignUpButton]")
    .click()

    cy
    .get('[data-cy="LogInInsteadOfSignUp"]')
    .click()

    cy
    .get('[data-cy="Email address"]')
    .type("test1@mail.com")

    cy
    .get('[data-cy="Password"]')
    .type("password");

    cy
    .get("[data-cy=SubmitLogin]")
    .click();

    cy
    .url()
    .should("equal", HOME);

    cy
    .get('[data-cy="Products"]')
    .click()

    cy
    .get('[data-cy="ProductThumbnail"]')
    .first()
    .click()

    cy
    .get('[data-cy="AddToCartButton"]')
    .click()

    cy
    .get('[data-cy="OrderName"]')
    .type("alvy")

    cy
    .get('[data-cy="Address"]')
    .type("1 Kingston Rd")

    cy
    .get('[data-cy="Phone"]')
    .type("1231231234")

    cy
    .get('[data-cy="CheckOutButton"]')
    .click()

    cy
    .url()
    .should('equal', HOME + "orders")
  })

})