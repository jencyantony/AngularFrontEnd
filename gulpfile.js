'use strict';

var gulp = require("gulp");
var connect = require("gulp-connect");

//gulp-connect - connects to a webserver
gulp.task("connect", function(){
  connect.server({root: '.', port: 8085});
});

gulp.task("watch", function(){
  gulp.watch("./index.html", ["reload"]);
});

gulp.task("reload", function(){
  gulp.src("./*.html").pipe(connect.reload());
});

//default task for command "gulp"
gulp.task("default", ["watch", "connect"]);
