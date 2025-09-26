import { combineReducers } from 'redux';
import animationSlice, { AnimationState } from './animationSlice';
import modelSlice, { ModelState } from './modelSlice';
import sceneSlice, { SceneState } from './sceneSlice';

/**
 * Defines the structure of the root state for the application, combining all individual slice states.
 */
export interface RootState {
  animation: AnimationState;
  model: ModelState;
  scene: SceneState;
  // Add other slices here as they are created
}

/**
 * Combines all individual reducers into a single root reducer.
 * This is essential for managing the different parts of the application state.
 */
const rootReducer = combineReducers({
  animation: animationSlice.reducer,
  model: modelSlice.reducer,
  scene: sceneSlice.reducer,
  // Add other slices here as they are created
});

export default rootReducer;
export type {AnimationState, ModelState, SceneState } from './types'