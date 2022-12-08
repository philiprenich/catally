const Image = require("@11ty/eleventy-img");
const path = require("node:path");

const meta = require("./src/_data/meta");

async function imageShortcode(src, alt, caption, sizes) {
  const filename = path.basename(src).replace(path.extname(src), "")

  caption = caption || meta[filename] ? meta[filename].caption : "🙀";
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
  const html = Image.generateHTML(metadata, imageAttributes);

  const figCaption = caption ? `<figcaption>${caption}</figcaption>` : "";
  return `<figure>${html}${figCaption}</figure>`;
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