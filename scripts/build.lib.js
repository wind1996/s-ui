const runCmd = require("./basic/runCmd");

require("./gulpfile")

runCmd("rimraf ./dist", "", function (...arg) {
    runCmd("gulp --gulpfile=./scripts/gulpfile.js build-dist", "", function (...arg) {
        console.log("build-es complete")
    })
})
