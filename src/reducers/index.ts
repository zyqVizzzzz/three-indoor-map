import { Action, MapState, INITIAL_STATE } from "./Store";

export default function reducer(
  state: MapState = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case "set scene": {
      return {
        ...state,
        Scene: action.scene,
      };
    }
    case "set orbit": {
      return {
        ...state,
        Orbit: action.orbit,
      };
    }
    default:
      return state;
  }
}
