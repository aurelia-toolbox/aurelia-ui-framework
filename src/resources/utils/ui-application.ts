import {singleton, autoinject} from "aurelia-framework";
import {Redirect, Router} from "aurelia-router";
import {getLogger} from "aurelia-logging";
import {UIUtils} from "./ui-utils";
import {UIEvent} from "./ui-event";
import {UIConstants} from "./ui-constants";

@singleton()
@autoinject()
export class UIApplication {

  private logger;

  public isBusy: boolean = false;

  constructor(public router: Router) {
    this.logger = getLogger('UIApplication');
    this.logger.info('Initialized');
  }

  navigate(hash, options?) {
    this.logger.info("navigate::" + hash);
    this.router.navigate(hash, options);
  }

  navigateTo(route, params = {}, options?) {
    this.logger.info("navigateTo::" + route);
    this.router.navigateToRoute(route, params, options);
  }

  routeActive(route) {
    return route.isActive || route.href == location.hash ||
      location.hash.indexOf(route.config.redirect || 'QWER') > -1;
  }

  /** App Constants **/
  private authUser;
  private authToken;
  private autenticated;

  get AuthUser() {
    return this.authUser;
  }

  set AuthUser(v) {
    this.authUser = v;
  }

  get AuthToken() {
    return this.authToken;
  }

  set AuthToken(v) {
    this.authToken = v;
  }

  get Authenticated() {
    return this.autenticated;
  }

  set Authenticated(v) {
    this.autenticated = v;
  }

  login(user, route?) {
    this.AuthUser = user.username;
    this.AuthToken = user.token;
    this.Authenticated = true;

    this.persist('AppUsername', user.username);
    this.persist('AppPassword', user.password);

    this.navigateTo(route || 'home');
    UIEvent.broadcast('auf:login');
  }
  logout() {
    this.AuthUser = null;
    this.AuthToken = null;
    UIEvent.broadcast('auf:logout');
    this.persist('AppPassword', null);
    this.Authenticated = false;
    this.navigateTo('login');
  }

  private sharedState = {};
  shared(key, value: any = '§') {
    if (value === '§') {
      return this.sharedState[key];
    }
    else if (value === null) {
      delete this.sharedState[key];
    }
    else {
      this.sharedState[key] = value;
    }
    return null;
  }

  /** Session State **/
  session(key, value: any = '§') {
    if (window.sessionStorage) {
      if (value === '§') {
        return JSON.parse(window.sessionStorage.getItem(UIConstants.App.Key + ':' + key));
      }
      else if (value === null) {
        window.sessionStorage.removeItem(UIConstants.App.Key + ':' + key);
      }
      else {
        window.sessionStorage.setItem(UIConstants.App.Key + ':' + key, JSON.stringify(value));
      }
    }
    return null;
  }

  clearSession() {
    if (window.sessionStorage) window.sessionStorage.clear();
  }

  /** Persistent State **/
  persist(key, value: any = '§') {
    if (window.localStorage) {
      if (value === '§') {
        return JSON.parse(window.localStorage.getItem(UIConstants.App.Key + ':' + key));
      }
      else if (value === null) {
        window.localStorage.removeItem(UIConstants.App.Key + ':' + key);
      }
      else {
        window.localStorage.setItem(UIConstants.App.Key + ':' + key, JSON.stringify(value));
      }
    }
    return null;
  }

  /** Logger **/
  info(tag, msg, ...rest) {
    this.logger.info(`${tag}::${msg}`, rest);
  }

  warn(tag, msg, ...rest) {
    this.logger.warn(`${tag}::${msg}`, rest);
  }

  debug(tag, msg, ...rest) {
    this.logger.debug(`${tag}::${msg}`, rest);
  }

  error(tag, msg, ...rest) {
    this.logger.error(`${tag}::${msg}`, rest);
  }

  /** Toasts / Alerts **/
  toast(config, container?) {
    if (typeof config === 'string') config = { message: config };
    if (container) config.container = container;
    UIUtils.toast(config);
  }

  toastSuccess(config, container?) {
    if (typeof config === 'string') config = { message: config };
    config.theme = 'success';
    config.glyph = config.glyph || 'ui-alert-exclaim';
    if (container) config.container = container;
    UIUtils.toast(config);
  }

  toastError(config, container?) {
    if (typeof config === 'string') config = { message: config };
    config.theme = 'danger';
    config.glyph = config.glyph || 'ui-alert-error';
    if (container) config.container = container;
    UIUtils.toast(config);
  }


  alert(config) {
    if (typeof config === 'string') config = { message: config };
    config.glyph = config.glyph || 'ui-alert-info';
    return UIUtils.alert(config);
  }
  confirm(config) {
    if (typeof config === 'string') config = { message: config };
    config.glyph = config.glyph || 'ui-alert-question';
    return UIUtils.confirm(config);
  }
  prompt(config) {
    if (typeof config === 'string') config = { message: config };
    return UIUtils.prompt(config);
  }
}


@singleton()
@autoinject()
export class AuthInterceptor {
  private logger;

  constructor(public appState: UIApplication) {
    this.logger = getLogger('AuthInterceptor');
    this.logger.info('Initialized');
    UIEvent.subscribe('auf:unauthorized', () => appState.navigateTo('login', { status: 401 }));
  }

  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because this includes child routes.
    if (routingContext.getAllInstructions()
      .some(i => i.config.auth)) {
      if (!this.appState.Authenticated) {
        this.logger.warn('Not authenticated');
        let url = routingContext.router.generate('login', { status: 401 });
        this.appState.Authenticated = false;
        this.appState.session('AppCurrentRoute', [routingContext.config.route, routingContext.params]);
        this.appState.session('AppCurrentFragment', routingContext.fragment);
        return next.reject(new Redirect(url));
      }
    }

    return next();
  }
}
