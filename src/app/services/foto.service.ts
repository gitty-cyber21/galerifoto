import { Injectable } from '@angular/core';
import { CameraPhoto, CameraResultType, CameraSource, Filesystem, FilesystemDirectory, Plugins } from '@capacitor/core';


const{Camera} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  public dataFoto : Photo[] = [];
  constructor() { }

  public async tambahFoto(){
    const Foto = await Camera.getPhoto({
      resultType : CameraResultType.Uri,
      source : CameraSource.Camera,
      quality : 100
    });
    console.log(Foto);

    this.dataFoto.unshift({
      filePath:"Load",
      webviewPath : Foto.webPath
    })
  }

  public async simpanFoto(foto : CameraPhoto){
    const base64Data = await this.readAsBase64(foto);

    const namaFile = new Date().getTime+'.jpeg';
    const simpanFile = await Filesystem.writeFile({
      path : namaFile,
      data : base64Data,
      directory : FilesystemDirectory.Data
    });
    return{
      filePath : namaFile,
      webviewPath : foto.webPath
    }
  }

  private async readAsBase64(foto : CameraPhoto){
    const response = await fetch(foto.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob : Blob) => new Promise((resolve, reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface Photo {
  filePath : string;
  webviewPath : string;
}
