import { Component, Input, Output, EventEmitter, OnInit, NgZone, OnChanges } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { YoutubeService } from './youtube-player.service';

@Component({
    // moduleId: module.id,
    selector: 'youtube-player',
    template: `<div class="youtube-bar">
		<div class="progress" (click)="changeProgress($event)" on-mousemove='over($event)'>
			<div class="time-lap" [ngStyle]="{'left': (tempProgress - 1.7)+'%'}">{{progressTime}}</div>
			<div class="progress-bar" role="progressbar"
			aria-valuemin="0" aria-valuemax="100" [ngStyle]="{'width': progress+'%'}">
				<span class="sr-only">100% Complete</span>
			</div>
		</div>
		<div class="clear"></div>
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-4 col-sm-4 col-xs-3">
					<div class="video-details">
						<div [ngClass]="{'active': videoDisplay, 'player': true }">
							<img *ngIf="!placeholder" [src]="videoImage" />
							<svg *ngIf="placeholder" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 310 310" style="enable-background:new 0 0 310 310;" xml:space="preserve" width="512px" height="512px">
								<g id="XMLID_822_">
									<path id="XMLID_823_" d="M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938   C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527   C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991   c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764   c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861   C204.394,157.263,202.325,160.684,199.021,162.41z" fill="#3c3c42"/>
								</g>
							</svg>
							<div class="video-box-view">
								<a (click)="toggleVideo()" class="down-screen">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="512px" height="512px">
									<g>
										<path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" fill="#FFFFFF"/>
									</g>
									</svg>
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="512px" height="512px" viewBox="0 0 16 16">
										<path fill="#FFFFFF" d="M11 2h-9v9l1-1v-7h7z"/>
										<path fill="#FFFFFF" d="M5 14h9v-9l-1 1v7h-7z"/>
										<path fill="#FFFFFF" d="M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5 1.8 1.8z"/>
										<path fill="#FFFFFF" d="M7.7 9.7l-1.4-1.4-4.5 4.5-1.8-1.8v5h5l-1.8-1.8z"/>
									</svg>
								</a>
								<div id="player" class="ux-maker"></div>
							</div>
						</div>
						<div class="video-title">
							<a href="#" class="track-title">{{title}}</a>
							<a href="#" class="track-title-detail">{{description}}</a>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-4 col-xs-6 center">
					<div class="video-control">
						
						<button class="v-btn back-btn hide">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px">
								<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M55.563,30.826l-22,15  C33.395,45.941,33.197,46,33,46c-0.16,0-0.32-0.038-0.467-0.116C32.205,45.711,32,45.371,32,45V31.892L11.563,45.826  C11.395,45.941,11.197,46,11,46c-0.16,0-0.32-0.038-0.467-0.116C10.205,45.711,10,45.371,10,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.327-0.174,0.725-0.15,1.03,0.058L32,28.108V15c0-0.371,0.205-0.711,0.533-0.884c0.327-0.174,0.725-0.15,1.03,0.058l22,15  C55.837,29.36,56,29.669,56,30S55.837,30.64,55.563,30.826z" fill="#FFFFFF"/>
                            </svg>
						</button>
						<button class="v-btn play" (click)="togglePlayPause();">
							<svg *ngIf="play"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px">
								<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.563,30.826l-22,15  C23.394,45.941,23.197,46,23,46c-0.16,0-0.321-0.038-0.467-0.116C22.205,45.711,22,45.371,22,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.328-0.174,0.724-0.15,1.031,0.058l22,15C45.836,29.36,46,29.669,46,30S45.836,30.64,45.563,30.826z" fill="#ffffff"/>
							</svg>
							<svg *ngIf="!play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
								<g>
									<g id="pause-circle-fill">
										<path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M229.5,357h-51V153h51V357z     M331.5,357h-51V153h51V357z" fill="#FFFFFF"/>
									</g>
								</g>
							</svg>
						</button>
						<button class="v-btn forward hide">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px">
								<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M55.563,30.826l-22,15  C33.395,45.941,33.197,46,33,46c-0.16,0-0.32-0.038-0.467-0.116C32.205,45.711,32,45.371,32,45V31.892L11.563,45.826  C11.395,45.941,11.197,46,11,46c-0.16,0-0.32-0.038-0.467-0.116C10.205,45.711,10,45.371,10,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.327-0.174,0.725-0.15,1.03,0.058L32,28.108V15c0-0.371,0.205-0.711,0.533-0.884c0.327-0.174,0.725-0.15,1.03,0.058l22,15  C55.837,29.36,56,29.669,56,30S55.837,30.64,55.563,30.826z" fill="#FFFFFF"/>
							</svg>
						</button>
					</div>
				</div>
				<div class="col-md-4 col-sm-4 col-xs-3 text-right">
					<div class="volume-main">
						<div class="v-btn mute" (click)="toggleMuteUnmute();">
							<svg *ngIf="!mute"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 461.55 461.55" style="enable-background:new 0 0 461.55 461.55;" xml:space="preserve">
								<g>
									<g id="volume-on">
										<path d="M0,153v153h102l127.5,127.5v-408L102,153H0z M344.25,229.5c0-45.9-25.5-84.15-63.75-102v204    C318.75,313.65,344.25,275.4,344.25,229.5z M280.5,5.1v53.55C354.45,81.6,408,147.899,408,229.5S354.45,377.4,280.5,400.35V453.9    C382.5,430.949,459,339.15,459,229.5C459,119.85,382.5,28.049,280.5,5.1z" fill="#FFFFFF"/>
									</g>
								</g>
							</svg>
							<svg *ngIf="mute" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 461.55 461.55" style="enable-background:new 0 0 461.55 461.55;" xml:space="preserve">
								<g>
									<g id="volume-off">
										<path d="M345.525,229.5c0-45.9-25.5-84.15-63.75-102v56.1l63.75,63.75C345.525,239.7,345.525,234.6,345.525,229.5z M409.275,229.5    c0,22.95-5.1,45.9-12.75,66.3l38.25,38.25c17.85-30.6,25.5-68.85,25.5-107.1c0-109.65-76.5-201.45-178.5-224.4V56.1    C355.725,81.6,409.275,147.9,409.275,229.5z M34.425,0L1.275,33.15L121.125,153H1.275v153h102l127.5,127.5V262.65L340.425,372.3    c-17.851,12.75-35.7,22.95-58.65,30.601v53.55c35.7-7.65,66.3-22.95,94.35-45.9l51,51l33.15-33.149l-229.5-229.5L34.425,0z     M230.775,25.5l-53.55,53.55l53.55,53.55V25.5z" fill="#FFFFFF"/>
									</g>
								</g>
							</svg>
						</div>
						<div class="v-btn volume">
							<div class="v-bar-main">
								<div class="v-bar v-1" [ngClass]="{active: volume[0]}" (click)="setVolume(1)" ></div>
								<div class="v-bar v-2" [ngClass]="{active: volume[1]}" (click)="setVolume(2)" ></div>
								<div class="v-bar v-3" [ngClass]="{active: volume[2]}" (click)="setVolume(3)" ></div>
								<div class="v-bar v-4" [ngClass]="{active: volume[3]}" (click)="setVolume(4)" ></div>
								<div class="v-bar v-5" [ngClass]="{active: volume[4]}" (click)="setVolume(5)" ></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`,
    styles: [`.youtube-bar {
    float: left;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0px;
    background: rgb(63, 63, 65);
    background: -moz-linear-gradient(top, rgb(63, 63, 65) 0%, rgb(37, 38, 40) 100%);
    background: -webkit-linear-gradient(top, rgb(63, 63, 65) 0%, rgb(37, 38, 40) 100%);
    background: linear-gradient(to bottom, rgb(63, 63, 65) 0%, rgb(37, 38, 40) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#3f3f41', endColorstr='#252628', GradientType=0);
    border-top: 1px solid #1e1e20;
    padding: 0px;
    height: 51px;
    z-index: 5555;
}
.youtube-bar .video-details .player img {
    height: 100%;
    width: 100%;
}
.youtube-bar .video-details .player {
    background: rgba(0, 0, 0, 0.15) none repeat scroll 0 0;
    float:left;
    height: 45px;
    margin: 2.5px 0;
    padding: 3px;
    position: relative;
    width: 60px;
}
.youtube-bar .video-details .video-title {
    color: #fff;
    float: left;
    margin-top: 7px;
    vertical-align: middle;
    padding-left: 10px;
    width: 70%;
}
.youtube-bar .video-details .video-title a {
    color: #fff;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    float: left;
    font-size: 12px;
}
.youtube-bar .video-details .video-title a.track-title {
    font-size: 11px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.4);
}
.youtube-bar .video-details {
    float: left;
}
.youtube-bar .video-control {
    text-align: center;
    padding-top: 2.4px;
}
.youtube-bar .v-btn {
    display: inline-table;
    background: transparent;
    border: 0;
    vertical-align: middle;
    padding: 0px;
}
.youtube-bar .v-btn:focus {
    outline: none;
}
.youtube-bar .v-btn svg {
    width: 30px;
    height: 30px;
    border: 2px solid rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.7;
    float: left;
}
.youtube-bar .v-btn.play svg {
    height: 45px;
    width: 45px;
    border: 2px solid rgba(0, 0, 0, 0.15);
    border-radius: 50%;
}
.youtube-bar .v-btn.back-btn svg {
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
.youtube-bar .v-bar-main {
    width: 34px;
    height: 25px;
    float: left;
    text-align: left;
    cursor: pointer;
    margin-top: -10px;
}
.youtube-bar .v-bar-main .v-bar {
    float: left;
    width: 5px;
    background: #fff;
    border-radius: 7px 7px 0px 0px;
    vertical-align: bottom;
    cursor: pointer;
    opacity: 0.7;
    margin-right: 1px;
    height: 4px;
    margin-top: 20px;
}
.youtube-bar .v-bar-main .v-2{
    height: 4px;
    margin-top: 20px;
}
.youtube-bar .v-bar-main .v-2 {
    height: 8px;
    margin-top: 16px;
}
.youtube-bar .v-bar-main .v-3 {
    height: 12px;
    margin-top: 12px;
}
.youtube-bar .v-bar-main .v-4 {
    height: 16px;
    margin-top: 8px;
}
.youtube-bar .v-bar-main .v-5 {
    height: 20px;
    margin-top: 4px;
}
.youtube-bar .volume-main {
    padding-top: 15px;
    float: left;
    width: 100%;
}
.youtube-bar .volume-main .mute svg {
    border-color: transparent !important;
}
.youtube-bar .v-btn:hover svg,
.youtube-bar .v-btn.active svg,
.youtube-bar .mute:hover,
.youtube-bar .v-bar-main .v-bar:hover,
.youtube-bar .v-bar-main .v-bar.active {
    opacity: 1;
}
.youtube-bar .progress {
    margin: 0;
    border-radius: 0;
    height: 6px;
    position: fixed;
    left: 0;
    bottom: 51px;
    right: 0;
    background: #222;
}
.youtube-bar .progress .progress-bar {
    background-color: #ca4831;
}
.youtube-bar .mute svg {
    width: 26px;
    height: 26px;
}
.clear {
    clear: both;
}
.video-box-view {
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: auto;
    width: auto;
    position: absolute;
    transition: all 0.6s ease;
    -moz-transition: all 0.6s ease;
    -webkit-transition: all 0.6s ease;
    -ms-transition: all 0.6s ease;
    -o-transition: all 0.6s ease;
    text-align: right;
}
.youtube-bar .video-details .player.active .video-box-view {
    height: 250px;
    width: 400px;
    border-radius: 0px;
    bottom: 55px;
    left: inherit;
    right: inherit;
    top: inherit;
    padding-top: 30px;
    background-color: #2a2b2d;
}

.youtube-bar .video-details .player.active .video-box-view a {
    height: 25px;
    width: 25px;
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    position: absolute;
    right: 0;
    top: -5px;
    z-index: 5555;
    cursor: pointer;
    background-color: transparent;
    padding-top: 0px;
    opacity: 1;
}
.youtube-bar .video-details .player .video-box-view a{
    height: 100%;
    width: 100%;
    text-align: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    padding-top: 13px;
    cursor: pointer;
    opacity: 0;
}
.youtube-bar .video-details .player:hover .video-box-view a {
    opacity: 1;
}
.youtube-bar .video-details .player svg,
.youtube-bar .video-details .player .video-box-view a svg{
    height: 100%;
    width:100%;
}
.youtube-bar .video-details .player .video-box-view a svg:last-child{
    height: 70%;
    width:70%;
}
.youtube-bar .video-details .player .video-box-view a svg:first-child{
    display: none;
}
.youtube-bar .video-details .player.active .video-box-view a svg:fist-child{
    display: block;
}
.youtube-bar .video-details .player.active .video-box-view a svg:last-child{
    display: none;
}
.youtube-bar .video-details .player.active .video-box-view a svg {
    width: 100%;
    height: 100%;
    color: #000;
    display: block;
}
.youtube-bar .time-lap {
    background-color: rgba(0, 0, 0, 0.9);
    padding: 5px 15px;
    color: #fff;
    font-size: 13px;
    display: inline-block;
    position: absolute;
    left: 10%;
    top: -30px;
    padding: 3px 8px;
    color: #fff;
    text-align: center;
    text-decoration: none;
    background-color: #000;
    border-radius: 4px;
    opacity: 0;
}
.youtube-bar .time-lap:after {
    content: '';
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(0, 0, 0, 0.9);
    display: inline-block;
    left: 36%;
    bottom: -5px;
    position: absolute;
}
.youtube-bar .progress:hover .time-lap {
    opacity: 1;
}
.youtube-bar .progress{
    overflow: visible !important;
}
@media (max-width: 991px) {
    .youtube-bar .video-details .video-title {
        display: none;
    }
    .youtube-bar .video-details {
        padding-top: 0px;
    }
}
@media (max-width: 768px) {
    .youtube-bar .video-details {
        display: inline;
        float: left;
        padding-top: 3px;
        text-align: left;
        width: 100%;
    }
}
@media (max-width: 480px) {
    /*   .youtube-bar .video-control{    text-align: left;  }*/
    
    .youtube-bar .video-details .player,
    .youtube-bar .row {
        margin: 0;
    }
    .youtube-bar .volume-main .v-btn {
        padding: 0 2px;
    }
    .youtube-bar .row .col-md-4 {
        padding: 0;
    }
    .youtube-bar .container-fluid {
        padding-left: 5px;
        padding-right: 5px;
    }
}`],
    providers: [YoutubeService]
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