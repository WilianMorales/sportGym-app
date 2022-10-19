import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer class="footer mt-auto bg-dark">
    <div class="container">
        <div class="row text-center">
            <div class="col-md-12 text-center footer-nav">
                <p>&copy; <strong>{{ anio }}</strong> | Creado por <a href="https://github.com/WilianMorales" target="_blanck" >Wilian Morales</a>
                </p>
            </div>
        </div>
    </div>
  </footer>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  anio: number | undefined;

  constructor() {
    this.anio = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
