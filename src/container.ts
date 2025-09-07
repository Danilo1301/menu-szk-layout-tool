import { canvas, ctx, imagesCache, mousePosition } from "./main";

export class CVector2D
{
    public x: number
    public y: number

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
}

export enum HorizontalAlign
{
    Left = 0,
    Middle,
    Right
}

export enum VerticalAlign {
    Top = 0,
    Middle,
    Bottom
}

export class Container {
    public parent?: Container;

    public localOffset: CVector2D = new CVector2D(0, 0);
    public size: CVector2D = new CVector2D(200, 200);

    public horizontalAlign: HorizontalAlign = HorizontalAlign.Left;
    public verticalAlign: VerticalAlign = VerticalAlign.Top;

    public children: Container[] = [];

    public backgroundColor = "#ffffff5a";
    public drawBackground = true;
    public backgroundImage?: HTMLImageElement;
    public imageScale: number = 1;

    public fillHorizontal = false;
    public fillVertical = false;

    public fillHorizontalPercentage = 1;

    private GetParentBounds(): { position: CVector2D; size: CVector2D } {
        if (this.parent) {
            return { position: this.parent.GetPosition(), size: this.parent.size };
        }
        return {
            position: new CVector2D(0, 0),
            size: new CVector2D(canvas.width, canvas.height),
        };
    }

    public GetPosition(): CVector2D {
        const parentBounds = this.GetParentBounds();
        const parentPosition = parentBounds.position;
        const parentSize = parentBounds.size;

        // ajusta tamanho caso precise preencher
        if (this.fillHorizontal) {
            this.size.x = parentSize.x * this.fillHorizontalPercentage;
        }
        if (this.fillVertical) {
            this.size.y = parentSize.y;
        }

        const size = this.size;
        const thisPosition = new CVector2D(0, 0);

        // alinhamento horizontal
        if (this.horizontalAlign === HorizontalAlign.Left) {
            thisPosition.x = parentPosition.x;
        }
        if (this.horizontalAlign === HorizontalAlign.Middle) {
            thisPosition.x = parentPosition.x + (parentSize.x / 2) - size.x / 2;
        }
        if (this.horizontalAlign === HorizontalAlign.Right) {
            thisPosition.x = parentPosition.x + parentSize.x - size.x;
        }

        // alinhamento vertical
        if (this.verticalAlign === VerticalAlign.Top) {
            thisPosition.y = parentPosition.y;
        }
        if (this.verticalAlign === VerticalAlign.Middle) {
            thisPosition.y = parentPosition.y + (parentSize.y / 2) - size.y / 2;
        }
        if (this.verticalAlign === VerticalAlign.Bottom) {
            thisPosition.y = parentPosition.y + parentSize.y - size.y;
        }

        // offset local
        thisPosition.x += this.localOffset.x;
        thisPosition.y += this.localOffset.y;

        return thisPosition;
    }

    public Draw() {
        const position = this.GetPosition();
        const size = this.size;

        if (this.drawBackground) {
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(position.x, position.y, size.x, size.y);
        }

        if(this.backgroundImage)
        {
            const newSize = new CVector2D(size.x, size.y);
            newSize.x *= this.imageScale;
            newSize.y *= this.imageScale;

            const imagePosition = new CVector2D(position.x, position.y);

            // centraliza: soma metade da diferença
            imagePosition.x += (size.x - newSize.x) / 2;
            imagePosition.y += (size.y - newSize.y) / 2;

            ctx.drawImage(this.backgroundImage, imagePosition.x, imagePosition.y, newSize.x, newSize.y);
        }

        if (
            mousePosition.x >= position.x &&
            mousePosition.x <= position.x + size.x &&
            mousePosition.y >= position.y &&
            mousePosition.y <= position.y + size.y
        ) {
            ctx.strokeStyle = "yellow";  // cor da borda
            ctx.lineWidth = 4;           // espessura
            ctx.strokeRect(position.x, position.y, size.x, size.y);
        }

        // desenha filhos
        for (const child of this.children) {
            child.Draw();
        }
    }

    public AddChild(container: Container) {
        container.parent = this;
        this.children.push(container);
    }

    public SetBackgroundImage(fileName: string)
    {
        this.backgroundImage = imagesCache.get(fileName);
    }
}

export class Label extends Container {
    public text: string = "Label";
    public textColor: string = "black";
    public fontSize: number = 16;

    public textHorizontalAlign: HorizontalAlign = HorizontalAlign.Left;
    public textVerticalAlign: VerticalAlign = VerticalAlign.Top;

    public textMarginLeft: number = 0;

    public Draw() {
        super.Draw();

        const position = this.GetPosition();
        const size = this.size;

        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px Arial";

        // mapeia HorizontalAlign para CanvasTextAlign
        let canvasAlign: CanvasTextAlign = "left";
        if (this.textHorizontalAlign === HorizontalAlign.Left) canvasAlign = "left";
        if (this.textHorizontalAlign === HorizontalAlign.Middle) canvasAlign = "center";
        if (this.textHorizontalAlign === HorizontalAlign.Right) canvasAlign = "right";
        ctx.textAlign = canvasAlign;

        // mapeia VerticalAlign para CanvasTextBaseline
        let canvasBaseline: CanvasTextBaseline = "top";
        if (this.textVerticalAlign === VerticalAlign.Top) canvasBaseline = "top";
        if (this.textVerticalAlign === VerticalAlign.Middle) canvasBaseline = "middle";
        if (this.textVerticalAlign === VerticalAlign.Bottom) canvasBaseline = "bottom";
        ctx.textBaseline = canvasBaseline;

        // calcula posição
        let x = position.x + this.textMarginLeft;
        let y = position.y;

        if (this.textHorizontalAlign === HorizontalAlign.Middle) x += size.x / 2;
        if (this.textHorizontalAlign === HorizontalAlign.Right) x += size.x;

        if (this.textVerticalAlign === VerticalAlign.Middle) y += size.y / 2;
        if (this.textVerticalAlign === VerticalAlign.Bottom) y += size.y;

        ctx.fillText(this.text, x, y);
    }
}