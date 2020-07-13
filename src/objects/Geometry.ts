import * as THREE from "three";
import {
  room,
  FloorThemes,
  BuildingThemes,
  WireThemes,
} from "utils/Themes";
import {FuncArea} from 'interface/map';

export default class Geometry {
  setBuilding(points: Array<THREE.Vector2>) {
    const { MATERIAL, OFFSET, HEIGHT } = BuildingThemes;
    const shape = new THREE.Shape(points);
    const extrudeSettings = { amount: HEIGHT, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial(MATERIAL);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -OFFSET);
    return mesh;
  }

  setFloor(points: Array<THREE.Vector2>) {
    const { OFFSET: BUILDING_OFFSET } = BuildingThemes;
    const { MATERIAL, OFFSET } = FloorThemes;
    const shape = new THREE.Shape(points);
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial(MATERIAL);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -(BUILDING_OFFSET + OFFSET));
    return mesh;
  }

  setModel(points: Array<THREE.Vector2>, funcArea: FuncArea) {
    const { OFFSET } = BuildingThemes;
    const shape = new THREE.Shape(points);
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 30,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial(
      room(parseInt(funcArea.Type), funcArea.Category)
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -OFFSET);
    mesh.type = "solidroom";
    return mesh;
  }

  setWire(points: Array<THREE.Vector2>) {
    const { OFFSET: BUILDING_OFFSET } = BuildingThemes;
    const { MATERIAL, OFFSET } = WireThemes;
    const shape = new THREE.Shape(points);
    const geometry = shape.createPointsGeometry(0);
    const material = new THREE.LineBasicMaterial(MATERIAL);
    const wire = new THREE.Line(geometry, material);
    wire.position.set(0, 0, -(BUILDING_OFFSET - OFFSET));
    return wire;
  }
}
