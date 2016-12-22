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
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var window_1 = require("./window");
var YoutubeService = (function () {
    function YoutubeService(_window, _http) {
        this._window = _window;
        this._http = _http;
        this.videoUrl = 'https://www.googleapis.com/youtube/v3/videos';
        this.apikey = "AIzaSyB0FUrFXTJaE2yI4UuZQcPnShcZq9866ks";
        this.playerStateEmitter = new BehaviorSubject_1.BehaviorSubject(0);
        this.playerReady = false;
        this.youtube = {
            ready: false,
            player: null,
            playerId: null,
            videoId: null,
            videoTitle: null,
            playerHeight: '100%',
            playerWidth: '100%'
        };
        // this._window = this._window;
        this.setupPlayer();
    }
    YoutubeService.prototype.getStateChange = function () {
        return this.playerStateEmitter.asObservable();
    };
    YoutubeService.prototype.fetchVideoData = function (id, apikey) {
        var params = new http_1.URLSearchParams();
        apikey = apikey === null ? this.apikey : apikey;
        params.set('id', id); // the user's search value
        params.set('key', apikey);
        params.set('part', 'snippet, statistics, contentDetails');
        var body = JSON.stringify({ id: id });
        return this._http.get(this.videoUrl, { search: params })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    YoutubeService.prototype.handleError = function (error) {
        var errMsg = (error._body) ? JSON.parse(error._body) :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Rx_1.Observable.throw(errMsg);
    };
    YoutubeService.prototype.bindPlayer = function (elementId) {
        this.youtube.playerId = elementId;
    };
    ;
    YoutubeService.prototype.createPlayer = function () {
        var that = this;
        return new that._window.nativeWindow['YT'].Player("player", {
            height: that.youtube.playerHeight,
            width: that.youtube.playerWidth,
            playerVars: { 'autoplay': 0, 'controls': 1 },
            events: {
                'onReady': function (event) {
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
                'onStateChange': function (event) {
                    that.playerStateEmitter.next(event.data);
                }
            }
        });
    };
    YoutubeService.prototype.loadPlayer = function () {
        if (this.youtube.ready && this.youtube.playerId) {
            if (this.event && this.playerReady) {
                this.event.target.destroy();
                this.playerReady = false;
                this.event = null;
            }
            this.youtube.player = this.createPlayer();
        }
    };
    YoutubeService.prototype.destroyPlayer = function () {
        if (this.event && this.playerReady) {
            this.event.target.destroy();
            this.playerReady = false;
            this.event = null;
        }
    };
    YoutubeService.prototype.setupPlayer = function () {
        var _this = this;
        this._window.nativeWindow['onYouTubeIframeAPIReady'] = function () {
            if (_this._window.nativeWindow['YT']) {
                _this.youtube.ready = true;
                _this.bindPlayer('placeholder');
                _this.loadPlayer();
            }
        };
        if (this._window.nativeWindow['YT'] && this._window.nativeWindow['YT'].Player) {
            this.youtube.ready = true;
            this.bindPlayer('placeholder');
            this.loadPlayer();
        }
    };
    YoutubeService.prototype.launchPlayer = function (id, title) {
        this.setupPlayer();
        this.youtube.videoId = id;
        this.youtube.videoTitle = title;
        return this.youtube;
    };
    YoutubeService.prototype.playVideo = function () {
        this.youtube.player.playVideo();
    };
    YoutubeService.prototype.pauseVideo = function () {
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
        if (this.playerReady && this.event) {
            return this.event.target.getCurrentTime();
        }
        return 0;
    };
    YoutubeService.prototype.setVolume = function (value) {
        this.youtube.player.setVolume(value);
    };
    YoutubeService.prototype.seekTo = function (time) {
        this.youtube.player.seekTo(time, true);
    };
    YoutubeService.prototype.convert_time = function (duration) {
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
    };
    return YoutubeService;
}());
YoutubeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [window_1.WindowRef, http_1.Http])
], YoutubeService);
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube-player.service.js.map