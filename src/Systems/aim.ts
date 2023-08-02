import { Camera } from "../../_SqueletoECS/Camera";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { PositionComponent } from "../Components/positionComp";
import { SpritesComponent } from "../Components/sprites";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type SpriteEntity = Entity & SpritesComponent & PositionComponent;

export class aimSystem extends System {
  viewport: any;
  template = ``;
  mouseX: number = 0;
  mouseY: number = 0;
  viewportX: number | undefined;
  viewportY: number | undefined;

  public constructor(camera: Camera) {
    super("aim");
    setTimeout(() => {
      this.viewport = camera.getViewport();
      (this.viewport as HTMLElement).addEventListener("mousemove", this.mouseHandler);
      this.viewportX = (this.viewport as HTMLElement).getBoundingClientRect().left;
      this.viewportY = (this.viewport as HTMLElement).getBoundingClientRect().top;
    }, 500);
  }

  public processEntity(entity: SpriteEntity): boolean {
    // return the test to determine if the entity has the correct properties
    return entity.sprites != null && entity.position != null;
    // entities that have position and velocity properties can use this system
    return true;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: SpriteEntity[]): void {
    entities.forEach(entity => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this
      if (!this.processEntity(entity)) {
        return;
      }

      console.log("relative vector", entity.position.x - this.mouseX / 3, entity.position.y - this.mouseY / 3);
    });
  }

  mouseHandler = (e: MouseEvent) => {
    if (e.target) {
      //@ts-ignore
      this.mouseX = e.clientX - this.viewportX;
      //@ts-ignore
      this.mouseY = e.clientY - this.viewportY;
    }
  };
}
