import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService, AppSettings } from '@core';
import { LoaderErrorService } from '@core/services/loader-error.service';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { NgxSpinnerService } from 'ngx-spinner';

const WIDTH_BREAKPOINT = '960px';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('content', { static: true }) content: MatSidenavContent;
  public color = 'darkred';
  options = this.settings.getOptions();
  sidenavCollapsed = false;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  contentWidthFix = true;
  @HostBinding('class.matero-content-width-fix') get widthFix() {
    return this.contentWidthFix && this.options.navPos === 'side' && !this.isOver;
  }

  // Demo purposes only
  @HostBinding('class.theme-dark') get themeDark() {
    return this.options.theme === 'dark';
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private settings: SettingsService,
    private overlay: OverlayContainer,
    private store: Store<IAppState>,
    private spinner: NgxSpinnerService
  ) {
    // Set dir attr on body
    document.body.dir = this.options.dir;

    this.mobileQuery = this.media.matchMedia(`(max-width: ${WIDTH_BREAKPOINT})`);
    this.mobileQueryListener = () => this.cdr.detectChanges();
    /**
     * Safari & IE don't support `addEventListener`
     * this.mobileQuery.addEventListener('change', this.mobileQueryListener);
     */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);

    // TODO: Scroll top to container
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.content.scrollTo({ top: 0 });
      }
    });
  }

  ngOnInit() {
    setTimeout(() => (this.contentWidthFix = false));
    this.store.select('loader').subscribe(data => {
      this.showSpinner(data.isLoading);
    });
  }
  ngOnDestroy() {
    /**
     * Safari & IE don't support `removeEventListener`
     * this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
     */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  toggleCollapsed() {
    this.sidenavCollapsed = !this.sidenavCollapsed;

    // TODO: Trigger when animation end
    setTimeout(() => {
      this.settings.setNavState('collapsed', this.sidenavCollapsed);
    }, 400);
  }

  openedChange(e: boolean) {
    this.settings.setNavState('opened', e);
  }

  showSpinner(isLoading: boolean = false) {
    if (isLoading) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
  // Demo purposes only
  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.setTheme(options);
    this.setBodyDir(options);
  }
  setTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.overlay.getContainerElement().classList.add('theme-dark');
    } else {
      this.overlay.getContainerElement().classList.remove('theme-dark');
    }
  }
  setBodyDir(options: AppSettings) {
    if (options.dir === 'rtl') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }
}
