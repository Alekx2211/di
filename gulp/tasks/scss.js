import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import beautify from 'gulp-beautify'
import { log } from 'console'

const sass = gulpSass(dartSass)

const scss = () => {
	return app.gulp
		.src(app.path.src.scss, {
			sourcemaps: app.isDev,
		})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SCSS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(app.plugins.replace(/\/\/(.*)/g, '/* $1 */'))
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: 'autoplace',
					overrideBrowserslist: ['last 3 versions'],
					cascade: true,
				})
			)
		)
		.pipe(
			beautify.css({
				indent_with_tabs: true,
				indent_size: 4,
				preserve_comments: true,
			})
		)
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream())
}

export { scss }