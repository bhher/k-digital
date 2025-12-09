export enum SlideType {
  COVER = 'COVER',
  GOALS = 'GOALS',
  ROADMAP = 'ROADMAP',
  CONTENT_PHASE = 'CONTENT_PHASE', // Text + list
  PROJECT = 'PROJECT',
  CLOSING = 'CLOSING'
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subTitle?: string;
  content?: any;
  hours?: number;
  tags?: string[];
  backgroundImage?: string;
}
