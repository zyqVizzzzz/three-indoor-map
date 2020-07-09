class Mall {
  constructor() {
    this.floors = [];
    this.building = null;
    this.root = null;
    this.jsonData = null;
    this._curFloorId = null;
  }

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

  getFloor(id) {
    for (var i = 0; i < this.floors.length; i++) {
      if (this.floors[i]._id === id) {
        return this.floors[i];
      }
    }
    return null;
  }

  getFloorByName(name) {
    for (let i = 0; i < this.floors.length; i++) {
      if (this.floors[i].Name === name) {
        return this.floors[i];
      }
    }
    return null;
  }

  getCurFloor() {
    return this.getFloor(this._curFloorId);
  }

  getFloorJson(fid) {
    let floorsJson = this.jsonData.data.Floors;
    for (let i = 0; i < floorsJson.length; i++) {
      if (floorsJson[i]._id === fid) {
        return floorsJson[i];
      }
    }
    return null;
  }

  showFloor(id) {
    this.root.remove(this.building);
    for (let i = 0; i < this.floors.length; i++) {
      if (this.floors[i]._id === id) {
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
      this.floors[i].position.set(0, -50, i * this.floors[i].height * offset);
      this.root.add(this.floors[i]);
    }
    this.building.scale.set(1, 1, offset);
    this._curFloorId = 0;
    return this.root;
  }
}

export default Mall;