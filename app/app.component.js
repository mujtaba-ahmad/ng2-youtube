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
var AppComponent = (function () {
    function AppComponent() {
        this.id = "VzjJR6tTx1c";
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[6];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };
    AppComponent.prototype.changeVideo = function (value) {
        if (value == 1) {
            this.id = "HBEkmfBvY6E";
        }
        else if (value == 2) {
            this.id = "JEJkuhdNjns";
        }
        else {
            this.id = "bAgSeMwV5f8";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<h1>My First Angular App</h1>\n            <youtube-player [id]=\"id\"></youtube-player>{{id}}\n\t\t\t<a href=\"#\" (click)=\"changeVideo(1)\">video 1</a>\n\t\t\t<a href=\"#\" (click)=\"changeVideo(2)\">video 2</a>\n\t\t\t<a href=\"#\" (click)=\"changeVideo(3)\">video 3</a>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map