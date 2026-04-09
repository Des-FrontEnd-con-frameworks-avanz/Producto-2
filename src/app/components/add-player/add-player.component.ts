import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '@app/shared/models/player.model';
import { PlayerService } from '@app/services/player.service';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss'
})
export class AddPlayerComponent {
  playerForm: FormGroup;
  successMessage = false;

  @Output() playerAdded = new EventEmitter<void>();

  selectedImage: File | null = null;
  selectedVideo: File | null = null;

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    this.playerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      posicion: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      altura: ['', Validators.required],
      peso: ['', Validators.required],
      experiencia: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      fotoUrl: [''],
      videoUrl: [''],
      posterUrl: [''],
      descripcion: ['']
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedVideo = file;
    }
  }

  async onSubmit() {
    if (this.playerForm.valid) {
      try {
        const formData = this.playerForm.value;
        const newPlayer: Player = { ...formData };

        await this.playerService.addPlayer(newPlayer, this.selectedImage, this.selectedVideo);

        this.successMessage = true;
        this.playerForm.reset();
        this.selectedImage = null;
        this.selectedVideo = null;

        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
        fileInputs.forEach(input => input.value = '');

        setTimeout(() => {
          this.successMessage = false;
          this.playerAdded.emit();
        }, 3000);
      } catch (error) {
        console.error('Error al guardar el jugador:', error);
      }
    } else {
      this.playerForm.markAllAsTouched();
    }
  }

  getControlError(controlName: string): boolean {
    const control = this.playerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

