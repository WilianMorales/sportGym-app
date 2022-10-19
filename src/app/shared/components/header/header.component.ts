import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed: boolean = false;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
  }

}
