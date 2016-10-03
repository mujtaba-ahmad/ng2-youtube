import { Component, AfterViewInit } from '@angular/core';
import { YoutubePlayerComponent } from './youtube-player.component';
import { YoutubeBarComponent } from './youtube-bar.component';

@Component({
  selector: 'my-app',
  template: `<h1>My First Angular App</h1>
            <youtube-player></youtube-player>
			<youtube-bar></youtube-bar>`
})
export class AppComponent implements AfterViewInit{ 
	ngAfterViewInit() {
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[6];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}
