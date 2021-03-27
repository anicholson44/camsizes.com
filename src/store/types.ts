import { ActionType } from "typesafe-actions";
import { Epic } from "redux-observable";
import { IdStore } from "../utils/id-store";

export type { IdStore };

export type RootAction = ActionType<typeof import("./actions").default>;

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction;
  }
}

export interface Entity {
  readonly id: number;
}

export interface EntityMap<E extends Entity> {
  readonly [id: number]: E;
}

export interface Manufacturer extends Entity {
  readonly name: string;
  readonly camStyles: ReadonlyArray<number>;
}

export interface CamStyle extends Entity {
  readonly name: string;
  readonly manufacturerId: number;
  readonly cams: ReadonlyArray<number>;
  readonly lobes: number;
}

export interface Cam extends Entity {
  readonly name: string;
  readonly color: string;
  readonly rangeMin: number;
  readonly rangeMax: number;
  readonly weight: number;
  readonly strength: number;
  readonly camStyleId: number;
  readonly buyLink?: string;
}

export interface EntitiesState {
  readonly manufacturers: EntityMap<Manufacturer>;
  readonly camStyles: EntityMap<CamStyle>;
  readonly cams: EntityMap<Cam>;
}

export interface RootState {
  readonly loading: boolean;
  readonly entities: EntitiesState;
  readonly selectedCams: IdStore<number>;
  readonly highlightedCams: IdStore<true>;
  readonly highlightedCamRange?: number;
  readonly showDetailForCam?: number;
  readonly showDuplicatesInChart: boolean;
  readonly showCamMenu: boolean;
  readonly showRack: boolean;
  readonly yAxis: "strength" | "weight";
}

export type RootEpic = Epic<
  RootAction,
  RootAction,
  RootState | void,
  { api: string }
>;
