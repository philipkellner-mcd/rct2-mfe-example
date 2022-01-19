import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { buildRoutes } from "../utils/route-utils";
import { Microfrontend } from "./microfrontend.model";

@Injectable({ providedIn: "root" })
export class MicrofrontendService {
  microfrontends: Microfrontend[];

  constructor(private router: Router) {}

  /*
   * Initialize is called on app startup to load the initial list of
   * remote microfrontends and configure them within the router
   */
  initialise(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.microfrontends = this.loadConfig();
      this.router.resetConfig(buildRoutes(this.microfrontends));
      resolve();
    });
  }

  /*
   * This is just an hardcoded list of remote microfrontends, but could easily be updated
   * to load the config from a database or external file
   */
  loadConfig(): Microfrontend[] {
    return [
      {
        // For Loading
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        remoteName: "profile",
        exposedModule: "ProfileModule",

        // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes
        displayName: "Profile",
        routePath: "profile",
        ngModuleName: "ProfileModule",
      },
      {
        // For Loading
        remoteEntry: "http://localhost:4301/rctpap.js",
        remoteName: "productAndPricing",
        exposedModule: "ProductAndPricingModule",

        // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes
        displayName: "ProductAndPricing",
        routePath: "productAndPricing",
        ngModuleName: "ProductAndPricingModule",
      },
      {
        // For Loading
        remoteEntry: "http://localhost:4401/bremenu.js",
        remoteName: "menu",
        exposedModule: "MenuModule",

        // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes
        displayName: "menu",
        routePath: "menu",
        ngModuleName: "MenuModule",
      },
    ];
  }
}
