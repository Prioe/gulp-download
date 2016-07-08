# gulp-download

> [Request](https://github.com/mikeal/request) wrapper for gulp, allowing you to download files via http/https.

## Installation

```
npm install gulp-download
```

## Usage

#### Single File
```js
var download = require('gulp-download');

download('http://hastebin.com/raw/file.txt')
  .pipe(gulp.dest('downloads/'));
```

#### Multiple Files
```js
var download = require('gulp-download');

download(['http://hastebin.com/raw/file1.txt', 'http://hastebin.com/raw/file2.txt'])
  .pipe(gulp.dest('downloads/'));
```

#### Single File with custom output filename
```js
var download = require('gulp-download');
var dl = {
  file: 'renamed.txt',
  url: 'http://hastebin.com/raw/file.txt'
}

download(dl)
  .pipe(gulp.dest('downloads/'));
```

#### Multiple Files with custom output filenames
```js
var download = require('gulp-download');
var dl = [
  {
    file: 'renamed1.txt',
    url: 'http://hastebin.com/raw/file1.txt'
  },
  {
    file: 'renamed2.txt',
    url: 'http://hastebin.com/raw/file2.txt'
  }
];

download(dl)
  .pipe(gulp.dest('downloads/'));
```
