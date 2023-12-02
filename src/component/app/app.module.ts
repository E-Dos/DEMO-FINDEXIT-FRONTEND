import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbButtonModule, NbIconModule, NbCardModule, NbDialogModule, NbContextMenuModule, NbMenuModule, NbThemeModule, NbToastrModule, NbFormFieldModule, NbInputModule, NbSpinnerModule, NbDatepickerModule, NbLayoutComponent } from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';
import { NbAuthJWTToken, NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenLocalStorage, NbTokenService, NbTokenStorage } from '@nebular/auth';
import { environment } from 'src/component/environments/environment';
import { LoginComponent } from 'src/component/auth/login/login.component';
import { FooterComponent } from 'src/component/layout/footer/footer.component';
import { HeaderComponent } from 'src/component/layout/header/header.component';
import { TasksListModalComponent } from '../tasks/tasks-list-modal/tasks-list-modal.component';
import { EmployeeListComponent } from '../employee/employee-list/employee-list.component';
import { EmployeeModalComponent } from '../employee/employee-modal/employee-modal.component';
import { TasksModalComponent } from '../tasks/tasks-modal/tasks-modal.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { DigitDatePipe } from '../pipes/digit-date.pipe';
registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
const apiUrl = environment.apiUrl;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeModalComponent,
    TasksListModalComponent,
    TasksModalComponent,
    DigitDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    NbCardModule,
    NbInputModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      format: 'dd.MM.yyyy'
    }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: "token"
          },
          baseEndpoint: `${apiUrl}auth/`,
          login: {
            endpoint: 'login',
            method: 'post',
          },
          logout: {
            endpoint: 'logout',
            method: 'post',
            redirect: {
              success: 'login'
            }
          },
        }),
      ],
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    NbAuthService,
    NbTokenService,
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
