import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonInput, IonSelect, IonSelectOption, IonButton,
  IonButtons, IonBackButton, IonIcon
} from '@ionic/angular/standalone';
import { ShoppingService } from '../services/shopping.service';
import { Router, ActivatedRoute } from '@angular/router';
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
export class AddItemPage implements OnInit {
  private shoppingService = inject(ShoppingService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  nome = signal('');
  quantidade = signal(1);
  categoria = signal('Geral');
  isEditing = signal(false);

  categorias = [
    'Padaria', 'Hortifruti', 'Carnes', 'Laticínios',
    'Limpeza', 'Higiene', 'Bebidas', 'Geral'
  ];

  constructor() {
    addIcons({ saveOutline, closeOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id.set(id);
      this.isEditing.set(true);
      const item = this.shoppingService.getItemById(id);
      if (item) {
        this.nome.set(item.nome);
        this.quantidade.set(item.quantidade);
        this.categoria.set(item.categoria);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  save() {
    if (this.nome().trim()) {
      if (this.isEditing()) {
        const item = this.shoppingService.getItemById(this.id()!);
        if (item) {
          this.shoppingService.updateItem({
            ...item,
            nome: this.nome(),
            quantidade: this.quantidade(),
            categoria: this.categoria()
          });
        }
      } else {
        this.shoppingService.addItem(this.nome(), this.quantidade(), this.categoria());
      }
      this.router.navigate(['/home']);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
