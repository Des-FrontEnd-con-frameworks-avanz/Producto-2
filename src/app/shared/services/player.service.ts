import { Injectable } from '@angular/core';
import { Player } from '../../shared/models/player.model';
import { PLAYERS_DATA } from '../../shared/data/players-list';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = PLAYERS_DATA;

  getPlayers() {
    return this.players;
  }

  addPlayer(player: Player, image?: File | null, video?: File | null): Promise<void> {
    return new Promise((resolve) => {
      player.id = Math.random().toString(36).substring(2, 9);
      if (image) {
        player.fotoUrl = 'https://mock.storage/image.jpg';
      }
      if (video) {
        player.videoUrl = 'https://mock.storage/video.mp4';
      }
      this.players.push(player);
      resolve();
    });
  }

  updatePlayer(player: Player) {}
  deletePlayer(id: string) {}
}
