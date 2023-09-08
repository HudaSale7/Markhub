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
