export interface ProjectCreateInput {
  name: string;
  content: string;
}

export interface ProjectCreateOutput {
  createProject: {
    id: number;
    name: string;
    content: string;
  };
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

export interface ProjectUpdateName {
  id: number;
  name: number;
}

export interface ProjectUpdateOutput {
  id: number;
  name: string;
}
