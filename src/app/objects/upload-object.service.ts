import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {UserDataService} from '../login/user-data.service';
import {Observable} from 'rxjs';
import {S3Object} from './s3-object';


@Injectable({
  providedIn: 'root'
})
export class UploadObjectService {

  prefix = 'root/altpsons/';
  BUCKET = 'fileserv2';
  REGION = 'us-east-1'
  accessKeyId: string;
  secretAccessKey: string;

  constructor(private userDataService: UserDataService) {
    this.userDataService.getUserObjectObservable();
  }

  private getS3Bucket(): any {
    let optionsObject = {
      accessKeyId: '',
      secretAccessKey: '',
      region: this.REGION
    };
    let uao = this.userDataService.getUserAwsObject();
    console.log('uao[0] is:' + JSON.stringify(uao[0]));
    optionsObject.accessKeyId = uao[0].accessKeyId;
    optionsObject.secretAccessKey = uao[0].secretAccessKey;
    // optionsObject.region = this.REGION;

    console.log('optionsObject is:' + JSON.stringify(optionsObject));
    // S3 is from the AWS SDK.
    const bucket = new S3(optionsObject);
    return bucket;
  }

  uploadfile(file) {
    const params = {
      Bucket: this.BUCKET,
      Key: this.prefix + file.name,
      Body: file,
      ACL: 'authenticated-read'
    };

    // upload(...) is from the AWS SDK.
    this.getS3Bucket().upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  getFiles(prefix: string): Observable<Array<S3Object>> {
    const s3Uploads = new Array<S3Object>();

    const params = {
      Bucket: this.BUCKET,
      Prefix: prefix
    };

    // listObjects(...) is from the AWS SDK.
    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        // There was an error getting your files: CredentialsError: Missing credentials in config
        return;
      }

      console.log('Successfully got files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function (file) {
        s3Uploads.push(new S3Object(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
      });
    });

    return Observable.of(s3Uploads);
  }

}
