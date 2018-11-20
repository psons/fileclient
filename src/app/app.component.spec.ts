import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {MessageDetailComponent} from './admin/message-detail/message-detail.component';
import {AdminComponent} from './admin/admin.component';
import {ObjectsComponent} from './objects/objects.component';
import {LoginComponent} from './login/login.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      providers: [AngularFireAuth],
      declarations: [
        AppComponent,
        ObjectsComponent,
        AdminComponent,
        LoginComponent,
        MessageDetailComponent,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'fileclient'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('fileclient');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Fileclient!');
  }));
});
