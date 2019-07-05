import { TestBed } from '@angular/core/testing';

import { TodoFirebaseService } from './todo-api.service';

describe('TodoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoFirebaseService = TestBed.get(TodoFirebaseService);
    expect(service).toBeTruthy();
  });
});
