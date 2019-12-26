import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { SidebarComponent } from './user-layout/sidebar/sidebar.component';
import { UserPanelComponent } from './user-layout/sidebar/user-panel.component';
import { SidemenuComponent } from './user-layout/sidemenu/sidemenu.component';
import { AccordionAnchorDirective } from './user-layout/sidemenu/accordionanchor.directive';
import { AccordionDirective } from './user-layout/sidemenu/accordion.directive';
import { AccordionLinkDirective } from './user-layout/sidemenu/accordionlink.directive';
import { SidebarRightComponent } from './user-layout/sidebar-right/sidebar-right.component';
import { HeaderComponent } from './user-layout/header/header.component';
import { BrandingComponent } from './user-layout/header/branding.component';
import { NotificationComponent } from './user-layout/header/notification.component';
import { UserComponent } from './user-layout/header/user.component';
import { TopmenuComponent } from './user-layout/topmenu/topmenu.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CustomizerComponent } from './user-layout/customizer/customizer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    UserLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    SidebarRightComponent,
    HeaderComponent,
    BrandingComponent,
    NotificationComponent,
    UserComponent,
    TopmenuComponent,
    AuthLayoutComponent,
    CustomizerComponent,
  ],
  imports: [SharedModule, NgxSpinnerModule],
})
export class ThemeModule {}
