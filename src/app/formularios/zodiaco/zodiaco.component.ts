import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css'],
  imports: [ReactiveFormsModule],
})
export class ZodiacoComponent implements OnInit {
  formularioSigno: FormGroup;
  mostrarInfo = false;
  edad: number = 0;
  signoChino: string = '';
  signoImagen: string = '';

  constructor(private fb: FormBuilder) {
    this.formularioSigno = this.fb.group({
      nombre: ['', Validators.required],
      aPaterno: ['', Validators.required],
      aMaterno: ['', Validators.required],
      dia: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      año: [null, [Validators.required, Validators.min(1900)]],
      genero: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  calculoSigno() {
    const dia = this.formularioSigno.get('dia')?.value;
    const mes = this.formularioSigno.get('mes')?.value;
    const año = this.formularioSigno.get('año')?.value;

    const fechaNacimiento = new Date(año, mes - 1, dia);
    const hoy = new Date();
    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      this.edad--;
    }

    this.signoChino = this.calcularSignoChino(año);
    this.signoImagen = this.getSignoImagen(this.signoChino);

    this.mostrarInfo = true;
  }

  calcularSignoChino(año: number): string {
    const signos = [
      'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];
    return signos[(año - 4) % 12];
  }

  getSignoImagen(signo: string): string {
    const imagenes: { [key: string]: string } = {
      'Rata': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/rat-euroresidentes.jpg',
      'Buey': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/ox-euroresidentes.jpg',
      'Tigre': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/tiger-euroresidentes.jpg',
      'Conejo': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/rabbit-euroresidentes.jpg',
      'Dragón': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/dragon-euroresidentes.jpg',
      'Serpiente': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/sneg-euroresidentes.jpg',
      'Caballo': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/horse-euroresidentes.jpg',
      'Cabra': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/cabra-euroresidentes.jpg',
      'Mono': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/monkey-euroresidentes.jpg',
      'Gallo': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/cock-euroresidentes.jpg',
      'Perro': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/dog-euroresidentes.jpg',
      'Cerdo': 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/pig-euroresidentes.jpg'
    };

    return imagenes[signo] || '';
  }

  get mostrarInformacion() {
    return this.mostrarInfo ? this.generarInformacion() : '';
  }

  generarInformacion() {
    return {
      nombreCompleto: `${this.formularioSigno.get('nombre')?.value} ${this.formularioSigno.get('aPaterno')?.value} ${this.formularioSigno.get('aMaterno')?.value}`,
      edad: this.edad,
      signoChino: this.signoChino,
      signoImagen: this.signoImagen
    };
  }
}
