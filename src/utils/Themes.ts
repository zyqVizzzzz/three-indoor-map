export const CommonThemes = {
  scene: {
    width: window.innerWidth,
    height: window.innerHeight,
    container: document.body,
  },
  camera: {
    position: { x: 0, y: 100, z: 100 },
  },
  renderer: {
    clearColor: "#F2F2F2",
  },
  SCALE: 0.1
};

export const FloorThemes = {
  MATERIAL: {
    color: "#E0E0E0",
    opacity: 1,
    transparent: false,
  },
  OFFSET: 5,
  HEIGHT: 80,
};

export const BuildingThemes = {
  MATERIAL: {
    color: "#000000",
    opacity: 0.1,
    transparent: true,
    depthTest: false,
  },
  OFFSET: 600,
  HEIGHT: 500
}

export const WireThemes = {
  MATERIAL: {
    color: "#5C4433",
    opacity: 0.5,
    transparent: true,
    linewidth: 2,
  },
  OFFSET: 30
}

export const MaterialThemes = {
  FLOOR: {
    color: "#E0E0E0",
    opacity: 1,
    transparent: false,
  },
  BUILDING: {
    color: "#000000",
    opacity: 0.1,
    transparent: true,
    depthTest: false,
  },
  WIRE: {
    color: "#5C4433",
    opacity: 0.5,
    transparent: true,
    linewidth: 2,
  },
}

export function room(type: number, category?: number) {
  let roomStyle;
  if (!category) {
    switch (type) {
      case 100:
        return {
          color: "#F2F2F2",
          opacity: 0.8,
          transparent: true,
        };
      case 300: //closed area
        return {
          color: "#AAAAAA",
          opacity: 0.7,
          transparent: true,
        };
      case 400: //empty shop
        return {
          color: "#D3D3D3",
          opacity: 0.7,
          transparent: true,
        };
      default:
        break;
    }
  }

  switch (category) {
    case 101: //food
      roomStyle = {
        color: "#1f77b4",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 102: //retail
      roomStyle = {
        color: "#aec7e8",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 103: //toiletry
      roomStyle = {
        color: "#ffbb78",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 104: //parent-child
      roomStyle = {
        color: "#98df8a",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 105: //life services
      roomStyle = {
        color: "#bcbd22",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 106: //education
      roomStyle = {
        color: "#2ca02c",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 107: //life style
      roomStyle = {
        color: "#dbdb8d",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 108: //entertainment
      roomStyle = {
        color: "#EE8A31",
        opacity: 0.7,
        transparent: true,
      };
      break;
    case 109: //others
      roomStyle = {
        color: "#8c564b",
        opacity: 0.7,
        transparent: true,
      };
      break;
    default:
      roomStyle = {
        color: "#c49c94",
        opacity: 0.7,
        transparent: true,
      };
      break;
  }
  return roomStyle;
}
