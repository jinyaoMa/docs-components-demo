let fontCarrier = require("font-carrier");
let fs = require("fs");
let path = require("path");

const len = 1024;

const font = fontCarrier.create({
  id: "yui-icon",
  horizAdvX: len,
  vertAdvY: len
});

font.setFontface({
  fontFamily: "yui-icon",
  unitsPerEm: len,
  ascent: 0.8 * len,
  descent: -0.2 * len
});

const svgPath = path.resolve(__dirname, "./src/");

const cssTemplatePath = path.resolve(__dirname, "./template.styl");

const targetFontsPath = path.resolve(__dirname, "./dist/yui-icon");

const targetCssPath = path.resolve(__dirname, "./dist/yui-icon.styl");

const fontFamilyClass = "yui-icon";

const prefix = `${fontFamilyClass}-`;

const uniOffset = 0x78;

fs.readdir(svgPath, (err, files) => {
  if (err) {
    return console.error(err);
  }

  let css = fs.readFileSync(cssTemplatePath).toString();
  files.forEach((file, i) => {
    if (file.endsWith(".svg")) {
      let fPath = path.resolve(svgPath, file);
      let num = (uniOffset + i).toString(16);
      let svg = fs.readFileSync(fPath).toString();
      let className = prefix + file.replace(".svg", "");
      font.setSvg(`&#x${num};`, svg);
      css += `\n.${className}:before\n  content '\\${num}'\n`;
    }
  });

  font.output({
    path: targetFontsPath
  });

  fs.writeFileSync(targetCssPath, css);
});
