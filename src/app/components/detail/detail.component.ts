import { Component, Input } from '@angular/core';
import { Player } from '@shared/models/player.model';
import { MediaComponent } from '../media/media.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule,MediaComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input() player: Player | null = null;
  mostrarModalVideo: boolean = false;
}
