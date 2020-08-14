///<reference path="../node_modules/@types/node/index.d.ts" />
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/Home/app.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map