import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const cloudName = environment.CLOUDINARY_CLOUD_NAME;
const apiKey = environment.CLOUDINARY_API_KEY;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  cld = new Cloudinary({
    cloud: {
      cloudName
    }
  })

  constructor(private http: HttpClient) { }

  postImage(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('api_key', apiKey);
    data.append('upload_preset', 'solvit')

    return this.http.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data);
  }

  getImageFromCloud(imagePath: string): URL {
    return this.cld.image(imagePath).toURL() as unknown as URL;
  }
}
