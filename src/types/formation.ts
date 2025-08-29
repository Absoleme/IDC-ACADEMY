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
  rncp?: {
    code: string;
    niveau: number;
    etat: string;
    date_debut_parcours_certifiants: string;
    date_echeance_enregistrement: string;
    date_derniere_delivrance_possible: string;
    certificateur: string;
    codes?: {
      NSF: string[];
      formacode: string[];
      ROME: string[];
    };
    anciennes_certifications?: {
      code: string;
      intitule: string;
    }[];
    base_legale?: string[];
    europass?: string[];
  };
  objectifs_et_metiers?: {
    presentation: string;
    activites_visees: string[];
    types_emplois_accessibles: string[];
    secteurs_activite: string[];
  };
  publics_et_prerequis?: {
    publics: string[];
    prerequis_entree_formation: string;
    prerequis_pour_la_validation: string | null;
  };
  programme_et_contenus?: {
    blocs_de_competences: {
      code: string;
      intitule: string;
      competences: string[];
    }[];
    parcours_transverses: string[];
  };
  modalites_pedagogiques?: string[];
  modalites_evaluation?: {
    epreuves: {
      type: string;
      duree: string;
      description: string;
    }[];
    duree_totale_epreuves: string;
    capitalisation: string;
  };
  certification?: {
    intitule: string;
    rncp: string;
    niveau: number;
    validation_partielle_possible: boolean;
  };
  suite_de_parcours_et_debouches?: {
    objectifs: string;
    debouches: string[];
    poursuite_de_formation: string;
  };
  details_de_la_formation?: {
    duree_totale_heures: number;
    duree_centre_heures: number;
    duree_entreprise_heures: number;
    stage_en_entreprise: string;
    dates_previsionnelles: string;
    tarifs: string;
    financements_possibles: string[];
    lieu: string;
  };
  accessibilite?: string;
  inscription?: {
    modalites: string;
    email: string;
  };
  sessions_d_information?: {
    frequence_ou_dates: string;
  };
  lieu?: {
    nom: string;
    adresse: string;
    telephone: string | null;
  };
  voies_d_acces?: {
    apprentissage: boolean;
    formation_continue: boolean;
    contrat_de_professionnalisation: boolean;
    candidature_individuelle: boolean;
    vae: boolean;
  };
  liens?: {
    france_competences: string;
    referentiel_reac_pdf: string;
  };
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
  stats?: {
    insertion_professionnelle: string;
    taux_cdi?: string;
    taux_reussite?: string;
    satisfaction?: string;
  };
  indicateurs_de_resultat?: {
    source: string;
    annee_reference: number;
    nombre_certifies: number;
    taux_insertion_global_6_mois_pct: number;
    taux_insertion_metier_vise_6_mois_pct: number;
    taux_insertion_metier_vise_2_ans_pct: number;
  };
  modules?: ParcoursModule[];
  certifications_inclues?: string[] | CertificationInclue[];
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
