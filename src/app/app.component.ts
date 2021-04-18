import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crm-app-frontend';
  showNavbar: any = true;
  routes: string[] = ['/', '/register'];
  constructor(private router: Router) {}
  ngOnInit() {
    this.onDetectRoute();
  }
  onDetectRoute() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const currentRoute = event.url.includes('?')
          ? event.url.substring(0, event.url.indexOf('?'))
          : event.url;
        this.showNavbar = !!!this.routes.some(
          (route) => currentRoute === route
        );
      }
    });
  }
}

// onDetectRoute() {
//   this.router.events.subscribe((event: any) => {
//     if (event instanceof NavigationStart) {
//       const currentRoute = event.url.includes("?")
//         ? event.url.substring(0, event.url.indexOf("?"))
//         : event.url;
//       this.showNavbar = !!!this.routes.some(
//         (route) => currentRoute === route
//       );
//       window.scrollTo(0, 0);
//     }
//     if (event instanceof RouteConfigLoadStart) {
//       this.showLoader = true;
//     } else if (event instanceof RouteConfigLoadEnd) {
//       this.showLoader = false;
//     }
//   });
// }

// routes: string[] = [
//   "/login",
//   "/"
// ];
// import {
// Router,
// NavigationStart,
// RouteConfigLoadStart,
// RouteConfigLoadEnd,
// } from "@angular/router";
