import { Component } from '@angular/core';
import { PlayersComponent } from '@app/components/players/players.component';
import { Player } from '@app/shared/models/player.model';
import { DetailComponent } from '@app/components/detail/detail.component';
import { CommonModule } from '@angular/common';
import { PLAYERS_DATA } from '@app/shared/data/players-list';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PlayersComponent, DetailComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  public players: Player[] = PLAYERS_DATA;
  public selectedPlayer: Player | null = null;

  public handlePlayerSelection(player: Player): void {
    this.selectedPlayer = { ...player };
  }

}
