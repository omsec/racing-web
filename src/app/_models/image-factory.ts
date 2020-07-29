import { ImageRaw } from './image-raw';
import { Image } from './image';
import { environment } from '../../environments/environment';

export class ImageFactory {
  static fromRaw(imageRaw: ImageRaw[]): Image[] {
      if (!imageRaw) {return null; }

      return imageRaw.map(raw => {
      return {
        ...raw,
        uploadedDT: new Date(raw.uploadedDT),
        imageURL: `${environment.appUrl}${raw.imageURL}`,
      };
    });
  }

  /*
  // necessary??
  static empty(): Image {
    return {
      uploaded: new Date() // actually overriden by api
    };
  }
  */
}
