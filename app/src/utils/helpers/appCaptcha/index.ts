import { fontApp } from "@/pages/_app";
import { colors as muiColorMap } from "@mui/material";

type Options = {
  width?: number;
  minWidth?: number;
  height?: number;
};

const getRandomItem = function (arr: any[]) {
  var i = Math.ceil(Math.random() * (arr.length - 1));
  return arr[i];
};

export const generateCanvasUrl = (text: string, options?: Options) => {
  let width = options?.width ?? 10 * 2 + text.length * 16;
  const height = options?.height ?? 44;
  width = width <= (options?.minWidth ?? 0) ? options?.minWidth ?? 0 : width;
  const Canvas = document.createElement("canvas");
  Canvas.width = width;
  Canvas.height = height;
  const ctx = Canvas.getContext("2d")!;

  // const chars =
  //   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontFamilies = [fontApp.style.fontFamily, "monospace"];

  const colors = Object.entries(muiColorMap)
    .map(([_, colorItem]) => {
      return Object.entries(colorItem).map(([colorWeight, color]) => {
        if (["900"].includes(colorWeight)) return color;
      });
    })
    .reduce((curColors, muiColors) => {
      return curColors.concat(muiColors);
    }, [])
    .filter((color) => !!color) as string[];

  const textPositions = [
    { x: 10, y: height / 3 },
    { x: 10, y: (height * 8) / 9 },
  ];
  let lines = text.length / 2 > 5 ? text.length / 2 : 5;

  const strokeLine = (colors: string[]) => {
    const lineStart = {
      x: (Math.random() * width) / 3,
      y: Math.random() * height,
    };
    const lineEnd = {
      x: Math.random() * width,
      y: Math.random() * height,
    };
    ctx.beginPath();
    ctx.strokeStyle = getRandomItem(colors);
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.lineTo(lineEnd.x, lineEnd.y);
    ctx.stroke();
  };

  const ctxFontSize = "20px";
  const ctxFontFamily = getRandomItem(fontFamilies);
  const code = text;
  const ctxColor = getRandomItem(colors);
  const deg = (Math.random() * 2 - 1) * (Math.PI / 24);
  const baseLine = deg > 0 ? "top" : "bottom";
  const textPos = deg > 0 ? textPositions[0] : textPositions[1];

  // draw chars
  ctx.font = ctxFontSize + " " + ctxFontFamily;
  ctx.fillStyle = ctxColor;
  ctx.textBaseline = baseLine;
  ctx.rotate(deg);
  ctx.fillText(code, textPos.x, textPos.y);

  while (lines--) strokeLine(colors);

  const url = Canvas.toDataURL();
  Canvas.remove();
  return url;
};
