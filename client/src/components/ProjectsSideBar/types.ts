export interface ProjectCreateInput {
  name: string;
  content: string;
}

export interface ProjectCreateOutput {
  id: number;
  name: string;
  content: string;
}

export interface Projects {
  getProjects: Project[];
}

export interface Project {
  project: {
    id: number;
    name: string;
  };
  accessType: string;
}
