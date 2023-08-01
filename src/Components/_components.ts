// initialize all your system components here
// simply import then and create a new instance in the array
// for example
// import { Name } from "./nameComp";
// export function LoadComponents(){
//  [new Name(),... and all your other components follow]
// }

import { KeyboardComp } from "./keyboard";
import { Name } from "./nameComp";
import { Position } from "./positionComp";
import { SpritesComp } from "./sprites";
import { ZindexComp } from "./zindexComp";

// The template component is demonstrated by default, you'll probably
// want to replace it

export function LoadComponents() {
  [new SpritesComp(), new KeyboardComp(), new Position(), new Name(), new ZindexComp()];
}
