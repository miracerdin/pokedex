export interface DetailPokemon {
  name: string;
  height: number;
  weight: number;
  abilities: any;
  sprites?: any;
  moves?: any;
  base_experience?: number;
}

export interface LocalTypes {
  url?: string;
  id?: number;
  name?: string;
  sprites?: any;
  abilities?: any;
  base_experience?: number;
  height: number;
  weight: number;
}

export interface MockTypes {
  id?: number;
  name?: string;
  url?: string;
  sprites?: object;
}

export interface DataTypes {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}
