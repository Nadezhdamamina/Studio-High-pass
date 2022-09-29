const { src, dest, series, watch } = require('gulp');
const htmlMin =require('gulp-htmlmin');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const fileInclude = require('gulp-file-include');
//const webp = require("gulp-webp");

const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const path = require('path');
const gulpif = require( 'gulp-if' );

// scss

const sass = require('sass');
const gulpSass = require('gulp-sass');
const mainSass = gulpSass(sass);
const cleanCSS = require('gulp-clean-css');
//webpcss = require('gulp-webpcss');
//const sourcemaps = require('gulp-sourcemaps');

// image
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');

// clean
const del = require('del');

// browser-sync server
const browserSync = require('browser-sync').create();

let isProd = false; // dev by default
const srcFolder = './src';
const buildFolder = './dist';
const paths = {
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
};

const toProd = (done) => {
  isProd = true;
  done();
};

const clean = () => {
  return del([buildFolder])
}

const resources = () => {
  return src(`${paths.resourcesFolder}/**`)
    .pipe(dest(buildFolder))
}

const styles = () => {
  return src(paths.srcScss, { sourcemaps: !isProd })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(dest(paths.buildCssFolder, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};

const htmlInclude = () => {
  return src([`${srcFolder}/*.html`])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    // .pipe(typograf({
    //   locale: ['ru', 'en-US']
    // }))
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src([`${srcFolder}/*.html`])
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/images/svg**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../spite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src(paths.srcMainJs)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: !isProd ? 'source-map' : false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`
    }
  });
  watch(buildFolder, htmlMinify);
  watch(paths.srcScss, styles);
  watch(paths.srcFullJs, scripts);
  watch(`${paths.resourcesFolder}/**`, resources);
  watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  watch(paths.srcSvg, svgSprites);
}

const images = () => {
  return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
  .pipe(gulpif(isProd, image([
    image.mozjpeg({
      quality: 80,
      progressive: true
    }),
    image.optipng({
      optimizationLevel: 2
    }),
  ])))
  .pipe(dest(paths.buildImgFolder))
}

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;

exports.default = series(clean, htmlInclude, scripts, styles, resources, images, svgSprites, watchFiles);

exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, images, svgSprites, htmlMinify);

