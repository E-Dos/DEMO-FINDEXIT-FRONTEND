import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbButtonModule, NbIconModule, NbCardModule, NbDialogModule, NbUserModule, NbContextMenuModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbAuthJWTToken, NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenLocalStorage, NbTokenService, NbTokenStorage } from '@nebular/auth';
import { RoleProvider } from 'src/component/services/role.service';
import { environment } from 'src/component/environments/environment';
import { LoginComponent } from 'src/component/auth/login/login.component';
import { RegisterComponent } from 'src/component/auth/register/register.component';
import { FooterComponent } from 'src/component/layout/footer/footer.component';
import { HeaderComponent } from 'src/component/layout/header/header.component';
import { SidebarComponent } from 'src/component/layout/sidebar/sidebar.component';
const apiUrl = environment.apiUrl;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
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
    NbCardModule,
    NbDialogModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: "token"
          },
          validation: {
            password: {
              required: true,
              minLength: 6,
              maxLength: 25,
            },
            email: {
              required: true,
            },
          },
          baseEndpoint: `${apiUrl}auth/`,
          login: {

            endpoint: 'login',
            method: 'post',
          },
          register: {
            endpoint: 'register',
            method: 'post',
          },
          logout: {
            endpoint: 'logout',
            method: 'post',
            redirect:{
              success:'login'}

          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          strategy: 'email',
          rememberMe: true,
          showMessages: {
            success: true,
            error: true,
          },
          socialLinks: [],
        },
        register: {
          redirectDelay: 0,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          terms: true,
          socialLinks: [],
        },
      },
    }),
  ],
  providers: [
    NbAuthService,
    NbTokenService,
    {
      provide: NbTokenStorage,
      useClass: NbTokenLocalStorage
    },
    RoleProvider,
    { provide: NbRoleProvider, useClass: RoleProvider },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
