import * as THREE from "three";
import { room, FLOOR, BUILDING, WIRE } from "./Themes";
export default class Geometry {
  setBuilding(points) {
    const shape = new THREE.Shape(points);
    const extrudeSettings = { amount: 300, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial(BUILDING);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  setFloor(points) {
    const shape = new THREE.Shape(points);
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial(FLOOR);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -5);
    return mesh;
  }

  setModel(points, funcArea) {
    const shape = new THREE.Shape(points);
    const extrudeSettings = { amount: 30, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshLambertMaterial(
      room(parseInt(funcArea.Type), funcArea.Category)
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.type = "solidroom";
    return mesh;
  }

  setWire(points) {
    const shape = new THREE.Shape(points);
    const geometry = shape.createPointsGeometry();
    const material = new THREE.LineBasicMaterial(WIRE);
    const wire = new THREE.Line(geometry, material);
    wire.position.set(0, 0, 30);
    return wire;
  }
}