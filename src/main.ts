import { Container, CVector2D, HorizontalAlign, Label, VerticalAlign } from './container';
import './style.css'

export const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
export const ctx = canvas.getContext("2d")!;

const screenContainer = new Container();
screenContainer.backgroundColor = "#00000000";
screenContainer.horizontalAlign = HorizontalAlign.Middle;
screenContainer.verticalAlign = VerticalAlign.Middle;
screenContainer.fillHorizontal = true;
screenContainer.fillVertical = true;
screenContainer.drawBackground = true;

const testContainer = new Container();
testContainer.backgroundColor = "gray";
testContainer.size = new CVector2D(500, 200);
testContainer.horizontalAlign = HorizontalAlign.Middle;
testContainer.verticalAlign = VerticalAlign.Middle;
testContainer.fillHorizontal = false;
screenContainer.AddChild(testContainer);

const testChild1 = new Container();
testChild1.backgroundColor = "blue";
testChild1.size = new CVector2D(50, 50);
testChild1.horizontalAlign = HorizontalAlign.Left;
testChild1.verticalAlign = VerticalAlign.Middle;
testChild1.fillHorizontal = false;
testContainer.AddChild(testChild1);

const testChild2 = new Container();
testChild2.backgroundColor = "blue";
testChild2.size = new CVector2D(100, 50);
testChild2.horizontalAlign = HorizontalAlign.Right;
testChild2.verticalAlign = VerticalAlign.Middle;
testChild2.fillHorizontal = false;
testContainer.AddChild(testChild2);

const text1 = new Label();
text1.fontSize = 24;
text1.fillHorizontal = true;
text1.fillVertical = true;
text1.textHorizontalAlign = HorizontalAlign.Middle;
text1.textVerticalAlign = VerticalAlign.Middle;
testChild2.AddChild(text1);

// 1. Cria um objeto Image
const img = new Image();
img.src = "gta_screenshot.png"; // caminho relativo ou URL

// 2. Espera a imagem carregar
img.onload = () => {
  main();
};

function main()
{
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  screenContainer.Draw();
}