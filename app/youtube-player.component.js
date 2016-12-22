"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var youtube_player_service_1 = require("./youtube-player.service");
var YoutubePlayerComponent = (function () {
    function YoutubePlayerComponent(ytPlayer) {
        this.ytPlayer = ytPlayer;
        this.time = 1;
        this.volume = [true, true, true, true, true];
        this.videoDisplay = true;
        this.progress = 0.00;
        this.progressTime = "00:00";
        this.tempProgress = 0;
        this.placeholder = true;
        this.time = 0;
        this.play = false;
        this.mute = false;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    YoutubePlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ytPlayer.getStateChange().subscribe(function (res) {
            if (res == 1) {
                _this.zone.run(function () {
                    _this.play = false;
                    var singleBar = _this.duration / 100;
                    _this.singleSec = 1 / singleBar;
                    _this.progress = _this.singleSec * _this.ytPlayer.fetchTime();
                    var that = _this;
                    clearInterval(_this.timer);
                    _this.timer = setInterval(function () {
                        that.progress = that.progress + that.singleSec;
                        if (that.progress > 100) {
                            clearInterval(this.timer);
                        }
                    }, 1000);
                });
            }
            else if (res == 2) {
                _this.zone.run(function () {
                    _this.play = true;
                    clearInterval(_this.timer);
                });
            }
            else {
                _this.zone.run(function () {
                    _this.play = true;
                    clearInterval(_this.timer);
                });
            }
        });
        this.ytPlayer.fetchVideoData(this.id, this.apiKey)
            .subscribe(function (res) {
            if (res.items.length > 0) {
                if (res.items[0].snippet.title)
                    _this.title = res.items[0].snippet.title;
                if (res.items[0].snippet.description)
                    _this.description = res.items[0].snippet.description;
                if (res.items["0"].snippet.thumbnails.default)
                    _this.videoImage = res.items["0"].snippet.thumbnails.default.url;
                _this.duration = Number(_this.ytPlayer.convert_time(res.items[0].contentDetails.duration));
                _this.ytPlayer.startTime = _this.startTime;
                _this.launchYTPlayer(_this.id, _this.title);
                _this.placeholder = false;
            }
            else {
                _this.title = "Please provide a valid video Id";
            }
        }, function (errorMsg) {
            if (errorMsg.error.errors["0"].reason == "keyInvalid") {
                _this.title = "Please provide a valid api key";
            }
            _this.errorMsg = errorMsg;
        });
    };
    YoutubePlayerComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.ytPlayer.fetchVideoData(this.id, this.apiKey)
            .subscribe(function (res) {
            if (res.items.length > 0) {
                if (res.items[0].snippet.title)
                    _this.title = res.items[0].snippet.title;
                if (res.items[0].snippet.description)
                    _this.description = res.items[0].snippet.description;
                if (res.items["0"].snippet.thumbnails.default)
                    _this.videoImage = res.items["0"].snippet.thumbnails.default.url;
                _this.duration = Number(_this.ytPlayer.convert_time(res.items[0].contentDetails.duration));
                _this.ytPlayer.startTime = _this.startTime;
                _this.launchYTPlayer(_this.id, _this.title);
            }
            else {
                _this.title = "Please provide a valid video Id";
            }
        }, function (errorMsg) {
            if (errorMsg.error.errors["0"].reason == "keyInvalid") {
                _this.title = "Please provide a valid api key";
            }
            _this.errorMsg = errorMsg;
        });
    };
    YoutubePlayerComponent.prototype.over = function (event) {
        var singleBar = this.duration / 100;
        this.singleSec = 1 / singleBar;
        if (event.toElement.className == "progress") {
            this.tempProgress = (event.clientX) / event.toElement.offsetWidth * 100;
        }
        else {
            this.tempProgress = (event.clientX) / event.toElement.offsetParent.clientWidth * 100;
        }
        var newTime = (1 / this.singleSec) * this.tempProgress;
        var minutes = Math.floor(newTime / 60);
        var seconds = newTime - minutes * 60;
        this.progressTime = this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
    };
    YoutubePlayerComponent.prototype.str_pad_left = function (string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };
    YoutubePlayerComponent.prototype.launchYTPlayer = function (id, title) {
        this.ytPlayer.launchPlayer(id, title);
    };
    YoutubePlayerComponent.prototype.togglePlayPause = function () {
        if (!this.play) {
            this.ytPlayer.pauseVideo();
        }
        else {
            this.ytPlayer.playVideo();
        }
        this.play = !this.play;
    };
    YoutubePlayerComponent.prototype.toggleMuteUnmute = function () {
        if (!this.mute) {
            this.ytPlayer.muteVideo();
        }
        else {
            this.ytPlayer.unMuteVideo();
        }
        this.mute = !this.mute;
    };
    YoutubePlayerComponent.prototype.setVolume = function (value) {
        this.mute = false;
        for (var i = 1; i <= 5; i++) {
            if (i <= value) {
                this.volume[i - 1] = true;
            }
            else {
                this.volume[i - 1] = false;
            }
        }
        var barVolume = value * 20;
        this.ytPlayer.setVolume(barVolume);
    };
    YoutubePlayerComponent.prototype.toggleVideo = function () {
        this.videoDisplay = !this.videoDisplay;
    };
    YoutubePlayerComponent.prototype.changeProgress = function (event) {
        if (event.toElement.className == "progress") {
            this.progress = (event.clientX) / event.toElement.offsetWidth * 100;
        }
        else {
            this.progress = (event.clientX) / event.toElement.offsetParent.clientWidth * 100;
        }
        var newTime = (1 / this.singleSec) * this.progress;
        this.ytPlayer.seekTo(newTime);
        event.preventDefault();
    };
    return YoutubePlayerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], YoutubePlayerComponent.prototype, "play", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], YoutubePlayerComponent.prototype, "apiKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], YoutubePlayerComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], YoutubePlayerComponent.prototype, "startTime", void 0);
YoutubePlayerComponent = __decorate([
    core_1.Component({
        // moduleId: module.id,
        selector: 'youtube-player',
        template: "<div class=\"youtube-bar\">\n\t\t<div class=\"progress\" (click)=\"changeProgress($event)\" on-mousemove='over($event)'>\n\t\t\t<div class=\"time-lap\" [ngStyle]=\"{'left': (tempProgress - 1.7)+'%'}\">{{progressTime}}</div>\n\t\t\t<div class=\"progress-bar\" role=\"progressbar\"\n\t\t\taria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{'width': progress+'%'}\">\n\t\t\t\t<span class=\"sr-only\">100% Complete</span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"clear\"></div>\n\t\t<div class=\"container-fluid\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-4 col-sm-4 col-xs-3\">\n\t\t\t\t\t<div class=\"video-details\">\n\t\t\t\t\t\t<div [ngClass]=\"{'active': videoDisplay, 'player': true }\">\n\t\t\t\t\t\t\t<img *ngIf=\"!placeholder\" [src]=\"videoImage\" />\n\t\t\t\t\t\t\t<svg *ngIf=\"placeholder\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 310 310\" style=\"enable-background:new 0 0 310 310;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\">\n\t\t\t\t\t\t\t\t<g id=\"XMLID_822_\">\n\t\t\t\t\t\t\t\t\t<path id=\"XMLID_823_\" d=\"M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938   C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527   C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991   c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764   c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861   C204.394,157.263,202.325,160.684,199.021,162.41z\" fill=\"#3c3c42\"/>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t<div class=\"video-box-view\">\n\t\t\t\t\t\t\t\t<a (click)=\"toggleVideo()\" class=\"down-screen\">\n\t\t\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" viewBox=\"0 0 129 129\" enable-background=\"new 0 0 129 129\" width=\"512px\" height=\"512px\">\n\t\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t\t<path d=\"m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"512px\" height=\"512px\" viewBox=\"0 0 16 16\">\n\t\t\t\t\t\t\t\t\t\t<path fill=\"#FFFFFF\" d=\"M11 2h-9v9l1-1v-7h7z\"/>\n\t\t\t\t\t\t\t\t\t\t<path fill=\"#FFFFFF\" d=\"M5 14h9v-9l-1 1v7h-7z\"/>\n\t\t\t\t\t\t\t\t\t\t<path fill=\"#FFFFFF\" d=\"M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5 1.8 1.8z\"/>\n\t\t\t\t\t\t\t\t\t\t<path fill=\"#FFFFFF\" d=\"M7.7 9.7l-1.4-1.4-4.5 4.5-1.8-1.8v5h5l-1.8-1.8z\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div id=\"player\" class=\"ux-maker\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"video-title\">\n\t\t\t\t\t\t\t<a href=\"#\" class=\"track-title\">{{title}}</a>\n\t\t\t\t\t\t\t<a href=\"#\" class=\"track-title-detail\">{{description}}</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-4 col-sm-4 col-xs-6 center\">\n\t\t\t\t\t<div class=\"video-control\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<button class=\"v-btn back-btn hide\">\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 60 60\" style=\"enable-background:new 0 0 60 60;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\">\n\t\t\t\t\t\t\t\t<path d=\"M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M55.563,30.826l-22,15  C33.395,45.941,33.197,46,33,46c-0.16,0-0.32-0.038-0.467-0.116C32.205,45.711,32,45.371,32,45V31.892L11.563,45.826  C11.395,45.941,11.197,46,11,46c-0.16,0-0.32-0.038-0.467-0.116C10.205,45.711,10,45.371,10,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.327-0.174,0.725-0.15,1.03,0.058L32,28.108V15c0-0.371,0.205-0.711,0.533-0.884c0.327-0.174,0.725-0.15,1.03,0.058l22,15  C55.837,29.36,56,29.669,56,30S55.837,30.64,55.563,30.826z\" fill=\"#FFFFFF\"/>\n                            </svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class=\"v-btn play\" (click)=\"togglePlayPause();\">\n\t\t\t\t\t\t\t<svg *ngIf=\"play\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 60 60\" style=\"enable-background:new 0 0 60 60;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\">\n\t\t\t\t\t\t\t\t<path d=\"M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.563,30.826l-22,15  C23.394,45.941,23.197,46,23,46c-0.16,0-0.321-0.038-0.467-0.116C22.205,45.711,22,45.371,22,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.328-0.174,0.724-0.15,1.031,0.058l22,15C45.836,29.36,46,29.669,46,30S45.836,30.64,45.563,30.826z\" fill=\"#ffffff\"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t<svg *ngIf=\"!play\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" width=\"512px\" height=\"512px\" viewBox=\"0 0 510 510\" style=\"enable-background:new 0 0 510 510;\" xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<g id=\"pause-circle-fill\">\n\t\t\t\t\t\t\t\t\t\t<path d=\"M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M229.5,357h-51V153h51V357z     M331.5,357h-51V153h51V357z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class=\"v-btn forward hide\">\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 60 60\" style=\"enable-background:new 0 0 60 60;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\">\n\t\t\t\t\t\t\t\t<path d=\"M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M55.563,30.826l-22,15  C33.395,45.941,33.197,46,33,46c-0.16,0-0.32-0.038-0.467-0.116C32.205,45.711,32,45.371,32,45V31.892L11.563,45.826  C11.395,45.941,11.197,46,11,46c-0.16,0-0.32-0.038-0.467-0.116C10.205,45.711,10,45.371,10,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.327-0.174,0.725-0.15,1.03,0.058L32,28.108V15c0-0.371,0.205-0.711,0.533-0.884c0.327-0.174,0.725-0.15,1.03,0.058l22,15  C55.837,29.36,56,29.669,56,30S55.837,30.64,55.563,30.826z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-4 col-sm-4 col-xs-3 text-right\">\n\t\t\t\t\t<div class=\"volume-main\">\n\t\t\t\t\t\t<div class=\"v-btn mute\" (click)=\"toggleMuteUnmute();\">\n\t\t\t\t\t\t\t<svg *ngIf=\"!mute\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" width=\"512px\" height=\"512px\" viewBox=\"0 0 461.55 461.55\" style=\"enable-background:new 0 0 461.55 461.55;\" xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<g id=\"volume-on\">\n\t\t\t\t\t\t\t\t\t\t<path d=\"M0,153v153h102l127.5,127.5v-408L102,153H0z M344.25,229.5c0-45.9-25.5-84.15-63.75-102v204    C318.75,313.65,344.25,275.4,344.25,229.5z M280.5,5.1v53.55C354.45,81.6,408,147.899,408,229.5S354.45,377.4,280.5,400.35V453.9    C382.5,430.949,459,339.15,459,229.5C459,119.85,382.5,28.049,280.5,5.1z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t<svg *ngIf=\"mute\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" width=\"512px\" height=\"512px\" viewBox=\"0 0 461.55 461.55\" style=\"enable-background:new 0 0 461.55 461.55;\" xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<g id=\"volume-off\">\n\t\t\t\t\t\t\t\t\t\t<path d=\"M345.525,229.5c0-45.9-25.5-84.15-63.75-102v56.1l63.75,63.75C345.525,239.7,345.525,234.6,345.525,229.5z M409.275,229.5    c0,22.95-5.1,45.9-12.75,66.3l38.25,38.25c17.85-30.6,25.5-68.85,25.5-107.1c0-109.65-76.5-201.45-178.5-224.4V56.1    C355.725,81.6,409.275,147.9,409.275,229.5z M34.425,0L1.275,33.15L121.125,153H1.275v153h102l127.5,127.5V262.65L340.425,372.3    c-17.851,12.75-35.7,22.95-58.65,30.601v53.55c35.7-7.65,66.3-22.95,94.35-45.9l51,51l33.15-33.149l-229.5-229.5L34.425,0z     M230.775,25.5l-53.55,53.55l53.55,53.55V25.5z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"v-btn volume\">\n\t\t\t\t\t\t\t<div class=\"v-bar-main\">\n\t\t\t\t\t\t\t\t<div class=\"v-bar v-1\" [ngClass]=\"{active: volume[0]}\" (click)=\"setVolume(1)\" ></div>\n\t\t\t\t\t\t\t\t<div class=\"v-bar v-2\" [ngClass]=\"{active: volume[1]}\" (click)=\"setVolume(2)\" ></div>\n\t\t\t\t\t\t\t\t<div class=\"v-bar v-3\" [ngClass]=\"{active: volume[2]}\" (click)=\"setVolume(3)\" ></div>\n\t\t\t\t\t\t\t\t<div class=\"v-bar v-4\" [ngClass]=\"{active: volume[3]}\" (click)=\"setVolume(4)\" ></div>\n\t\t\t\t\t\t\t\t<div class=\"v-bar v-5\" [ngClass]=\"{active: volume[4]}\" (click)=\"setVolume(5)\" ></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>",
        styles: [".youtube-bar {\n    float: left;\n    width: 100%;\n    position: fixed;\n    left: 0;\n    bottom: 0px;\n    background: rgb(63, 63, 65);\n    background: -moz-linear-gradient(top, rgb(63, 63, 65) 0%, rgb(37, 38, 40) 100%);\n    background: -webkit-linear-gradient(top, rgb(63, 63, 65) 0%, rgb(37, 38, 40) 100%);\n    background: linear-gradient(to bottom, rgb(63, 63, 65) 0%, rgb(37, 38, 40) 100%);\n    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#3f3f41', endColorstr='#252628', GradientType=0);\n    border-top: 1px solid #1e1e20;\n    padding: 0px;\n    height: 51px;\n    z-index: 5555;\n}\n.youtube-bar .video-details .player img {\n    height: 100%;\n    width: 100%;\n}\n.youtube-bar .video-details .player {\n    background: rgba(0, 0, 0, 0.15) none repeat scroll 0 0;\n    float:left;\n    height: 45px;\n    margin: 2.5px 0;\n    padding: 3px;\n    position: relative;\n    width: 60px;\n}\n.youtube-bar .video-details .video-title {\n    color: #fff;\n    float: left;\n    margin-top: 7px;\n    vertical-align: middle;\n    padding-left: 10px;\n    width: 70%;\n}\n.youtube-bar .video-details .video-title a {\n    color: #fff;\n    text-decoration: none;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-width: 300px;\n    float: left;\n    font-size: 12px;\n}\n.youtube-bar .video-details .video-title a.track-title {\n    font-size: 11px;\n    line-height: 16px;\n    color: rgba(255, 255, 255, 0.4);\n}\n.youtube-bar .video-details {\n    float: left;\n}\n.youtube-bar .video-control {\n    text-align: center;\n    padding-top: 2.4px;\n}\n.youtube-bar .v-btn {\n    display: inline-table;\n    background: transparent;\n    border: 0;\n    vertical-align: middle;\n    padding: 0px;\n}\n.youtube-bar .v-btn:focus {\n    outline: none;\n}\n.youtube-bar .v-btn svg {\n    width: 30px;\n    height: 30px;\n    border: 2px solid rgba(0, 0, 0, 0.15);\n    border-radius: 50%;\n    cursor: pointer;\n    opacity: 0.7;\n    float: left;\n}\n.youtube-bar .v-btn.play svg {\n    height: 45px;\n    width: 45px;\n    border: 2px solid rgba(0, 0, 0, 0.15);\n    border-radius: 50%;\n}\n.youtube-bar .v-btn.back-btn svg {\n    -ms-transform: rotate(180deg);\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg);\n}\n.youtube-bar .v-bar-main {\n    width: 34px;\n    height: 25px;\n    float: left;\n    text-align: left;\n    cursor: pointer;\n    margin-top: -10px;\n}\n.youtube-bar .v-bar-main .v-bar {\n    float: left;\n    width: 5px;\n    background: #fff;\n    border-radius: 7px 7px 0px 0px;\n    vertical-align: bottom;\n    cursor: pointer;\n    opacity: 0.7;\n    margin-right: 1px;\n    height: 4px;\n    margin-top: 20px;\n}\n.youtube-bar .v-bar-main .v-2{\n    height: 4px;\n    margin-top: 20px;\n}\n.youtube-bar .v-bar-main .v-2 {\n    height: 8px;\n    margin-top: 16px;\n}\n.youtube-bar .v-bar-main .v-3 {\n    height: 12px;\n    margin-top: 12px;\n}\n.youtube-bar .v-bar-main .v-4 {\n    height: 16px;\n    margin-top: 8px;\n}\n.youtube-bar .v-bar-main .v-5 {\n    height: 20px;\n    margin-top: 4px;\n}\n.youtube-bar .volume-main {\n    padding-top: 15px;\n    float: left;\n    width: 100%;\n}\n.youtube-bar .volume-main .mute svg {\n    border-color: transparent !important;\n}\n.youtube-bar .v-btn:hover svg,\n.youtube-bar .v-btn.active svg,\n.youtube-bar .mute:hover,\n.youtube-bar .v-bar-main .v-bar:hover,\n.youtube-bar .v-bar-main .v-bar.active {\n    opacity: 1;\n}\n.youtube-bar .progress {\n    margin: 0;\n    border-radius: 0;\n    height: 6px;\n    position: fixed;\n    left: 0;\n    bottom: 51px;\n    right: 0;\n    background: #222;\n}\n.youtube-bar .progress .progress-bar {\n    background-color: #ca4831;\n}\n.youtube-bar .mute svg {\n    width: 26px;\n    height: 26px;\n}\n.clear {\n    clear: both;\n}\n.video-box-view {\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    height: auto;\n    width: auto;\n    position: absolute;\n    transition: all 0.6s ease;\n    -moz-transition: all 0.6s ease;\n    -webkit-transition: all 0.6s ease;\n    -ms-transition: all 0.6s ease;\n    -o-transition: all 0.6s ease;\n    text-align: right;\n}\n.youtube-bar .video-details .player.active .video-box-view {\n    height: 250px;\n    width: 400px;\n    border-radius: 0px;\n    bottom: 55px;\n    left: inherit;\n    right: inherit;\n    top: inherit;\n    padding-top: 30px;\n    background-color: #2a2b2d;\n}\n\n.youtube-bar .video-details .player.active .video-box-view a {\n    height: 25px;\n    width: 25px;\n    display: inline-block;\n    margin-right: 10px;\n    margin-top: 10px;\n    position: absolute;\n    right: 0;\n    top: -5px;\n    z-index: 5555;\n    cursor: pointer;\n    background-color: transparent;\n    padding-top: 0px;\n    opacity: 1;\n}\n.youtube-bar .video-details .player .video-box-view a{\n    height: 100%;\n    width: 100%;\n    text-align: center;\n    position: absolute;\n    background-color: rgba(0, 0, 0, 0.3);\n    padding-top: 13px;\n    cursor: pointer;\n    opacity: 0;\n}\n.youtube-bar .video-details .player:hover .video-box-view a {\n    opacity: 1;\n}\n.youtube-bar .video-details .player svg,\n.youtube-bar .video-details .player .video-box-view a svg{\n    height: 100%;\n    width:100%;\n}\n.youtube-bar .video-details .player .video-box-view a svg:last-child{\n    height: 70%;\n    width:70%;\n}\n.youtube-bar .video-details .player .video-box-view a svg:first-child{\n    display: none;\n}\n.youtube-bar .video-details .player.active .video-box-view a svg:fist-child{\n    display: block;\n}\n.youtube-bar .video-details .player.active .video-box-view a svg:last-child{\n    display: none;\n}\n.youtube-bar .video-details .player.active .video-box-view a svg {\n    width: 100%;\n    height: 100%;\n    color: #000;\n    display: block;\n}\n.youtube-bar .time-lap {\n    background-color: rgba(0, 0, 0, 0.9);\n    padding: 5px 15px;\n    color: #fff;\n    font-size: 13px;\n    display: inline-block;\n    position: absolute;\n    left: 10%;\n    top: -30px;\n    padding: 3px 8px;\n    color: #fff;\n    text-align: center;\n    text-decoration: none;\n    background-color: #000;\n    border-radius: 4px;\n    opacity: 0;\n}\n.youtube-bar .time-lap:after {\n    content: '';\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 5px solid rgba(0, 0, 0, 0.9);\n    display: inline-block;\n    left: 36%;\n    bottom: -5px;\n    position: absolute;\n}\n.youtube-bar .progress:hover .time-lap {\n    opacity: 1;\n}\n.youtube-bar .progress{\n    overflow: visible !important;\n}\n@media (max-width: 991px) {\n    .youtube-bar .video-details .video-title {\n        display: none;\n    }\n    .youtube-bar .video-details {\n        padding-top: 0px;\n    }\n}\n@media (max-width: 768px) {\n    .youtube-bar .video-details {\n        display: inline;\n        float: left;\n        padding-top: 3px;\n        text-align: left;\n        width: 100%;\n    }\n}\n@media (max-width: 480px) {\n    /*   .youtube-bar .video-control{    text-align: left;  }*/\n    \n    .youtube-bar .video-details .player,\n    .youtube-bar .row {\n        margin: 0;\n    }\n    .youtube-bar .volume-main .v-btn {\n        padding: 0 2px;\n    }\n    .youtube-bar .row .col-md-4 {\n        padding: 0;\n    }\n    .youtube-bar .container-fluid {\n        padding-left: 5px;\n        padding-right: 5px;\n    }\n}"],
        providers: [youtube_player_service_1.YoutubeService]
    }),
    __metadata("design:paramtypes", [youtube_player_service_1.YoutubeService])
], YoutubePlayerComponent);
exports.YoutubePlayerComponent = YoutubePlayerComponent;
//# sourceMappingURL=youtube-player.component.js.map