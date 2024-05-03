export class loginES {

  loginform(user, pass) {
   // cy.contains('Manager').click()
    cy.get('#username')
      .type('admin')
      .get('#password')
      .type('F7AviERi')

    cy.contains('Login').click()
    cy.wait(1000)
  }
}

export const login = new loginES()
