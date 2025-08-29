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
  resultats_attendus?: string[];
}

export interface CertificationInclue {
  id: string;
  titre: string;
  organisme: string;
  description: string;
}

export interface Parcours {
  id: string;
  type: string;
  titre: string;
  description: string;
  public: string;
  prerequis: string | string[];
  duree_formation: string;
  objectifs: string[];
  moyen_et_modalite?: string | {
    pedagogie?: string[];
    modalites?: string[];
  };
  moyens_techniques?: string | {
    materiels?: string[];
    logiciels?: string[];
    plateformes?: string[];
  };
  adaptation_et_suivi?: string;
  evaluation_parcours?: string;
  delai_acces?: string;
  evaluation_du_besoin?: string;
  prix?: string | {
    tarif_individuel?: string;
    tarif_entreprise?: string;
    aides?: string[];
  };
  contact?: Contact;
  structure?: {
    theorie_heures?: number;
    pratique_heures?: number;
    stage_heures?: number;
    coaching_duree?: string;
  };
  stats: {
    insertion_professionnelle: string;
    taux_cdi?: string;
    taux_reussite?: string;
    satisfaction?: string;
  };
  modules?: ParcoursModule[];
  certifications_inclues: string[] | CertificationInclue[];
  handicap?: {
    texte?: string;
    partenaires?: any;
    amenagements_possibles?: string[];
  };
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
