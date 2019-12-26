import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';

// import { DefaultInterceptor } from '@core';
// import { StartupService } from '@core';
// export function StartupServiceFactory(startupService: StartupService) {
//   return () => startupService.load();
// }

import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { JWT_TOKEN, JwtInterceptor } from '@core';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@core/redux/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '@core/redux/effects';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { NgApexchartsModule } from 'ng-apexcharts';
export function tokenGetter() {
  return localStorage.getItem(JWT_TOKEN);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    NgApexchartsModule,
    ThemeModule,
    RoutesModule,
    FormlyModule.forRoot(),
    ToastrModule.forRoot(),

    // NgApexchartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:44333'],
        blacklistedRoutes: ['localhost:44333/api/auth'],
      },
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // StartupService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: StartupServiceFactory,
    //   deps: [StartupService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
