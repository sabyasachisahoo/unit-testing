import { LinkModel } from './../../model/links-model';
import { LinkService } from './../../services/link.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LinkComponent } from './link.component';
import { By } from '@angular/platform-browser';


describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use links from the service', () => {
    const linkServcie = fixture.debugElement.injector.get(LinkService);
    fixture.detectChanges();
    expect(linkServcie.getLinks()).toEqual(component.links);
  });

  it('should add a new link', () => {
    component.linkUrl = 'https://github.com';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('https://github.com');
  });

  it('should disable the button when input is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when input is not empty', () => {
    component.linkUrl = 'https://github.com';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should remove post upon card click', () => {
    component.linkUrl = 'https://www.google.com';
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', null);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('https://www.google.com');
  });

  it('should fetch links asynchronously', async () => {
    const fakeURLList = [
      new LinkModel('https://www.youtube.com/')
    ];
    const linkService = fixture.debugElement.injector.get(LinkService);
    const spy = spyOn(linkService, 'fetchLinkFromServer').and.returnValue(
      Promise.resolve(fakeURLList)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.links).toBe(fakeURLList);
    });
  });

});
