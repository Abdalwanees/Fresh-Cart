import { TestBed } from '@angular/core/testing';

import { MyHttpInterceptorInterceptor } from './my-http-interceptor.interceptor';

describe('MyHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyHttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MyHttpInterceptorInterceptor = TestBed.inject(MyHttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
