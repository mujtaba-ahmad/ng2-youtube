import { Component, Input, Output, EventEmitter, OnInit, NgZone, OnChanges } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { YoutubeService } from './youtube-player.service';

@Component({
    moduleId: module.id,
    selector: 'youtube-player',
    templateUrl: 'youtube-player.component.html',
    styleUrls: ['youtube-bar.component.css']
    // providers: [YoutubeService]
})


export class YoutubePlayerComponent implements OnInit, OnChanges{
    
    @Input() play: boolean;
    @Input() apiKey: string;
    @Input() id: string;
    @Input() startTime: number;
    private time: number = 1;
    private duration: number;
    private title: string;
    private description: string;
    private videoImage: URL;
    private mute: boolean;
    private volume: boolean[] = [true, true, true, true, true];
    private zone: NgZone;
    private videoDisplay: boolean = true;
    private timer: any;
    private errorMsg: string;
    private progress: number = 0.00;
    private progressTime: string = "00:00";
    private tempProgress: number = 0;
    private placeholder: boolean = true;
    singleSec: number;
    constructor (public ytPlayer: YoutubeService) {
        this.time = 0;
        this.play = false;
        this.mute = false;
        this.zone = new NgZone({enableLongStackTrace: false});
    }
    ngOnInit() {
        this.ytPlayer.getStateChange().subscribe(
            res => {
               if(res == 1) { //start
                   this.zone.run(() => {
                       this.play = false;
                       var singleBar = this.duration / 100;
                       this.singleSec = 1 / singleBar;
                       this.progress = this.singleSec * this.ytPlayer.fetchTime();
                        var that = this;
                        clearInterval(this.timer);
                        this.timer = setInterval(function() {
                            
                            that.progress = that.progress + that.singleSec;
                            if (that.progress > 100 ) {
                                clearInterval(this.timer);
                            }
                         }, 1000)
                   } );
               }
               else if(res == 2) { //stop
                    this.zone.run(() => {
                        this.play = true;
                        clearInterval(this.timer);
                    });
                    
               }
               else {
                   this.zone.run(() => {
                        this.play = true;
                        clearInterval(this.timer);
                    });
               }
            }
        );
        this.ytPlayer.fetchVideoData(this.id, this.apiKey)
                      .subscribe(
                            res => {
                                if (res.items.length > 0) {
                                    if (res.items[0].snippet.title)
                                        this.title = res.items[0].snippet.title;
                                    if (res.items[0].snippet.description)
                                        this.description = res.items[0].snippet.description
                                    if (res.items["0"].snippet.thumbnails.default)
                                        this.videoImage = res.items["0"].snippet.thumbnails.default.url
                                        
                                    this.duration = Number(this.ytPlayer.convert_time(res.items[0].contentDetails.duration));
                                    this.ytPlayer.startTime = this.startTime;
                                    this.launchYTPlayer(this.id, this.title);
                                    this.placeholder = false;
                                }
                                else {
                                    this.title = "Please provide a valid video Id";
                                }
                                
                            },
                            errorMsg => {
                                if (errorMsg.error.errors["0"].reason == "keyInvalid" ) {
                                    this.title = "Please provide a valid api key";
                                }
                                this.errorMsg = errorMsg;
                            }
                        )
    }
    ngOnChanges() {
        this.ytPlayer.fetchVideoData(this.id, this.apiKey)
                      .subscribe(
                            res => {
                                if (res.items.length > 0) {
                                    if (res.items[0].snippet.title)
                                        this.title = res.items[0].snippet.title;
                                    if (res.items[0].snippet.description)
                                        this.description = res.items[0].snippet.description
                                    if (res.items["0"].snippet.thumbnails.default)
                                        this.videoImage = res.items["0"].snippet.thumbnails.default.url
                                    this.duration = Number(this.ytPlayer.convert_time(res.items[0].contentDetails.duration));
                                    this.ytPlayer.startTime = this.startTime;
                                    this.launchYTPlayer(this.id, this.title);
                                }
                                else {
                                    this.title = "Please provide a valid video Id";
                                }
                            },
                            errorMsg => {
                                if (errorMsg.error.errors["0"].reason == "keyInvalid" ) {
                                    this.title = "Please provide a valid api key";
                                }
                                this.errorMsg = errorMsg;
                            }
                        )
    }
    over(event: any) {
        var singleBar = this.duration / 100;
        this.singleSec = 1 / singleBar;
        if (event.toElement.className == "progress") {
            this.tempProgress = (event.clientX) / event.toElement.offsetWidth * 100
        }
        else {
            this.tempProgress = (event.clientX) / event.toElement.offsetParent.clientWidth * 100
        }
        var newTime = (1 / this.singleSec) * this.tempProgress;
        var minutes = Math.floor(newTime / 60);
        var seconds = newTime - minutes * 60;
        this.progressTime = this.str_pad_left(minutes,'0',2) + ':' + this.str_pad_left(seconds,'0',2);
    }
    str_pad_left(string: any, pad: any, length: any) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }
    launchYTPlayer(id: string, title: string): void {
        this.ytPlayer.launchPlayer(id, title);
    }
    togglePlayPause() {
        
        if (!this.play) {
            this.ytPlayer.pauseVideo();
        }
        else {
            this.ytPlayer.playVideo();
        }
        this.play = !this.play;
        
    }
    toggleMuteUnmute() {
        if (!this.mute) {
            this.ytPlayer.muteVideo();
        }
        else {
            this.ytPlayer.unMuteVideo();
        }
        this.mute = !this.mute;
    }
    setVolume(value: any) {
        this.mute = false;
        for(var i = 1; i <= 5; i++){
            if(i <= value) {
                this.volume[ i - 1 ] = true;
            }
            else {
                this.volume[ i - 1 ] = false;
            }
        }
        var barVolume = value * 20;
        this.ytPlayer.setVolume(barVolume);
    }
    toggleVideo() {
        this.videoDisplay = !this.videoDisplay;
    }
    changeProgress(event: any) {
        if (event.toElement.className == "progress") {
            this.progress = (event.clientX) / event.toElement.offsetWidth * 100
        }
        else {
            this.progress = (event.clientX) / event.toElement.offsetParent.clientWidth * 100
        }
        var newTime = (1 / this.singleSec) * this.progress;
        this.ytPlayer.seekTo(newTime);
        event.preventDefault();
    }
 }