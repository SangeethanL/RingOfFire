
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogOverviewExampleDialog } from '../dialog-add-player/dialog-add-player.component';
import { MatInputModule } from '@angular/material/input';
import { GameInfoComponent } from "../game-info/game-info.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf, PlayerComponent, MatButtonModule, MatIconModule, MatInputModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent /*implements OnInit*/ {

  pickCardAnimation = false;
  currentCard: string | any = '';
  game: Game;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  /*ngOnInit(): void {
    this.newGame();
  }*/

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.pickCardAnimation == false) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
    }

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog)

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
