export interface Post {
  collectionId: string;
  collectionName: string;
  id: string;
  content: string;
  subject: string;
  likes: { [ip: string]: boolean };
  user: string;
  created: string;
  updated: string;
}

export interface LikesData {
  [ip: string]: boolean;
}