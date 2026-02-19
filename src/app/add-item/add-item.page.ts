import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonButton,
  IonButtons, IonBackButton, IonIcon
} from '@ionic/angular/standalone';
import { ShoppingService } from '../services/shopping.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { saveOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonList, IonItem, IonLabel, IonInput, IonSelect,
    IonSelectOption, IonButton, IonButtons, IonBackButton, IonIcon
  ]
})
export class AddItemPage {
  private shoppingService = inject(ShoppingService);
  private router = inject(Router);

  nome = signal('');
  quantidade = signal(1);
  categoria = signal('Geral');

  categorias = [
    'Padaria', 'Hortifruti', 'Carnes', 'Laticínios',
    'Limpeza', 'Higiene', 'Bebidas', 'Geral'
  ];

  constructor() {
    addIcons({ saveOutline, closeOutline });
  }

  save() {
    if (this.nome().trim()) {
      this.shoppingService.addItem(this.nome(), this.quantidade(), this.categoria());
      this.router.navigate(['/home']);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
