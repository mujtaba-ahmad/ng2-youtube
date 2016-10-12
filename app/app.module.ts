import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }   from './app.component';
import { YoutubePlayerComponent } from './youtube-player.component';
import {WindowRef} from './window';
import { YoutubeService } from './youtube-player.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, YoutubePlayerComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ WindowRef, YoutubeService ]
})

export class AppModule { }