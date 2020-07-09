import * as THREE from "three";
import Mall from "./Mall";
import { getBoundingRect } from "./Common";
import { room } from "./Themes";

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
    this.mall = new Mall();
    this.json = json;
  }
  parse() {
    this.mall.jsonData = this.json;

    let building,
      shape,
      extrudeSettings,
      geometry,
      material,
      mesh,
      wire,
      points;
    let scale = 0.1,
      floorHeight,
      buildingHeight = 0;

    //floor geometry
    for (let i = 0; i < this.json.data.Floors.length; i++) {
      let floor = this.json.data.Floors[i];
      floor.rect = getBoundingRect(floor.Outline[0][0]);

      let floorObj = new THREE.Object3D();
      floorHeight = 70.0;
      buildingHeight += floorHeight;
      points = this._parsePoints(floor.Outline[0][0]);
      shape = new THREE.Shape(points);
      geometry = new THREE.ShapeGeometry(shape);
      mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          color: "#E0E0E0",
          opacity: 1,
          transparent: false,
        })
      );
      mesh.position.set(0, 0, -5);

      floorObj.height = floorHeight;
      floorObj.add(mesh);
      floorObj.points = [];
      floorObj._id = floor._id;

      this.mall.floors.push(floorObj);

      //funcArea geometry
      for (let j = 0; j < floor.FuncAreas.length; j++) {
        let funcArea = floor.FuncAreas[j];
        funcArea.rect = getBoundingRect(funcArea.Outline[0][0]);

        points = this._parsePoints(funcArea.Outline[0][0]);
        shape = new THREE.Shape(points);

        const center = funcArea.Center;
        floorObj.points.push({
          name: funcArea.Name,
          type: funcArea.Type,
          position: new THREE.Vector3(
            center[0] * scale,
            floorHeight * scale,
            -center[1] * scale
          ),
        });

        //solid model
        extrudeSettings = { amount: floorHeight, bevelEnabled: false };
        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        material = new THREE.MeshLambertMaterial(
          room(parseInt(funcArea.Type), funcArea.Category)
        );
        mesh = new THREE.Mesh(geometry, material);
        mesh.type = "solidroom";
        // mesh.id = funcArea._id;

        floorObj.add(mesh);

        //top wireframe
        geometry = shape.createPointsGeometry();
        wire = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: "#5C4433",
            opacity: 0.5,
            transparent: true,
            linewidth: 2,
          })
        );
        wire.position.set(0, 0, floorHeight);

        floorObj.add(wire);
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
            floorHeight * scale,
            -point.y * scale
          ),
        });
      }
    }

    this.mall.root = new THREE.Object3D();
    //building geometry
    building = this.json.data.building;
    points = this._parsePoints(building.Outline[0][0]);
    this.mall.FrontAngle = building.FrontAngle;

    if (points.length > 0) {
      shape = new THREE.Shape(points);
      extrudeSettings = { amount: buildingHeight, bevelEnabled: false };
      geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          color: "#000000",
          opacity: 0.1,
          transparent: true,
          depthTest: false,
        })
      );

      this.mall.building = mesh;
    }

    //scale the mall
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
