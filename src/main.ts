import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (true){
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => { 
    console.error('Runtime error during bootstrap application');
    console.error(err);
  }
    );
}
else {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
}

  