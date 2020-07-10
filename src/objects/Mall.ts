import * as THREE from 'three'
class Mall {

  public building: THREE.Mesh = new THREE.Mesh();
  public floors: Array<THREE.Object3D> = [];
  public root: THREE.Object3D = new THREE.Object3D();
  public jsonData?: any;
  public FrontAngle: number = 0
  private _curFloorId: number = 0;

  getBuildingId() {
    var mallid = this.jsonData.data.building.Mall;
    return mallid ? mallid : -1;
  }

  getDefaultFloorId() {
    return this.jsonData.data.building.DefaultFloor;
  }

  getFloorNum() {
    return this.jsonData.data.Floors.length;
  }

  getFloor(id: number) {
    for (var i = 0; i < this.floors.length; i++) {
      if (this.floors[i].userData._id === id) {
        return this.floors[i];
      }
    }
    return null;
  }

  getFloorByName(name: string) {
    for (let i = 0; i < this.floors.length; i++) {
      if (this.floors[i].userData.Name === name) {
        return this.floors[i];
      }
    }
    return null;
  }

  getCurFloor() {
    return this.getFloor(this._curFloorId);
  }

  getFloorJson(fid: any) {
    let floorsJson = this.jsonData.data.Floors;
    for (let i = 0; i < floorsJson.length; i++) {
      if (floorsJson[i].userData._id === fid) {
        return floorsJson[i];
      }
    }
    return null;
  }

  showFloor(id: any) {
    this.root.remove(this.building);
    for (let i = 0; i < this.floors.length; i++) {
      if (this.floors[i].userData._id === id) {
        this.floors[i].position.set(0, 0, 0);
        this.root.add(this.floors[i]);
      } else {
        this.root.remove(this.floors[i]);
      }
    }
    this._curFloorId = id;
  }

  showAllFloors() {
    this.root.add(this.building);
    let offset = 4;
    for (let i = 0; i < this.floors.length; i++) {
      this.floors[i].position.set(0, 0, i * this.floors[i].userData.height * offset);
      this.root.add(this.floors[i]);
    }
    this.building.scale.set(1, 1, offset);
    this._curFloorId = 0;
    return this.root;
  }
}

export default Mall;