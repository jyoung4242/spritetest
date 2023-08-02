// Library
import { Scene } from "../../_SqueletoECS/Scene";
import { Vector } from "../../_SqueletoECS/Vector";
import { Engine } from "@peasy-lib/peasy-engine";

//Systems
import { Camera, ICameraConfig } from "../../_SqueletoECS/Camera"; //this is in Squeleto library
import { animateSpriteSystem } from "../Systems/animateSprite";
import { aimSystem } from "../Systems/aim";

// Entities
import { PlayerEntity } from "../Entities/player";

export class Test extends Scene {
  name: string = "test";
  entities: any = [];
  entitySystems: any = [];
  sceneSystems: any = [];
  public template = `
    <scene-layer>
        < \${ sceneSystem === } \${ sceneSystem <=* sceneSystems }
    </scene-layer>
  `;
  public init = (): void => {
    // add default entities to the array
    let plr = PlayerEntity.create();
    console.log(plr);

    this.entities.push(plr);

    let anim = new animateSpriteSystem();
    console.log(anim);

    //establish Scene Systems - Configuring Camera
    let cConfig: ICameraConfig = {
      name: "camera",
      viewPortSystems: [anim],
      gameEntities: this.entities,
      position: new Vector(0, 0),
      size: new Vector(400, 266.67),
    };
    let camera = Camera.create(cConfig);
    console.log(camera);

    let aim = new aimSystem(camera);
    camera.vpSystems.push(aim);

    //give the camera its systems to own
    //camera.vpSystems.push(new KeyboardSystem(), new MovementSystem());

    //Systems being added for Scene to own
    this.sceneSystems.push(camera);

    //Start GameLoop
    Engine.create({ fps: 60, started: true, callback: this.update });
  };

  //GameLoop update method
  update = (deltaTime: number): void | Promise<void> => {
    this.sceneSystems.forEach((system: any) => {
      system.update(deltaTime / 1000, 0, this.entities);
    });
  };
}
