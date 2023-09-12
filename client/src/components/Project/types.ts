export interface Project {
  getProject: {
    project: {
      name: string;
      content: string;
      id: number;
    };
    accessType: string;
  };
}

export interface ProjectUpdateOutput {
  id: number;
  name: string;
  content: string;
}

export interface ProjectUpdateContent {
  id: number | undefined;
  content: string | undefined;
}