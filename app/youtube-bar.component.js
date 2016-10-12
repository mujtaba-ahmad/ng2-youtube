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
var YoutubeBarComponent = (function () {
    function YoutubeBarComponent(ytPlayer) {
        this.ytPlayer = ytPlayer;
        this.start = false;
        console.log(this.id);
        console.log(this.title);
        //    this.ytPlayer.fetchVideoData(id, null)
        //                   .subscribe(
        //                         res => {
        //                             this.ytPlayer.launchPlayer(this.id, "")
        //                         },
        //                         errorMsg => {
        //                             this.errorMsg = errorMsg
        //                         }
        //                     )
    }
    YoutubeBarComponent.prototype.ngOnInit = function () { };
    YoutubeBarComponent.prototype.clicked = function () {
        this.id = "VzjJR6tTx1c";
        //this.title = "Mujtaba";
        this.launchYTPlayer(this.id, "");
    };
    YoutubeBarComponent.prototype.launchYTPlayer = function (id, title) {
        this.ytPlayer.launchPlayer(id, title);
    };
    YoutubeBarComponent.prototype.openSettings = function () {
        console.log("TODO: Implement openSettings()");
    };
    YoutubeBarComponent.prototype.clickedStop = function () {
        this.ytPlayer.stopVideo();
    };
    YoutubeBarComponent.prototype.clickedMute = function () {
        this.ytPlayer.muteVideo();
    };
    YoutubeBarComponent.prototype.clickedUnmute = function () {
        this.ytPlayer.unMuteVideo();
    };
    YoutubeBarComponent.prototype.clickedTime = function () {
        console.log(this.ytPlayer.fetchTime());
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], YoutubeBarComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], YoutubeBarComponent.prototype, "title", void 0);
    YoutubeBarComponent = __decorate([
        core_1.Component({
            selector: 'youtube-bar',
            templateUrl: '/app/youtube-bar.component.html',
            styleUrls: ['./app/youtube-bar.component.css'],
            providers: [youtube_player_service_1.YoutubeService]
        }), 
        __metadata('design:paramtypes', [youtube_player_service_1.YoutubeService])
    ], YoutubeBarComponent);
    return YoutubeBarComponent;
}());
exports.YoutubeBarComponent = YoutubeBarComponent;
//# sourceMappingURL=youtube-bar.component.js.map