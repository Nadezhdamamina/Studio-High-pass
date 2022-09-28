const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin =require('gulp-htmlmin');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;

// scss
const gulpif = require( 'gulp-if' );
//const sass = require( 'gulp-sass' );
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// image
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');

// clean
const del = require('del');

// browser-sync server
const browserSync = require('browser-sync').create();

// dev/production
const yargs = require( 'yargs' );
const PRODUCTION = yargs.argv.production;

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

//const styles = () => {
  //return src('src/styles/**/*.css')
  //.pipe(sourcemaps.init())
  //.pipe(concat('main.css'))
  // .pipe(autoprefixer({
  //   cascade: false,
  // }))
  // .pipe(cleanCSS({
  //   level: 2
  // }))
  //.pipe(sourcemaps.write())
  //.pipe(dest('dist'))
  //.pipe(browserSync.stream())
//}

const styles = ( done ) => {
  src('src/styles/**/*.css')
  .pipe( gulpif( ! PRODUCTION, sourcemaps.init() ))
  .pipe(concat('main.css'))
  //.pipe( gulpif( ! PRODUCTION, sass().on( 'error', sass.logError )))
  .pipe( gulpif( ! PRODUCTION, sourcemaps.write() ))
  .pipe(autoprefixer({
    cascade: false,
  }))
  .pipe( gulpif( ! PRODUCTION, cleanCSS({
    level: 2
  })) )
  .pipe( dest('dist'))
  .pipe(browserSync.stream());

  done();
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
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

// const scripts = () => {
//   return src([
//     'src/js/components/**/*.js',
//     'src/js/main.js'
//   ])
//   //.pipe(sourcemaps.init())
//   // .pipe(babel({
//   //   presets: ['@babel/env']
//   // }))
//   // .pipe(concat('app.js'))
//   // .pipe(uglify().on('error', notify.onError()))
//   //.pipe(sourcemaps.write())
//   // .pipe(dest('dist'))
//   // .pipe(browserSync.stream())
// }

const scripts = ( ) => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])

  .pipe( gulpif( ! PRODUCTION, sourcemaps.init() ))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe( gulpif( PRODUCTION, uglify().on('error', notify.onError())))
  .pipe( gulpif( ! PRODUCTION, sourcemaps.write() ))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());

}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}


watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;

exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles);
exports.build = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles);
//exports.default = exports.dev;
