const runCmd = require("./basic/runCmd");

require("./gulpfile")

runCmd("rimraf ./es", "", function (...arg) {
    runCmd("tsc -p tsconfig.build.json", "", function (...arg) {
        runCmd("gulp --gulpfile=./scripts/gulpfile.js less-es", "", function (...arg) {
            console.log("build-es complete")
        })
    })
})
