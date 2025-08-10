export interface Module {
  module: string;
  details: string[];
}

export interface Contact {
  email: string;
  telephone: string;
}

export interface Formation {
  id: string;
  titre: string;
  public: string;
  prerequis: string;
  duree: string;
  tauxInsertion?: string;
  augmentationSalariale?: string;
  tauxReussite?: string;
  tauxCDI?: string;
  programme: Module[];
  prix: string;
  contact: Contact;
}

export interface ParcoursModule {
  module: string;
  duree: string;
  contenus: string[];
  activites: string[];
}

export interface Parcours {
  id: string;
  type: string;
  titre: string;
  description: string;
  public: string;
  prerequis: string;
  duree_formation: string;
  objectifs: string[];
  moyen_et_modalite: string;
  moyens_techniques: string;
  adaptation_et_suivi: string;
  evaluation_parcours: string;
  delai_acces: string;
  evaluation_du_besoin: string;
  prix: string;
  contact: Contact;
  structure: {
    theorie_heures: number;
    stage_heures: number;
    coaching_duree: string;
  };
  stats: {
    insertion_professionnelle: string;
    taux_cdi: string;
  };
  modules: ParcoursModule[];
  certifications_inclues: string[];
}

export interface Garanties {
  tauxInsertion: string;
  augmentationSalariale: string;
  tauxReussite: string;
  tauxCDI: string;
}

export interface FormationsData {
  formations: Formation[];
  garanties: Garanties;
}
