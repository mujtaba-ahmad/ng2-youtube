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
var window_1 = require('./window');
var YoutubeService = (function () {
    function YoutubeService(_window) {
        this._window = _window;
        this.youtube = {
            ready: false,
            player: null,
            playerId: null,
            videoId: null,
            videoTitle: null,
            playerHeight: '50%',
            playerWidth: '75%'
        };
        this._window = this._window.nativeWindow;
        this.setupPlayer();
    }
    YoutubeService.prototype.bindPlayer = function (elementId) {
        this.youtube.playerId = elementId;
    };
    ;
    YoutubeService.prototype.createPlayer = function () {
        return new this._window['YT'].Player("player", {
            height: this.youtube.playerHeight,
            width: this.youtube.playerWidth,
            events: {
                'onReady': function () {
                }
            }
        });
    };
    YoutubeService.prototype.loadPlayer = function () {
        if (this.youtube.ready && this.youtube.playerId) {
            if (this.youtube.player) {
                this.youtube.player.destroy();
            }
            this.youtube.player = this.createPlayer();
        }
    };
    YoutubeService.prototype.setupPlayer = function () {
        var _this = this;
        this._window['onYouTubeIframeAPIReady'] = function () {
            if (_this._window['YT']) {
                _this.youtube.ready = true;
                _this.bindPlayer('placeholder');
                _this.loadPlayer();
            }
        };
        if (this._window['YT'] && this._window['YT'].Player) {
            this.youtube.ready = true;
            this.bindPlayer('placeholder');
            this.loadPlayer();
        }
    };
    YoutubeService.prototype.launchPlayer = function (id, title) {
        if (this.youtube.player) {
            this.youtube.player.loadVideoById(id);
        }
        this.youtube.videoId = id;
        this.youtube.videoTitle = title;
        return this.youtube;
    };
    YoutubeService.prototype.stopVideo = function () {
        this.youtube.player.pauseVideo();
    };
    YoutubeService.prototype.muteVideo = function () {
        this.youtube.player.mute();
    };
    YoutubeService.prototype.unMuteVideo = function () {
        if (this.youtube.player.isMuted())
            this.youtube.player.unMute();
    };
    YoutubeService.prototype.fetchTime = function () {
        return this.youtube.player.getCurrentTime();
    };
    YoutubeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_1.WindowRef])
    ], YoutubeService);
    return YoutubeService;
}());
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube-player.service.js.map