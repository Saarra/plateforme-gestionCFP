import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule,
         ToastNoAnimation,
         ToastNoAnimationModule
       } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { GestionFormateursComponent } from './pages/gestion-formateurs/gestion-formateurs.component';
import { GestionApprenantsComponent } from './pages/gestion-apprenants/gestion-apprenants.component';
import { GestionFormationsComponent } from './pages/gestion-formations/gestion-formations.component';
import { GestionEmploisComponent } from './pages/gestion-emplois/gestion-emplois.component';
import { AjoutEmploisComponent } from './pages/ajout-emplois/ajout-emplois.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ListFeedbacksComponent } from './pages/list-feedbacks/list-feedbacks.component';
import { CatalogueComponent } from './pages/Catelogue1/catalogue/catalogue.component';
import { ActivitesComponent } from './pages/activites/activites.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ListFormationsComponent } from './pages/list-formations/list-formations.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { GestionCoursComponent } from './pages/gestion-cours/gestion-cours.component';
import { AjoutCoursComponent } from './pages/ajout-cours/ajout-cours.component';
import { AjoutTestComponent } from './pages/ajout-test/ajout-test.component';
import { AuthInterceptorProvider } from './services/auth.interceptor';
import { CvComponent } from './cvTech/cv/cv.component';
import { DetailCvComponent } from './cvTech/detail-cv/detail-cv.component';
import { ItemCvComponent } from './cvTech/item-cv/item-cv.component';
import { ListeCvComponent } from './cvTech/liste-cv/liste-cv.component';
import { ChartsModule } from 'ng2-charts';
import { DynamicChartComponent } from './pages/dynamic-chart/dynamic-chart.component';
import { DefaultImagePipe } from './cvTech/default-image.pipe';
import { EmbaucheComponent } from './cvTech/embauche/embauche.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {ConfirmationService, ConfirmDialogModule, DialogModule, RadioButtonModule, TableModule} from 'primeng';
import {BrowserModule} from '@angular/platform-browser';
import {NgSelect2Module} from 'ng-select2';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatTooltipModule
} from '@angular/material';
import { CatelogueDetailComponent } from './pages/Catelogue1/catelogue-detail/catelogue-detail.component';
import { FormationHomeComponent } from './pages/formation-home/formation-home.component';
import { CoursByFormationComponent } from './pages/Cours/cours-by-formation/cours-by-formation.component';
import { AjoutReservationComponent } from './pages/reservations/ajout-reservation/ajout-reservation.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from 'ngx-mat-datetime-picker';
import {DatePipe} from '@angular/common';
import { ListApprenantsComponent } from './pages/gestion-formations/list-apprenants/list-apprenants.component';
import { AjoutCvComponent } from './cvTech/ajout-cv/ajout-cv.component';
import { FormationApprenantComponent } from './pages/formation-apprenant/formation-apprenant.component';
import { TestComponent } from './pages/test/test.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReponseComponent } from './pages/reponse/reponse.component';
import { GalleriaComponent } from './pages/galleria/galleria.component';
import { GalleriaModule } from 'primeng/galleria';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { FormationCourComponent } from './pages/formation-apprenant/formation-cour/formation-cour.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config),
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    NgSelect2Module,
    TooltipModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatStepperModule,
    RadioButtonModule,
    MatButtonModule,
    GalleriaModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    GestionFormateursComponent,
    GestionApprenantsComponent,
    GestionFormationsComponent,
    GestionEmploisComponent,
    AjoutEmploisComponent,
    ReservationsComponent,
    ListFeedbacksComponent,
    CatalogueComponent,
    ActivitesComponent,
    QuizComponent,
    ListFormationsComponent,
    FeedbackComponent,
    GestionCoursComponent,
    AjoutCoursComponent,
    AjoutTestComponent,
    CvComponent,
    DetailCvComponent,
    ItemCvComponent,
    ListeCvComponent,
    DynamicChartComponent,
    DefaultImagePipe,
    EmbaucheComponent,
    ChatComponent,
    CatelogueDetailComponent,
    FormationHomeComponent,
    CoursByFormationComponent,
    AjoutReservationComponent,
    ListApprenantsComponent,
    AjoutCvComponent,
    FormationApprenantComponent,
    TestComponent,
    ReponseComponent,
    GalleriaComponent,
    FormationCourComponent,
  ],
  providers: [
    AuthInterceptorProvider,ConfirmationService,DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
