export interface IProject {
  id: number;
  title: string;
  image: string;
  projectType: string;
  projectSummary: string;
  gitHubLink: string;
  liveSiteLink: string;
  technologies: string[];
  details: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IProjectResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IProject[];
}

export interface ISingleProjectResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IProject;
}
