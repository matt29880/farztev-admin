import { MediaType } from "./mediatype";

export class Media {
  id: number;
  name: string;
  type: MediaType;
  url: string;
  created: string;
  updated: string;
  online: boolean;
  albumId: number;
}
