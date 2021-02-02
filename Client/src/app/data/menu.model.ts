
export const NAVROUTES:  any = [
  { role: 'admin', path: '/dashboard', title: 'Tableau de bord',  icon: 'ni-tv-2 text-primary', class: '' },
  { role: 'admin', path: '/user-profile', title: 'Gestion du profil',  icon: 'ni-single-02 text-yellow', class: '' },
  { role: 'admin', path: '/gestion-formateurs', title: 'Gestion des formateurs',  icon: 'ni-settings-gear-65 text-red', class: '' },
  { role: 'admin', path: '/gestion-apprenants', title: 'Gestion des apprenants',  icon: 'ni-settings-gear-65 text-red', class: '' },
  { role: 'admin', path: '/gestion-formations', title: 'Gestion des formations',  icon: 'ni-settings-gear-65 text-red', class: '' },
  { role: 'admin', path: '/gestion-emplois', title: 'Gestion des emplois du temps',  icon: 'ni-settings-gear-65 text-red', class: '' },
  { role: 'admin', path: '/list-reseravtion', title: 'Consulter les réservations du matériels',  icon: 'ni-bell-55 text-info', class: '' },
  { role: 'admin', path: '/cv', title: 'CVs Formateurs',  icon: 'ni-badge text-warning', class: '' },
  { role: 'admin', path: '/ajout-cv', title: 'Ajouter Curriculum Vitae formateur',  icon: 'ni-badge text-info', class: '' },
  { role: 'admin', path: '/list-feedbacks', title: 'Consulter Feed-backs',  icon: 'ni-satisfied text-default', class: '' },
  { role: 'admin', path: '/stat', title: 'Consulter les statistiques ',  icon: 'ni-chart-pie-35 text-red', class: '' },

  // apprenant menu
  { role: 'apprenant', path: '/dashboard', title: 'Tableau de bord',  icon: 'ni-tv-2 text-primary', class: '' },
  { role: 'apprenant', path: '/user-profile', title: 'Gestion du profil',  icon: 'ni-single-02 text-yellow', class: '' },
  { role: 'apprenant', path: '/FormationHome', title: 'Inscrire à une formation',  icon: 'ni-settings-gear-65 text-red', class: '' },
  { role: 'apprenant', path: '/formation-inscrit', title: 'Mes formations',  icon: 'ni-bullet-list-67 text-success', class: '' },
  { role: 'apprenant', path: '/tests', title: 'Test',  icon: 'ni-paper-diploma text-red', class: '' },
  { role: 'apprenant', path: '/feedback', title: 'Envoyer Feed-back',  icon: 'ni-satisfied text-success', class: '' },

  // formateur menu
  { role: 'formateur', path: '/dashboard', title: 'Tableau de bord',  icon: 'ni-tv-2 text-primary', class: '' },
  { role: 'formateur', path: '/user-profile', title: 'Gestion du profil',  icon: 'ni-single-02 text-yellow', class: '' },
  { role: 'formateur', path: '/list-formations', title: 'La liste des formations',  icon: 'ni-bullet-list-67 text-red', class: '' },
  { role: 'formateur', path: '/gestion-cours', title: 'Gestion des cours',  icon: 'ni-settings-gear-65 text-blue', class: '' },
  { role: 'formateur', path: '/ajout-test', title: 'Créer test',  icon: 'ni-paper-diploma text-green', class: '' },
  { role: 'formateur', path: '/reponse', title: 'Les réponses du test',  icon: 'ni-paper-diploma text-red', class: '' },
  { role: 'formateur', path: '/list-reseravtion', title: 'Réserver matériels',  icon: 'ni-single-copy-04 text-default', class: '' },
  { role: 'formateur', path: '/ajout-cv', title: 'Votre Curriculum Vitae',  icon: 'ni-badge text-warning', class: '' },
  { role: 'formateur', path: '/feedback', title: 'Envoyer Feed-back',  icon: 'ni-satisfied text-success', class: '' },
];
