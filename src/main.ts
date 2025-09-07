import { Container, CVector2D, HorizontalAlign, Label, VerticalAlign } from './container';
import './style.css'

export const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
export const ctx = canvas.getContext("2d")!;

export const imagesCache = new Map<string, HTMLImageElement>();

export const mousePosition = new CVector2D(0, 0);

const screenContainer = new Container();

loadImages([
  "gta_screenshot.png",
  "texture1.png",
  "left.png",
  "right.png",
  "checkbox_off.png",
  "checkbox_on.png"
]).then(() => {
  main();
}).catch(err => {
  console.error(err);
});

function main()
{

  //

  screenContainer.backgroundColor = "#00000000";
  screenContainer.horizontalAlign = HorizontalAlign.Middle;
  screenContainer.verticalAlign = VerticalAlign.Middle;
  screenContainer.fillHorizontal = true;
  screenContainer.fillVertical = true;
  screenContainer.drawBackground = true;

  createMenuDesign();

  

  requestAnimationFrame(loop);
}

function loop()
{
  updateMouse();

  // Limpa a tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imagesCache.get("gta_screenshot.png")!, 0, 0, canvas.width, canvas.height);

  screenContainer.Draw();

  requestAnimationFrame(loop);
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();

  // escala entre o tamanho real do canvas e o tamanho exibido
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  mousePosition.x = (e.clientX - rect.left) * scaleX;
  mousePosition.y = (e.clientY - rect.top) * scaleY;
});

function updateMouse() {
  // Aqui você pode passar mouseX/mouseY pros containers,
  // checar colisões etc
  // Ex: console.log(mouseX, mouseY);
}

function createMenuDesign()
{
  const testContainer = new Container();
  testContainer.backgroundColor = "gray";
  testContainer.size = new CVector2D(800, 200);
  testContainer.localOffset = new CVector2D(500, 150);
  testContainer.horizontalAlign = HorizontalAlign.Left;
  testContainer.verticalAlign = VerticalAlign.Top;
  testContainer.fillHorizontal = false;
  testContainer.SetBackgroundImage("texture1.png");
  screenContainer.AddChild(testContainer);

  const windowText = new Label();
  windowText.text = "Minha Janela";
  windowText.fontSize = 70;
  windowText.fillHorizontal = true;
  windowText.fillVertical = true;
  windowText.drawBackground = false;
  windowText.textColor = "white";
  windowText.textHorizontalAlign = HorizontalAlign.Middle;
  windowText.textVerticalAlign = VerticalAlign.Middle;
  testContainer.AddChild(windowText);

  const titleContainer = new Container();
  titleContainer.localOffset = new CVector2D(0, 60);
  titleContainer.backgroundColor = "black";
  titleContainer.size = new CVector2D(800, 60);
  titleContainer.horizontalAlign = HorizontalAlign.Left;
  titleContainer.verticalAlign = VerticalAlign.Bottom;
  titleContainer.fillHorizontal = false;
  testContainer.AddChild(titleContainer);

  const text1 = new Label();
  text1.text = "Label da janela"
  text1.fontSize = 30;
  text1.fillHorizontal = true;
  text1.fillVertical = true;
  text1.drawBackground = false;
  text1.textColor = "white";
  text1.textMarginLeft = 20;
  text1.textHorizontalAlign = HorizontalAlign.Left;
  text1.textVerticalAlign = VerticalAlign.Middle;
  titleContainer.AddChild(text1);

  for(let i = 0; i < 4; i++)
  {
    const itemContainer = new Container();
    itemContainer.localOffset = new CVector2D(0, 60 + 80 + (i * 80));
    itemContainer.backgroundColor = "rgb(0, 0, 0, 0.4)";
    itemContainer.size = new CVector2D(800, 80);
    itemContainer.horizontalAlign = HorizontalAlign.Left;
    itemContainer.verticalAlign = VerticalAlign.Bottom;
    itemContainer.fillHorizontal = false;
    testContainer.AddChild(itemContainer);

    {
      const title = new Label();
      title.text = "Texto do item"
      title.fontSize = 28;
      title.fillHorizontal = true;
      title.fillVertical = true;
      title.drawBackground = false;
      title.textColor = "white";
      title.textMarginLeft = 20;
      title.textHorizontalAlign = HorizontalAlign.Left;
      title.textVerticalAlign = VerticalAlign.Middle;
      itemContainer.AddChild(title);

      const actionsContainer = new Container();
      actionsContainer.horizontalAlign = HorizontalAlign.Right;
      actionsContainer.fillHorizontalPercentage = 0.5;
      actionsContainer.fillHorizontal = true;
      actionsContainer.fillVertical = true;
      actionsContainer.drawBackground = false;
      itemContainer.AddChild(actionsContainer);

      if(i == 0)
      {
        const leftButton = new Container();
        leftButton.horizontalAlign = HorizontalAlign.Left;
        leftButton.size = new CVector2D(80, 80);
        leftButton.fillVertical = true;
        leftButton.drawBackground = false;
        leftButton.imageScale = 0.5;
        leftButton.SetBackgroundImage("left.png");
        actionsContainer.AddChild(leftButton);

        const rightButton = new Container();
        rightButton.horizontalAlign = HorizontalAlign.Right;
        rightButton.size = new CVector2D(80, 80);
        rightButton.drawBackground = false;
        rightButton.imageScale = 0.5;
        rightButton.SetBackgroundImage("right.png");
        actionsContainer.AddChild(rightButton);

        const optionsText = new Label();
        optionsText.textColor = "white";
        optionsText.horizontalAlign = HorizontalAlign.Middle;
        optionsText.fontSize = 30;
        optionsText.size = new CVector2D(80, 80);
        optionsText.fillHorizontal = true;
        optionsText.drawBackground = false;
        optionsText.textHorizontalAlign = HorizontalAlign.Middle;
        optionsText.textVerticalAlign = VerticalAlign.Middle;
        actionsContainer.AddChild(optionsText);
      }

      if(i == 1)
      {
        const rightButton = new Container();
        rightButton.horizontalAlign = HorizontalAlign.Right;
        rightButton.size = new CVector2D(80, 80);
        rightButton.drawBackground = false;
        rightButton.imageScale = 0.7;
        rightButton.SetBackgroundImage("checkbox_on.png");
        actionsContainer.AddChild(rightButton);
      }

      if(i == 2)
      {
        const rightButton = new Container();
        rightButton.horizontalAlign = HorizontalAlign.Right;
        rightButton.size = new CVector2D(80, 80);
        rightButton.drawBackground = false;
        rightButton.imageScale = 0.7;
        rightButton.SetBackgroundImage("checkbox_off.png");
        actionsContainer.AddChild(rightButton);
      }

      if(i == 3)
      {
        const rightButton = new Container();
        rightButton.horizontalAlign = HorizontalAlign.Left;
        rightButton.size = new CVector2D(80, 80);
        rightButton.drawBackground = false;
        rightButton.imageScale = 0.3;
        rightButton.SetBackgroundImage("right.png");
        itemContainer.AddChild(rightButton);

        title.textMarginLeft = 80;
        title.text = "Fechar";
      }
    }
  }
}

function loadImages(urls: string[]): Promise<HTMLImageElement[]> {
  return new Promise((resolve, reject) => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < urls.length; i++) {
      const img = new Image();
      img.src = urls[i];

      img.onload = () => {
        images[i] = img;

        imagesCache.set(urls[i], img)

        loaded++;
        if (loaded === urls.length) {
          resolve(images);
        }
      };

      img.onerror = () => {
        reject(new Error(`Erro ao carregar imagem: ${urls[i]}`));
      };
    }
  });
}