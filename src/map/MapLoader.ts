import * as THREE from "three";
import Mall from "objects/Mall";
import Geometry from "objects/Geometry";
import { getBoundingRect } from "utils/Common";
import { FloorThemes, CommonThemes } from "utils/Themes";

class MapLoader extends THREE.Loader {
  load(url: string, callback: (mall: Mall) => void) {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const result = this.parse(json);
        callback(result);
      });
  }
  parse(json: any) {
    return new ParseModel(json).parse();
  }
}

class ParseModel {
  public json: any;
  public geometry: Geometry;
  public mall: Mall;

  constructor(json: any) {
    this.json = json;
    this.geometry = new Geometry();
    this.mall = new Mall();
  }
  parse() {
    let building, points;
    const { HEIGHT } = FloorThemes;
    const { SCALE } = CommonThemes;
    //floor geometry
    for (let i = 0; i < this.json.data.Floors.length; i++) {
      let floor = this.json.data.Floors[i];
      floor.rect = getBoundingRect(floor.Outline[0][0]);
      points = this._parsePoints(floor.Outline[0][0]);

      let floorObj = new THREE.Object3D();
      floorObj.userData.height = HEIGHT;
      floorObj.add(this.geometry.setFloor(points));
      floorObj.userData.points = [];
      floorObj.userData._id = floor._id;
      floorObj.name = `floorGroup`
      this.mall.floors.push(floorObj);

      // funcAreas geometry
      for (let j = 0; j < floor.FuncAreas.length; j++) {
        let funcArea = floor.FuncAreas[j];
        funcArea.rect = getBoundingRect(funcArea.Outline[0][0]);

        points = this._parsePoints(funcArea.Outline[0][0]);
        floorObj.add(this.geometry.setModel(points, funcArea));
        floorObj.add(this.geometry.setWire(points));

        const center = funcArea.Center;
        floorObj.userData.points.push({
          name: funcArea.Name,
          type: funcArea.Type,
          position: new THREE.Vector3(
            center[0] * SCALE,
            HEIGHT * SCALE,
            -center[1] * SCALE
          ),
        });
      }

      //pubPoint geometry
      for (let j = 0; j < floor.PubPoint.length; j++) {
        let pubPoint = floor.PubPoint[j];
        let point = this._parsePoints(pubPoint.Outline[0][0])[0];
        floorObj.userData.points.push({
          name: pubPoint.Name,
          type: pubPoint.Type,
          position: new THREE.Vector3(
            point.x * SCALE,
            HEIGHT * SCALE,
            -point.y * SCALE
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

    //SCALE the mall
    this.mall.root = new THREE.Object3D();
    this.mall.root.scale.set(SCALE, SCALE, SCALE);
    this.mall.root.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    this.mall.root.name = 'mall'

    return this.mall;
  }

  _parsePoints(pointArray: Array<number>) {
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

export default MapLoader;
