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

export interface ProjectUpdate {
  id: number;
  name: string;
  content: string;
}
