import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sidenav: any;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.signOut();
  }
}

@Pipe({ name: 'trusthtml' })
export class TrustHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}

@Pipe({ name: 'trusturl' })
export class TrustResourceUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(text);
  }
}
