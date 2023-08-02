import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { SpritesComponent } from "../Components/sprites";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type SpriteEntity = Entity & SpritesComponent;

export class animateSpriteSystem extends System {
  template = ``;
  public constructor() {
    super("animate");
  }

  public processEntity(entity: SpriteEntity): boolean {
    // return the test to determine if the entity has the correct properties
    return entity.sprites != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: SpriteEntity[]): void {
    entities.forEach(entity => {
      if (!this.processEntity(entity)) {
        return;
      }

      entity.sprites.forEach(sprite => {
        if (sprite.animationSequence) {
          //this layer is animated
          if (
            sprite.frameTik != undefined &&
            sprite.frameIndex != undefined &&
            sprite.frameRate != undefined &&
            sprite.position != undefined
          ) {
            sprite.frameTik++;

            if (sprite.frameTik == sprite.frameRate) {
              sprite.frameIndex++;
              sprite.frameTik = 0;

              //check if at end of currentsequence array
              if (sprite.frameIndex >= sprite.animationSequence.sequences[sprite.currentSequence as string].length) {
                sprite.frameIndex = 0;
              }

              //update position of sprite based on sequence
              sprite.position.x = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][0];
              sprite.position.y = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][1];
              //console.log("position", sprite.position);
            }
          }
        }
      });
    });
  }
}
