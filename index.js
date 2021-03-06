var through = require('through');
var gutil = require('gulp-util');
var request = require('request');
var progress = require('request-progress');
var ansi = require('ansi');
var stripAnsi = require('strip-ansi');
var bytes = require('bytes');
var cursor = ansi(process.stdout);
var col = gutil.colors;

module.exports = function(urls) {
  var stream = through(function(file, enc, cb) {
    this.push(file);
    cb();
  });

  var files = typeof urls === 'string' ? [urls] : urls;
  var downloadCount = 0;

  function download(url) {
    var fileName;
    var firstLog = true;
    var msgLen = 0;

    if (typeof url === 'object') {
      fileName = url.file;
      url = url.url;
    } else {
      fileName = url.split('/').pop();
    }

    progress(
      request(
        {
          url: url,
          encoding: null
        }, downloadHandler),
      {
        throttle: 1000,
        delay: 1000
      }
    )

    .on('progress', function(state) {
      var str = Math.ceil(state.percentage * 100) + '% | ' +
        bytes(state.speed, { decimalPlaces: 1 }) + '/s';
      cursor.horizontalAbsolute(msgLen + 1).eraseLine().write(str);
    })

    .on('data', function() {
      if(firstLog) {
        var str = '[' + col.green('gulp') + ']' + ' Downloading ' + col.cyan(url) + '... ';
        process.stdout.write(str);
        firstLog = false;
        msgLen = stripAnsi(str).length;
      }
    });

    function downloadHandler(err, res, body) {
      var file = new gutil.File({
        path: fileName,
        contents: new Buffer(body)
      });
      stream.queue(file);

      cursor.horizontalAbsolute(msgLen - 3).eraseLine().write(col.green(' Complete!\n'));
      downloadCount++;
      if(downloadCount != files.length) {
        download(files[downloadCount]);
      } else {
        stream.emit('end');
      }
    }
  }
  download(files[0]);

  return stream;
};
