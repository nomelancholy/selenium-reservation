describe('The Home Page', () => {
    it('ticket link loads', () => {
      cy.visit('http://www.ticketlink.co.kr/') // change URL to match your dev URL
    })
  })

  describe('Login', () => {
    it('login', () => {
      cy.get('h1').click() // change URL to match your dev URL
    })
  })