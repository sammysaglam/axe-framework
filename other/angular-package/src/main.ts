import 'reflect-metadata';
import 'zone.js';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app/app.module';

if (process.env.isProduction) enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);