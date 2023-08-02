import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";

import steps from "../Assets/testwalk-Sheet.png";
import topsprite from "../Assets/uppersprite.png";
import { Vector } from "../../_SqueletoECS/Vector";

const walkAnimationSequence = {
  frameRate: 8,
  default: "walk",
  sequences: {
    idle: [[0, 0]],
    walk: [
      [0, 32],
      [32, 32],
      [64, 32],
      [96, 32],
      [128, 32],
      [160, 32],
      [192, 32],
      [224, 32],
    ],
  },
};

export class PlayerEntity {
  static create() {
    return Entity.create({
      id: uuidv4(),
      components: {
        name: "BOB",
        position: new Vector(25, 25),
        keyboard: "",
        zindex: 1,
        sprites: [
          {
            src: steps,
            size: [32, 32],
            angle: 0,
            offset: [-16, -16], //centers on entity
            animation: walkAnimationSequence,
          },
          {
            src: topsprite,
            size: [32, 32],
            angle: 0,
            offset: [-16, -16], //centers on entity
          },
        ],
      },
    });
  }
}
