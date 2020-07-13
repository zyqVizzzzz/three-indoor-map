import { createStore, Store } from "redux";
import reducer from "reducers";
import { create } from "redux-react-hook";
import * as THREE from "three";

export interface MapState {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

export type Action = {
  type: "set scene";
  scene: THREE.Scene;
};

export function makeStore(): Store<MapState, Action> {
  return createStore(reducer, INITIAL_STATE);
}

export const INITIAL_STATE: MapState = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  ),
  renderer: new THREE.WebGLRenderer({ antialias: true }),
};

export const { StoreContext, useDispatch, useMappedState } = create<
  MapState,
  Action,
  Store<MapState, Action>
>();
