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
