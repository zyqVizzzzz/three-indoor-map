import { Scene, AmbientLight, HemisphereLight } from "three";

export default class Scaffold {
  static createLight(scene: Scene) {
    let alight = new AmbientLight(0xffffff, 0.2);
    scene.add(alight);
    let hlight = new HemisphereLight(0xffffff, 0x000000, 0.9);
    scene.add(hlight);
  }
}
