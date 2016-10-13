# ng2-youtube (Angular2 youtubebar)
Angular2 youtube light player, using youtube iframe api. Inspired by echoes player. Complatible with latest release of angular 2.x.x.

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

