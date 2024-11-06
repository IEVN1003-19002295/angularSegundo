import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,FormsModule } from '@angular/forms';

interface Empleador {
    matricula: string;
    nombre: string;
    email: string;
    edad: number;
    horas: number;
    horasPorPagar?: number;
    horasExtras?: number;
    subTotal?: number;
}

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.css'],
})
export default class EmpleadosComponent implements OnInit {
    formGroup!: FormGroup;
    mostrarTabla = false;
    personas: Empleador[] = [];
    editMode = false;
    personaIndex: number | null = null;
    matriculaBusqueda: string = '';

    constructor(private readonly fb: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.initForm();
        this.cargarRegistros();
    }

    initForm(): FormGroup {
        return this.fb.group({
            matricula: [''],
            nombre: [''],
            email: [''],
            edad: [''],
            horas: ['']
        });
    }

    calcularSueldo(horas: number): { horasPorPagar: number; horasExtras: number; subTotal: number } {
        const pagoRegular = 70;
        const pagoExtras = 140;
        const limiteHoras = 40;
    
        const horasPorPagar = horas <= limiteHoras ? horas * pagoRegular : limiteHoras * pagoRegular;
        const horasExtras = horas > limiteHoras ? (horas - limiteHoras) * pagoExtras : 0;
        const subTotal = horasPorPagar + horasExtras;
    
        return { horasPorPagar, horasExtras, subTotal };
    }
    

    onSubmit(): void {
        const { matricula, nombre, email, edad, horas } = this.formGroup.value;
        const { horasPorPagar, horasExtras, subTotal } = this.calcularSueldo(horas);
        const nuevaPersona: Empleador = {
            matricula,
            nombre,
            email,
            edad,
            horas,
            horasPorPagar,
            horasExtras,
            subTotal,
        };

        if (this.editMode && this.personaIndex !== null) {
            this.personas[this.personaIndex] = nuevaPersona;
            this.editMode = false;
            this.personaIndex = null;
        } else {
            this.personas.push(nuevaPersona);
        }

        localStorage.setItem('personas', JSON.stringify(this.personas));
        this.formGroup.reset();
    }

    cargarRegistros(): void {
        const personasGuardadas = localStorage.getItem('personas');
        if (personasGuardadas) {
            this.personas = JSON.parse(personasGuardadas);
        }
    }

    imprimirTabla(): void {
        this.mostrarTabla = true;
        this.cargarRegistros();
    }

    modificarPersona(matricula: string): void {
        const index = this.personas.findIndex(p => p.matricula === matricula);
        if (index >= 0) {
            const persona = this.personas[index];
            this.formGroup.patchValue(persona);
            this.editMode = true;
            this.personaIndex = index;
        }
    }

    eliminarPersona(matricula: string): void {
        this.personas = this.personas.filter(p => p.matricula !== matricula);
        localStorage.setItem('personas', JSON.stringify(this.personas));
    }

    personasFiltradas(): Empleador[] {
        return this.personas.filter(persona => 
            persona.matricula.includes(this.matriculaBusqueda)
        );
    }

    calcularTotal(): number {
        return this.personas.reduce((total, persona) => total + (persona.subTotal || 0), 0);
    }
}

// Commit Empleados