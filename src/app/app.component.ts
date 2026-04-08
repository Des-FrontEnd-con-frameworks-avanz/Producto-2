import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'equipo-basket';

  constructor(private playersService: PlayerService) {
  }

  ngOnInit(): void {
    //this.playersService.seedDatabase(); // comente esta línea después de ejecutar el método una vez para evitar duplicados en la base de datos
  }
}
