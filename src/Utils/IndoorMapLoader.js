import * as THREE from "three";
import Mall from "./Mall";
import Geometry from './Geometry';
import { getBoundingRect } from "./Common";

class IndoorMapLoader extends THREE.Loader {
  load(url, callback, texturePath) {
    this.fetchJSON(url, callback);
  }
  fetchJSON(url, callback) {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const result = this.parse(json);
        callback(result);
      });
  }
  parse(json) {
    return new ParseModel(json).parse();
  }
}

class ParseModel {
  constructor(json) {
    this.json = json;
    this.geometry = new Geometry();
    this.mall = new Mall();
  }
  parse() {
    let building, points, scale = 0.1;
    //floor geometry
    for (let i = 0; i < this.json.data.Floors.length; i++) {
      let floor = this.json.data.Floors[i];
      floor.rect = getBoundingRect(floor.Outline[0][0]);
      points = this._parsePoints(floor.Outline[0][0]);

      let floorObj = new THREE.Object3D();
      floorObj.height = 80.0;
      floorObj.add(this.geometry.setFloor(points));
      floorObj.points = [];
      floorObj._id = floor._id;
      this.mall.floors.push(floorObj);

      // funcAreas geometry
      for (let j = 0; j < floor.FuncAreas.length; j++) {
        let funcArea = floor.FuncAreas[j];
        funcArea.rect = getBoundingRect(funcArea.Outline[0][0]);

        points = this._parsePoints(funcArea.Outline[0][0]);
        floorObj.add(this.geometry.setModel(points, funcArea));
        floorObj.add(this.geometry.setWire(points));

        const center = funcArea.Center;
        floorObj.points.push({
          name: funcArea.Name,
          type: funcArea.Type,
          position: new THREE.Vector3(
            center[0] * scale,
            50.0 * scale,
            -center[1] * scale
          ),
        });
      }

      //pubPoint geometry
      for (let j = 0; j < floor.PubPoint.length; j++) {
        let pubPoint = floor.PubPoint[j];
        let point = this._parsePoints(pubPoint.Outline[0][0])[0];
        floorObj.points.push({
          name: pubPoint.Name,
          type: pubPoint.Type,
          position: new THREE.Vector3(
            point.x * scale,
            50.0 * scale,
            -point.y * scale
          ),
        });
      }
    }

    //building geometry
    building = this.json.data.building;
    points = this._parsePoints(building.Outline[0][0]);
    this.mall.FrontAngle = building.FrontAngle;
    if (points.length > 0) {
      this.mall.building = this.geometry.setBuilding(points);
    }

    //scale the mall
    this.mall.root = new THREE.Object3D();
    this.mall.root.scale.set(scale, scale, scale);
    this.mall.root.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

    return this.mall;
  }

  _parsePoints(pointArray) {
    let shapePoints = [];
    for (let i = 0; i < pointArray.length; i += 2) {
      let point = new THREE.Vector2(pointArray[i], pointArray[i + 1]);
      if (i > 0) {
        let lastpoint = shapePoints[shapePoints.length - 1];
        if (point.x !== lastpoint.x || point.y !== lastpoint.y) {
          shapePoints.push(point);
        }
      } else {
        shapePoints.push(point);
      }
    }
    return shapePoints;
  }
}

export default IndoorMapLoader;
