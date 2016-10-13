import { Component, AfterViewInit } from '@angular/core';
import { YoutubePlayerComponent } from './youtube-player.component';


@Component({
  selector: 'my-app',
  template: `<h1>My First Angular App</h1>
            <youtube-player [id]="id" [apiKey]="apiKey"></youtube-player>{{id}}
			<a href="#" (click)="changeVideo(1)">video 1</a>
			<a href="#" (click)="changeVideo(2)">video 2</a>
			<a href="#" (click)="changeVideo(3)">video 3</a>`
})
export class AppComponent implements AfterViewInit{
	private id: string;
	private title: string;
	private apiKey: string;
	ngAfterViewInit() {
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[6];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	constructor() {
		this.id = "VzjJR6tTx1c";
		this.apiKey = "AIzaSyCe0Bk74tTA11XtbRQDqgUy9n9d0tkjv4k";
	}
	changeVideo(value): void {
		if (value == 1) {
			this.id = "HBEkmfBvY6E";
		}
		else if(value == 2) {
			this.id = "JEJkuhdNjns";
		}
		else {
			this.id = "bAgSeMwV5f8";
		}
	}
}
