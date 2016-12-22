import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, URLSearchParams, Jsonp } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WindowRef } from './window';
import { IVideo } from './IVideo';

@Injectable()
export class YoutubeService {
  private videoUrl = 'https://www.googleapis.com/youtube/v3/videos';
  private apikey: string = "AIzaSyB0FUrFXTJaE2yI4UuZQcPnShcZq9866ks";
  private playerStateEmitter: BehaviorSubject<number> = new BehaviorSubject(0);
  private event: any;
  private playerReady: boolean = false;
  public startTime: number;
  public youtube: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '100%',
    playerWidth: '100%'
  }
  constructor (private _window: WindowRef, private _http: Http) {
      // this._window = this._window;
      this.setupPlayer();
  }
  getStateChange(): Observable<number> {
      return this.playerStateEmitter.asObservable();
  }
  fetchVideoData (id: string, apikey: string): Observable<any> {
      let params = new URLSearchParams();
      apikey = apikey === null ? this.apikey : apikey;
      params.set('id', id); // the user's search value
      params.set('key', apikey);
      params.set('part', 'snippet, statistics, contentDetails');
        let body = JSON.stringify({ id });
        return this._http.get(this.videoUrl , { search: params })
                        .map((response: Response) => <any>response.json())
                        //.do(data => console.log(JSON.stringify(data)))
                        .catch(this.handleError);
  }

  private handleError (error: any) {
      let errMsg = (error._body) ? JSON.parse(error._body) :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Observable.throw(errMsg);
  }
    
  bindPlayer(elementId: any): void {
    this.youtube.playerId = elementId;
  };

  createPlayer(): void {
    var that = this;
    return new that._window.nativeWindow['YT'].Player("player", {
      height: that.youtube.playerHeight,
      width: that.youtube.playerWidth,
      playerVars: { 'autoplay': 0, 'controls': 1 },
      events: {
           'onReady': function(event: any) { 
              // that.youtube.player.loadVideoById(that.youtube.videoId);
              event.target.loadVideoById(that.youtube.videoId);
              event.target.loadVideoById(that.youtube.videoId);
              that.playerReady = true;
              // this.playerReady = true;
              that.event = event;
              // this.event = event.target;
              if (that.startTime) {
                event.target.seekTo(that.startTime, true);
                that.startTime = null;
              }
           },
           'onStateChange': function(event: any) {
              that.playerStateEmitter.next(event.data);
           }
      }
    });
  }

  loadPlayer(): void {
    if (this.youtube.ready && this.youtube.playerId) {
      if (this.event && this.playerReady) {
        this.event.target.destroy();
        this.playerReady = false;
        this.event = null;
      }
      this.youtube.player = this.createPlayer();
    }
  }

  destroyPlayer(): void {
    if (this.event && this.playerReady) {
      this.event.target.destroy();
      this.playerReady = false;
      this.event = null;
    }
  }

  setupPlayer () {
    this._window.nativeWindow['onYouTubeIframeAPIReady'] = () => {
      if (this._window.nativeWindow['YT']) {
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.loadPlayer();
      }
    };
    if (this._window.nativeWindow['YT'] && this._window.nativeWindow['YT'].Player) {
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.loadPlayer();
    }
  }

  launchPlayer(id: any, title: any):void {
    this.setupPlayer();
    this.youtube.videoId = id;
    this.youtube.videoTitle = title;
    return this.youtube;
  }
  playVideo(): void {
    this.youtube.player.playVideo();
  }
  pauseVideo(): void {
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
      if (this.playerReady && this.event) {
        return this.event.target.getCurrentTime();
      }
      return 0;
  }
  setVolume(value: any): void {
    this.youtube.player.setVolume(value);
  }
  seekTo(time: any): void {
    this.youtube.player.seekTo(time, true)
  }
  convert_time(duration: any) {
      var a = duration.match(/\d+/g);

      if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
          a = [0, a[0], 0];
      }

      if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
          a = [a[0], 0, a[1]];
      }
      if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
          a = [a[0], 0, 0];
      }

      duration = 0;

      if (a.length == 3) {
          duration = duration + parseInt(a[0]) * 3600;
          duration = duration + parseInt(a[1]) * 60;
          duration = duration + parseInt(a[2]);
      }

      if (a.length == 2) {
          duration = duration + parseInt(a[0]) * 60;
          duration = duration + parseInt(a[1]);
      }

      if (a.length == 1) {
          duration = duration + parseInt(a[0]);
      }
      return duration;
  }
}
