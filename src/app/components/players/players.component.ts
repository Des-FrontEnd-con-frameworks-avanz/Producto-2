import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../shared/models/player.model'
import { PLAYERS_DATA } from '../../shared/data/players-list'
import { CurrencyExchangePipe } from '@app/shared/pipes/currency-exchange.pipe';
import { FiltroEdadPipe } from '../../pipes/filtro-edad.pipe';
import { FilterPlayersPipe } from '@app/shared/pipes/filter-players.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyExchangePipe, FiltroEdadPipe, FilterPlayersPipe],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  public players: Player[] = [];
  public selectedPlayerId: number | null = null;
  public selectedCurrency: string = 'EUR';
  public filtroEdad: string = 'todas';
  public textoBusqueda: string = '';
  public campoBusqueda: string = 'nombre';

  @Output() playerSelected = new EventEmitter<Player>();

  ngOnInit(): void {
    this.players = PLAYERS_DATA;
  }

  public onSelectPlayer(player: Player): void {
    this.selectedPlayerId = player.id;
    this.playerSelected.emit(player);
  }

  public onCurrencyChange(event: Event): void {
    const selectedElement = event.target as HTMLSelectElement;
    this.selectedCurrency = selectedElement.value;
  }
}
