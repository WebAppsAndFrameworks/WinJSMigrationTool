#! /usr/bin/env node
'use strict';

var fs = require('fs');
var cheerio = require('cheerio');
var beautify_html = require('js-beautify').html;
var path = require('path');

var dirs = process.argv.slice(2);

function read(inputfile) {
  fs.readFile(inputfile, 'utf8', function(err, data) {
    var $ = cheerio.load(data);
    $('button').addClass('win-button');
    $('select').addClass('win-dropdown');
    $('option').addClass('win-dropdown');
    $('input[type="text"]').addClass('win-textbox');
    $('input[type="radio"]').addClass('win-radio');
    $('input[type="button"]').addClass('win-button');
    $('input[type="file"]').addClass('win-button');
    $('input[type="file"]').addClass('win-button-file');
    $('input[type="range"]').addClass('win-slider');
    $('textarea').addClass('win-textarea');
    //$('progress').addClass('win-progress-bar');
    $('a').addClass('win-link');
    $('h1').addClass('win-type-header');
    $('h2').addClass('win-type-subheader');
    $('h3').addClass('win-type-title');
    $('h4').addClass('win-type-subtitle');
    $('h5').addClass('win-type-base');
    $('h6').addClass('win-type-body');
    $('input[type="checkbox"]').addClass('win-checkbox');
    $('body').addClass('win-type-body');
    ['text', 'password', 'email', 'number', 'tel', 'url', 'search'].forEach(function(input) {
      $('input[type="' + input + '"]').addClass('win-textbox');
    });

    var output = beautify_html($.html());
    output = output.replace(/\&\#xFEFF\;\n/, '');
    output = output.replace(/\&\#xFEFF\;/, '');
    fs.writeFile(inputfile, output, function(err) {
      console.log('wrote file ' + inputfile);
    });
  });
}

dirs.forEach(function(dir) {
  read(path.resolve(dir));
});
