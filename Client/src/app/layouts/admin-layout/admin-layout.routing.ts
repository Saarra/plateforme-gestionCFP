import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { GestionFormateursComponent } from 'src/app/pages/gestion-formateurs/gestion-formateurs.component';
import { GestionApprenantsComponent } from 'src/app/pages/gestion-apprenants/gestion-apprenants.component';
import { GestionFormationsComponent } from 'src/app/pages/gestion-formations/gestion-formations.component';
import { GestionEmploisComponent } from 'src/app/pages/gestion-emplois/gestion-emplois.component';
import { AjoutEmploisComponent } from 'src/app/pages/ajout-emplois/ajout-emplois.component';
import { ReservationsComponent } from 'src/app/pages/reservations/reservations.component';
import { ListFeedbacksComponent } from 'src/app/pages/list-feedbacks/list-feedbacks.component';
import { CatalogueComponent } from 'src/app/pages/Catelogue1/catalogue/catalogue.component';
import { ActivitesComponent } from 'src/app/pages/activites/activites.component';
import { QuizComponent } from 'src/app/pages/quiz/quiz.component';
import { ListFormationsComponent } from 'src/app/pages/list-formations/list-formations.component';
import { FeedbackComponent } from 'src/app/pages/feedback/feedback.component';
import { GestionCoursComponent } from 'src/app/pages/gestion-cours/gestion-cours.component';
import { AjoutCoursComponent } from 'src/app/pages/ajout-cours/ajout-cours.component';
import { AjoutTestComponent } from 'src/app/pages/ajout-test/ajout-test.component';
import { CvComponent } from 'src/app/cvTech/cv/cv.component';
import { DynamicChartComponent } from 'src/app/pages/dynamic-chart/dynamic-chart.component';
import { ChatComponent } from 'src/app/pages/chat/chat.component';
import {FormationHomeComponent} from '../../pages/formation-home/formation-home.component';
import {CoursByFormationComponent} from '../../pages/Cours/cours-by-formation/cours-by-formation.component';
import {AjoutReservationComponent} from '../../pages/reservations/ajout-reservation/ajout-reservation.component';
import {AjoutCvComponent} from '../../cvTech/ajout-cv/ajout-cv.component';
import {FormationApprenantComponent} from '../../pages/formation-apprenant/formation-apprenant.component';
import {TestComponent} from '../../pages/test/test.component';
import {ReponseComponent} from '../../pages/reponse/reponse.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'gestion-formateurs',   component: GestionFormateursComponent },
    { path: 'gestion-apprenants',   component: GestionApprenantsComponent },
    { path: 'gestion-formations',   component: GestionFormationsComponent },
    { path: 'gestion-emplois',   component: GestionEmploisComponent },
    { path: 'list-reseravtion',   component: ReservationsComponent },
    { path: 'ajout-reservation',   component: AjoutReservationComponent },
    { path: 'cv',   component: CvComponent },
    { path: 'ajout-cv',   component: AjoutCvComponent },
    { path: 'stat',   component: DynamicChartComponent },
    { path: 'list-feedbacks',   component: ListFeedbacksComponent },
    { path: 'activites',   component: ActivitesComponent },
    { path: 'quiz/:idTest',   component: QuizComponent },
    { path: 'reponse',   component: ReponseComponent},
    { path: 'tests',   component: TestComponent },
    { path: 'formation-inscrit',   component: FormationApprenantComponent },
    { path: 'list-formations',   component: ListFormationsComponent },
    //{path: 'gestion-cours', component: CoursByFormationComponent},
    { path: 'feedback',   component: FeedbackComponent },
    { path: 'gestion-cours',   component: GestionCoursComponent },
    { path: 'ajout-cours',   component: AjoutCoursComponent },
    { path: 'ajout-test',   component: AjoutTestComponent },
    { path: 'ajout-emplois',   component: AjoutEmploisComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'chat',          component: ChatComponent },
    { path: 'FormationHome',          component: FormationHomeComponent },
];
