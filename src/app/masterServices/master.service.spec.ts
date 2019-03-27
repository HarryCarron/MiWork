import { TestBed } from '@angular/core/testing';

import { CalendarTools } from './master.service';

describe('MasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarTools = TestBed.get(CalendarTools);
    expect(service).toBeTruthy();
  });
});
