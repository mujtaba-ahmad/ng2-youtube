import { Component, Input, Output, EventEmitter } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { YoutubeService } from './youtube-player.service';


@Component({
  selector: 'youtube-player',
  templateUrl: '/app/youtube-player.component.html',
  providers: [YoutubeService]
})


export class YoutubePlayerComponent {
    @Input() id: string;
    @Input() title: string;
    constructor (public ytPlayer: YoutubeService) {
       
    }
    clicked () {
        this.id = "VzjJR6tTx1c";
        this.title = "Mujtaba";
        this.launchYTPlayer(this.id, this.title)
    }
    launchYTPlayer(id, title): void {
        this.ytPlayer.launchPlayer(id, title);
    }
    openSettings(): void {
        console.log("TODO: Implement openSettings()");
    }
    clickedStop() {
        this.ytPlayer.stopVideo();
    }
    clickedMute () {
        this.ytPlayer.muteVideo();
    }
    clickedUnmute () {
        this.ytPlayer.unMuteVideo();
    }
    clickedTime () {
        console.log(this.ytPlayer.fetchTime());
    }
    // playVideo(e, post): void {
    //     console.log(post);
    //     this.onPlaying = true;
    //     this.ytPlayer.launchPlayer(post.id, post.snippet.title);
    // }
}