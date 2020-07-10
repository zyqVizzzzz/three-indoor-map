import * as THREE from "three";
import { room, FLOOR, BUILDING, WIRE } from "./Themes";

export const OFFSET = 600;
export const FLOOR_OFFSET = 5;
export const WIRE_OFFSET = 30;
export const BUILD_HEIGHT = 500;
export const FLOOR_HEIGHT = 80;
export const MODEL_HEIGHT = 30;
export const SCALE = 0.1;

export default class Geometry {
  setBuilding(points) {
    const shape = new THREE.Shape(points);
    const extrudeSettings = { amount: BUILD_HEIGHT, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial(BUILDING);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -OFFSET);
    return mesh;
  }

  setFloor(points) {
    const shape = new THREE.Shape(points);
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial(FLOOR);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -(OFFSET + FLOOR_OFFSET));
    return mesh;
  }

  setModel(points, funcArea) {
    const shape = new THREE.Shape(points);
    const extrudeSettings = { amount: 30, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial(
      room(parseInt(funcArea.Type), funcArea.Category)
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -OFFSET);
    mesh.type = "solidroom";
    return mesh;
  }

  setWire(points) {
    const shape = new THREE.Shape(points);
    const geometry = shape.createPointsGeometry();
    const material = new THREE.LineBasicMaterial(WIRE);
    const wire = new THREE.Line(geometry, material);
    wire.position.set(0, 0, -(OFFSET - WIRE_OFFSET));
    return wire;
  }
}