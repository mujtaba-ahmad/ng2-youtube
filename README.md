# ng2-youtube (Angular2 youtubebar)
Angular2 youtube light player, using youtube iframe api. Inspired by echoes player. Complatible with latest release of angular 2.x.x.

## Functionality
1. fetch youtube video data provided video id and apiKey
2. show sticky youtube bar at the bottom of page.
3. Youtube bar has video data with video display and with controllers like play, pause, volume, mute, unmute progressbar.

## Demo
![demo image](https://www.diigo.com/file/image/sqoorqbzdddpeceedzceproqsa/video+image.jpg)


## Usage
Follow these steps:

### 1. Update your `systemjs.config.js` file.
Add following line in map:

```js
map: {
      //...
      'ng2-youtube': 'npm:ng2-youtube'
     }
```
-and in packages:

```js
packages: {
      //...
      'ng2-youtube': {
        main: './index.js',
        defaultExtension: 'js'
      }
```

### 2. Update the index.html
Add this boostrap cdn to you index.html page or download it and place it in you application's assets and then link it to index.html . If you are using angular2 bootstrap, dont include it.
```html
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

### 3 Get google youtube api key
try to get api, https://developers.google.com/youtube/v3/getting-started. You will use this apikey later in setup.

### 4 Add modules and components
Firstly to fetch video title, description and thumbnail from youtube api we are going to make http call.
 -In your main module file import http module
```ts
import { HttpModule } from '@angular/http';
@NgModule({
  imports:      [ BrowserModule, HttpModule ]
})
```
 -In your main module also import ng2-youtube componentsand services.
```ts
import { YoutubePlayerComponent, WindowRef, YoutubeService } from 'ng2-youtube/index';
```
 -Add component and providers into our ngModule
 ```ts
 @NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, YoutubePlayerComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ WindowRef, YoutubeService ]
})
 ```
 ### 5 Add youtube iframe Api in html through main component
 -In your main component implement it with AfterViewInit so that it appends iframe api file after the view is initiated. To make sure it loaded after the view is created, else it will not work.
 ```ts
import { Component, AfterViewInit } from '@angular/core';
export class AppComponent implements AfterViewInit{
      ngAfterViewInit() {
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
}
```
 ### 6 Use youtube component
 To show youtube bar in any component import youtube component in you component.
 
 ```ts
 import { YoutubePlayerComponent } from 'ng2-youtube/index'
 ```
 -In component decorator add youtube-player selecter like this.
 ```ts
 <youtube-player [id]="id" [apiKey]="apiKey"></youtube-player>
 ```
 youtube player has 2 attributes that are necessary to be provided
 1. id = youtube video id
 2. apiKey = youtube developers api key to fetch youtube data.
 
 ```ts
 @Component({
  selector: 'my-app',
  template: `<h1>My First Angular App</h1>
            <youtube-player [id]="id" [apiKey]="apiKey"></youtube-player>`
});
export class AppComponent implements AfterViewInit{
      private id: string;
      private apiKey: string;
      constructor() {
            this.id = "VzjJR6tTx1c";
            this.apiKey = "AIzaSyCe0Bk74tTA11XtbRQDqgUy9n9d0tkjv4k";
      }
}
```

-Thats all, it will start playing that video.


# License
 [MIT](/LICENSE)
