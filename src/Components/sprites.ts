import { Vector } from "../../_SqueletoECS/Vector";
import { Component } from "../../_SqueletoECS/component";

// you can define the incoming types when the component is created
export interface ISpritesComponent {
  data: SpritesType | Array<SpritesType>;
}
export type SpritesType = {
  src: string;
  size: Array<number>;
  animation?: any;
};

export type spriteObject = {
  src: string;
  size: Vector;
  position?: Vector;
  offset: Vector;
  animationSequence?: string;
  frameIndex?: number;
  frameRate?: number;
  frameTik?: number;
  angle: number;
};

// this is the exported interface that is used in systems modules
export interface SpritesComponent {
  foo: SpritesType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class SpritesComp extends Component {
  // UI template string literal with UI binding of value property
  public template = `
    <style>
      sprite-layers {
      position: fixed;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      }
    </style>
    <sprite-layers \${sprite<=*sprites} style="width: \${sprite.size.x}px; height: \${sprite.size.x}px; top: \${sprite.offset.y};left: \${sprite.offset.x};background-image: url(\${sprite.src}); background-position: -\${sprite.position.x}px \${sprite.position.y}px; transform: rotate(\${sprite.angle}deg); "></sprite-layers>
    `;

  //setting default value
  public value: Array<spriteObject> = [];
  public constructor() {
    //@ts-ignore
    super("sprites", SpritesComp, true);
  }

  public define(data: ISpritesComponent): void {
    if (data == null) {
      return;
    }
    let sprites = [];
    if (!Array.isArray(data)) {
      sprites = [data];
    } else sprites = [...data];

    for (const sprite of sprites) {
      //setup as static image first;
      let currentSprite: spriteObject = {
        src: sprite.src,
        size: new Vector(sprite.size[0], sprite.size[1]),
        offset: new Vector(sprite.offset[0], sprite.offset[1]),
        angle: sprite.angle,
      };

      if (sprite.animation) {
        currentSprite.animationSequence = sprite.animation;
        currentSprite.frameIndex = 0;
        currentSprite.frameRate = sprite.animation.frameRate;
        currentSprite.frameTik = 0;
        currentSprite.position = new Vector(0, 0);
      }
      console.log(currentSprite);

      this.value.push(currentSprite);
    }
  }
}
