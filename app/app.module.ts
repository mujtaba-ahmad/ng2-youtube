import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { YoutubePlayerComponent } from './youtube-player.component';
import {WindowRef} from './window';
import { YoutubeService } from './youtube-player.service';
import { YoutubeBarComponent } from './youtube-bar.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, YoutubePlayerComponent, YoutubeBarComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ WindowRef, YoutubeService ]
})

export class AppModule { }