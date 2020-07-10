import * as THREE from "three";
import { room, FLOOR, BUILDING, WIRE } from "utils/Themes";
import { Rect } from 'utils/Common'

export const OFFSET: number = 600;
export const FLOOR_OFFSET: number = 5;
export const WIRE_OFFSET: number = 30;
export const BUILD_HEIGHT: number = 500;
export const FLOOR_HEIGHT: number = 80;
export const MODEL_HEIGHT: number = 30;
export const SCALE: number = 0.1;

interface FuncArea {
  Area: number;
  Brand: number;
  BrandShop: number;
  Breif: string;
  Category: number;
  Category2: number;
  Center: number[];
  Name: string;
  Name_en: string;
  Outline: number[];
  ShopNo: string;
  Type: string;
  dianping_id: number;
  name: string;
  rect: Rect;
}

export default class Geometry {
  setBuilding(points: Array<THREE.Vector2>) {
    const shape = new THREE.Shape(points);
    const extrudeSettings = { amount: BUILD_HEIGHT, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial(BUILDING);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -OFFSET);
    return mesh;
  }

  setFloor(points: Array<THREE.Vector2>) {
    const shape = new THREE.Shape(points);
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial(FLOOR);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -(OFFSET + FLOOR_OFFSET));
    return mesh;
  }

  setModel(points: Array<THREE.Vector2>, funcArea: FuncArea) {
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
    const shape = new THREE.Shape(points);
    const geometry = shape.createPointsGeometry(0);
    const material = new THREE.LineBasicMaterial(WIRE);
    const wire = new THREE.Line(geometry, material);
    wire.position.set(0, 0, -(OFFSET - WIRE_OFFSET));
    return wire;
  }
}
