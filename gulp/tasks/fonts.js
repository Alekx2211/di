import fs from "fs";
import path from "path";

const copyFonts = () => {
    return app.gulp
        .src(path.join(app.path.srcFolder, '/fonts/*.{ttf,woff,woff2,svg,eot}'))
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.fonts));
};

const fontsStyle = () => {
    let fontsFile = path.join(app.path.srcFolder, 'scss/fonts.scss');
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, "", cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = path.parse(fontsFiles[i]).name;
                    if (newFileOnly !== fontFileName) {
                        let [fontName, fontWeight] = fontFileName.split("-");
                        const weightMap = {
                            thin: 100,
                            extralight: 200,
                            light: 300,
                            regular: 400,
                            medium: 500,
                            semibold: 600,
                            bold: 700,
                            extrabold: 800,
                            heavy: 800,
                            black: 900,
                        };
                        fontWeight = weightMap[fontWeight?.toLowerCase()] || 400;
                        fs.appendFile(
                            fontsFile,
                            `@font-face {\n\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
                            cb
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log(
                    "Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!"
                );
            }
        }
    });
    return app.gulp.src(app.path.srcFolder);
    function cb() {}
};

export { copyFonts, fontsStyle };