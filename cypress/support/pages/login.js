export class loginES {

  loginform(user, pass) {
   // cy.contains('Manager').click()
    cy.get('#username')
      .type('*****')
      .get('#password')
      .type('*****')

    cy.contains('Login').click()
    cy.wait(1000)
  }
}

export const login = new loginES()
