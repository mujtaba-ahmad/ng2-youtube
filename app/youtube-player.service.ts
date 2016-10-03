import { Injectable } from '@angular/core';
import {WindowRef} from './window';

@Injectable()
export class YoutubeService {
  youtube: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '50%',
    playerWidth: '75%'
  }

  constructor (private _window: WindowRef) {
      this._window = this._window.nativeWindow;
      this.setupPlayer();
  }

  bindPlayer(elementId): void {
    this.youtube.playerId = elementId;
  };

  createPlayer(): void {
    return new this._window['YT'].Player("player", {
      height: this.youtube.playerHeight,
      width: this.youtube.playerWidth,
      events: {
           'onReady': function() { 
           }
      }
    });
  }

  loadPlayer(): void {
    if (this.youtube.ready && this.youtube.playerId) {
      if (this.youtube.player) {
      this.youtube.player.destroy();
      }
      this.youtube.player = this.createPlayer();
    }
  }

  setupPlayer () {
    this._window['onYouTubeIframeAPIReady'] = () => {
      if (this._window['YT']) {
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.loadPlayer();
      }
    };
    if (this._window['YT'] && this._window['YT'].Player) {
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.loadPlayer();
    }
  }

  launchPlayer(id, title):void {
    if (this.youtube.player) {
        this.youtube.player.loadVideoById(id);
    }
    this.youtube.videoId = id;
    this.youtube.videoTitle = title;
    return this.youtube;
  }
  stopVideo(): void {
    this.youtube.player.pauseVideo()
  }
  muteVideo(): void {
    this.youtube.player.mute();
  }
  unMuteVideo(): void {
      if(this.youtube.player.isMuted())
        this.youtube.player.unMute();
  }
  fetchTime(): number{
      return this.youtube.player.getCurrentTime();
  }
}

