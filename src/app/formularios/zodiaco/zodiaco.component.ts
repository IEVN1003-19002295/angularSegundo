import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export default class ZodiacoComponent {
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

  calculoSigno() {
    const dia = this.formularioSigno.get('dia')?.value;
    const mes = this.formularioSigno.get('mes')?.value;
    const año = this.formularioSigno.get('año')?.value;

    const hoy = new Date();
    let edad = hoy.getFullYear() - año;
    if (hoy.getMonth() + 1 < mes) {
      edad = edad - 1;
    } else {
      if (hoy.getMonth() + 1 === mes) {
        if (hoy.getDate() < dia) {
          edad = edad - 1;
        }
      }
    }
    this.edad = edad;

    let signos = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    let resto = (año - 4) % 12;
    if (resto === 0) {
      this.signoChino = 'Rata';
    } else if (resto === 1) {
      this.signoChino = 'Buey';
    } else if (resto === 2) {
      this.signoChino = 'Tigre';
    } else if (resto === 3) {
      this.signoChino = 'Conejo';
    } else if (resto === 4) {
      this.signoChino = 'Dragón';
    } else if (resto === 5) {
      this.signoChino = 'Serpiente';
    } else if (resto === 6) {
      this.signoChino = 'Caballo';
    } else if (resto === 7) {
      this.signoChino = 'Cabra';
    } else if (resto === 8) {
      this.signoChino = 'Mono';
    } else if (resto === 9) {
      this.signoChino = 'Gallo';
    } else if (resto === 10) {
      this.signoChino = 'Perro';
    } else if (resto === 11) {
      this.signoChino = 'Cerdo';
    }

    if (this.signoChino === 'Rata') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/rat-euroresidentes.jpg';
    } else if (this.signoChino === 'Buey') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/ox-euroresidentes.jpg';
    } else if (this.signoChino === 'Tigre') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/tiger-euroresidentes.jpg';
    } else if (this.signoChino === 'Conejo') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/rabbit-euroresidentes.jpg';
    } else if (this.signoChino === 'Dragón') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/dragon-euroresidentes.jpg';
    } else if (this.signoChino === 'Serpiente') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/sneg-euroresidentes.jpg';
    } else if (this.signoChino === 'Caballo') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/horse-euroresidentes.jpg';
    } else if (this.signoChino === 'Cabra') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/cabra-euroresidentes.jpg';
    } else if (this.signoChino === 'Mono') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/monkey-euroresidentes.jpg';
    } else if (this.signoChino === 'Gallo') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/cock-euroresidentes.jpg';
    } else if (this.signoChino === 'Perro') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/dog-euroresidentes.jpg';
    } else if (this.signoChino === 'Cerdo') {
      this.signoImagen = 'https://www.euroresidentes.com/horoscopo-chino/2017/imagenes/pig-euroresidentes.jpg';
    }

    this.mostrarInfo = true;
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

/*
<!-- Texto para el commit --> */