import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../../shared/models/player.model';
import { CurrencyExchangePipe } from '@app/shared/pipes/currency-exchange.pipe';
import { FiltroEdadPipe } from '../../pipes/filtro-edad.pipe';
import { FilterPlayersPipe } from '@app/shared/pipes/filter-players.pipe';

// IMPORTAMOS EL SERVICIO DE FIREBASE
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyExchangePipe, FiltroEdadPipe, FilterPlayersPipe],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  public players: Player[] = [];
  
  public selectedPlayerId: string | null | undefined = null; 
  
  public selectedCurrency: string = 'EUR';
  public filtroEdad: string = 'todas';
  public textoBusqueda: string = '';
  public campoBusqueda: string = 'nombre';

  @Output() playerSelected = new EventEmitter<Player>();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    // SUSTITUIMOS LOS DATOS LOCALES POR LA SUSCRIPCIÓN A FIREBASE
    this.playerService.getPlayers().subscribe({
      next: (data: any[]) => {
        this.players = data;
        console.log('Datos actualizados desde Firebase:', this.players);
      },
      error: (error: any) => {
        console.error('Error al cargar los jugadores', error);
      }
    });
  }

  public onSelectPlayer(player: Player): void {
    this.selectedPlayerId = player.id ? String(player.id) : null;
    this.playerSelected.emit(player);
  }

  public onCurrencyChange(event: Event): void {
    const selectedElement = event.target as HTMLSelectElement;
    this.selectedCurrency = selectedElement.value;
  }

  public eliminarJugador(id: string | number | undefined): void {
    if (!id) return; 

    const idString = String(id);

    if (confirm('¿Estás seguro de que deseas eliminar este jugador de la base de datos?')) {
      this.playerService.deletePlayer(idString)
        .then(() => {
          console.log('Jugador eliminado correctamente');
          if (this.selectedPlayerId === idString) {
            this.selectedPlayerId = null;
          }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
  }
}