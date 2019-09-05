const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');

function clearTempFiles() {
    const tempDir = __dirname + '/temp';

    if (!fs.existsSync(tempDir)) {
        console.log("Brak plików tymczasowych do usunięcia");
        return;
    }
    else {
        fs.readdir(tempDir, function (err, files) {
            files.forEach(function (file, index) {
                fs.stat(path.join(tempDir, file), function (err, stat) {
                    var endTime, now;
                    if (err) {
                        return console.error(err);
                    }
                    now = new Date().getTime();
                    endTime = new Date(stat.ctime).getTime() + 1000 * 60;
                    if (now > endTime) {
                        return rimraf(path.join(tempDir, file), function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log('Usunięto pliki tymczasowe');
                        });
                    }
                });
            });
        });
    }
}

module.exports = {
    clearTempFiles
}