const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = async function() {
    try {
        const files = await fs.readdir("src/images");
        return files.map(f => path.join("./src/images/", f)).reverse()
    } catch (err) {
        throw new Error("Unable to read 'images' folder. " + err)
    }
}