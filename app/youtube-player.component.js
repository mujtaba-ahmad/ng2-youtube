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
var core_1 = require('@angular/core');
var youtube_player_service_1 = require('./youtube-player.service');
var YoutubePlayerComponent = (function () {
    function YoutubePlayerComponent(ytPlayer) {
        this.ytPlayer = ytPlayer;
        this.time = 1;
        this.volume = [true, true, true, true, true];
        this.videoDisplay = true;
        this.progress = 0.00;
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
        });
        this.ytPlayer.fetchVideoData(this.id, this.apiKey)
            .subscribe(function (res) {
            if (res.items[0].snippet.title)
                _this.title = res.items[0].snippet.title;
            if (res.items[0].snippet.description)
                _this.description = res.items[0].snippet.description;
            if (res.items["0"].snippet.thumbnails.default)
                _this.videoImage = res.items["0"].snippet.thumbnails.default.url;
            _this.duration = Number(_this.ytPlayer.convert_time(res.items[0].contentDetails.duration));
            _this.launchYTPlayer(_this.id, _this.title);
        }, function (errorMsg) {
            _this.errorMsg = errorMsg;
        });
    };
    YoutubePlayerComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.ytPlayer.fetchVideoData(this.id, this.apiKey)
            .subscribe(function (res) {
            if (res.items[0].snippet.title)
                _this.title = res.items[0].snippet.title;
            if (res.items[0].snippet.description)
                _this.description = res.items[0].snippet.description;
            if (res.items["0"].snippet.thumbnails.default)
                _this.videoImage = res.items["0"].snippet.thumbnails.default.url;
            _this.duration = Number(_this.ytPlayer.convert_time(res.items[0].contentDetails.duration));
            _this.launchYTPlayer(_this.id, _this.title);
        }, function (errorMsg) {
            _this.errorMsg = errorMsg;
        });
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], YoutubePlayerComponent.prototype, "play", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], YoutubePlayerComponent.prototype, "apiKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], YoutubePlayerComponent.prototype, "id", void 0);
    YoutubePlayerComponent = __decorate([
        core_1.Component({
            selector: 'youtube-player',
            templateUrl: '/app/youtube-player.component.html',
            styleUrls: ['./app/youtube-bar.component.css'],
            providers: [youtube_player_service_1.YoutubeService]
        }), 
        __metadata('design:paramtypes', [youtube_player_service_1.YoutubeService])
    ], YoutubePlayerComponent);
    return YoutubePlayerComponent;
}());
exports.YoutubePlayerComponent = YoutubePlayerComponent;
//# sourceMappingURL=youtube-player.component.js.map