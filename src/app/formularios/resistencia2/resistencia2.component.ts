import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resistencia2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './resistencia2.component.html',
  styleUrls: ['./resistencia2.component.css']
})
export default class Resistencia2Component implements OnInit {
  valoresResistencia!: FormGroup;
  resTotal!: number;
  resMaxima!: number;
  resMinima!: number;
  mostrarInfo: boolean = false;
  resistenciasGuardadas: any[] = [];

  coloresHex: string[] = ["#000000", "#8B4513", "#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#EE82EE", "#808080", "#FFFFFF"];
  toleranciasHex: { [key: string]: string } = { "oro": "#FFD700", "plata": "#C0C0C0" };

  colorBanda1!: string;
  colorBanda2!: string;
  colorBanda3!: string;
  colorTolerancia!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.valoresResistencia = this.fb.group({
      resDecimal: ['', Validators.required],
      resUnitaria: ['', Validators.required],
      resMultiplicador: ['', Validators.required],
      tipoTolerancia: ['', Validators.required]
    });
  }

  obtenerColorHex(valor: number): string {
    return this.coloresHex[valor] || '#FFFFFF';
  }

  obtenerColorToleranciaHex(valor: string): string {
    return this.toleranciasHex[valor] || '#FFFFFF';
  }

  calculoResistencia(): void {
    const resDecimal = this.valoresResistencia.get('resDecimal')?.value;
    const resUnitaria = this.valoresResistencia.get('resUnitaria')?.value;
    const resMultiplicador = this.valoresResistencia.get('resMultiplicador')?.value;
    const tipoTolerancia = this.valoresResistencia.get('tipoTolerancia')?.value;

    const valorOhm = (resDecimal * 1 + resUnitaria) * Math.pow(10, resMultiplicador);
    const tolerancia = tipoTolerancia === 'oro' ? 0.05 : 0.1;

    this.resTotal = valorOhm;
    this.resMaxima = valorOhm + (valorOhm * tolerancia);
    this.resMinima = valorOhm - (valorOhm * tolerancia);

    this.colorBanda1 = this.obtenerColorHex(resDecimal);
    this.colorBanda2 = this.obtenerColorHex(resUnitaria);
    this.colorBanda3 = this.obtenerColorHex(resMultiplicador);
    this.colorTolerancia = this.obtenerColorToleranciaHex(tipoTolerancia);
  }

  onSubmit(): void {
    this.calculoResistencia();
    const resistenciasGuardadas = JSON.parse(localStorage.getItem('resistencias') || '[]');
    const nuevaResistencia = {
      banda1: this.colorBanda1,
      banda2: this.colorBanda2,
      banda3: this.colorBanda3,
      tolerancia: this.colorTolerancia,
      total: this.resTotal,
      minima: this.resMinima,
      maxima: this.resMaxima
    };
    resistenciasGuardadas.push(nuevaResistencia);
    localStorage.setItem('resistencias', JSON.stringify(resistenciasGuardadas));
    this.mostrarInfo = false;
  }

  mostrarTabla(): void {
    this.resistenciasGuardadas = JSON.parse(localStorage.getItem('resistencias') || '[]');
    if (this.resistenciasGuardadas.length > 0) {
      this.mostrarInfo = true;
    }
  }
}
