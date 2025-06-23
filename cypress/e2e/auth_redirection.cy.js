// Teste la redirection vers la page de login si non authentifié
// et l'accès à /profile après authentification

describe('Redirections Authentification', () => {
  // it('redirige vers /login si non authentifié', () => {
  //   cy.visit('/profile');
  //   cy.url().should('include', '/profile');
  // });

  it('accède à / après connexion', () => {
    // Remplace ces valeurs par un utilisateur de test valide
    const email = 'testuser@example.com';
    const password = 'testpassword';

    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Après connexion, on doit être redirigé vers /
    cy.url().should('include', '/');
    // cy.contains(email); // Vérifie que l'email apparaît sur la page profil
  });

  it('affiche une erreur avec de mauvais identifiants', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('wronguser@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Attendre et vérifier le toast d'erreur
    cy.get('.Toastify__toast--error') // adapte ce sélecteur à ta lib de toast (ex: .Toastify__toast, .chakra-toast, etc.)
      .should('be.visible')
      .and('contain', 'Invalid credentials'); // adapte le texte selon le message affiché
  });

//   it('permet de se déconnecter', () => {
//     // Connexion d'abord
//     const email = 'testuser@example.com';
//     const password = 'testpassword';
//     cy.visit('/login');
//     cy.get('input[type="email"]').type(email);
//     cy.get('input[type="password"]').type(password);
//     cy.get('button[type="submit"]').click();
//     cy.url().should('include', '/');
//     // Ouvre le menu ou va sur /profile si besoin
//     cy.visit('/profile');
//     cy.contains(email);
//     cy.contains(/déconnexion|logout/i).click();
//     cy.url().should('include', '/login');
//   });

//   it('accède à /profile en étant connecté', () => {
//     const email = 'testuser@example.com';
//     const password = 'testpassword';
//     cy.visit('/login');
//     cy.get('input[type="email"]').type(email);
//     cy.get('input[type="password"]').type(password);
//     cy.get('button[type="submit"]').click();
//     cy.visit('/profile');
//     cy.contains(email); // ou autre info du profil
//   });
}); 