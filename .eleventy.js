const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600],
      formats: ["avif", "jpeg"],
      urlPath: "/images",
      outputDir: "./_site/images/"
    });
  
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
  
    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  }

module.exports = function(config) {
    config.addNunjucksAsyncShortcode("image", imageShortcode);
    config.addLiquidShortcode("image", imageShortcode);
    config.addJavaScriptFunction("image", imageShortcode);

    config.addPassthroughCopy("./src/styles");

    config.addWatchTarget("./src/styles/");

    return {
        dir: {
            input: "src"
        }
    }
}