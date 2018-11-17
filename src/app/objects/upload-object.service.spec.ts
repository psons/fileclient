import { TestBed } from '@angular/core/testing';

import { UploadObjectService } from './upload-object.service';

describe('UploadObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadObjectService = TestBed.get(UploadObjectService);
    expect(service).toBeTruthy();
  });
});
