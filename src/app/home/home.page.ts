import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption,
  IonIcon, IonSegment, IonSegmentButton, IonReorderGroup, IonReorder,
  IonFab, IonFabButton, IonBadge, IonButtons, IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingService } from '../services/shopping.service';
import { addIcons } from 'ionicons';
import { trash, add, list, cart, chevronForward, checkmarkDone, pencil } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonCheckbox, IonItemSliding, IonItemOptions,
    IonItemOption, IonIcon, IonSegment, IonSegmentButton, IonReorderGroup,
    IonReorder, IonFab, IonFabButton, IonBadge, IonButtons, IonButton
  ],
})
export class HomePage {
  private router = inject(Router);
  private shoppingService = inject(ShoppingService);

  // Segment state: 'missing' (faltando) or 'cart' (no carrinho)
  currentSegment = signal<'missing' | 'cart'>('missing');

  // Pending items counter from service
  pendingCount = this.shoppingService.pendingCount;

  // Filtered list based on current segment
  filteredItems = computed(() => {
    const items = this.shoppingService.items();
    const segment = this.currentSegment();

    if (segment === 'missing') {
      return items.filter(item => !item.comprado);
    } else {
      return items.filter(item => item.comprado);
    }
  });

  constructor() {
    addIcons({ trash, add, list, cart, chevronForward, checkmarkDone, pencil });
  }

  segmentChanged(event: any) {
    this.currentSegment.set(event.detail.value);
  }

  addItem() {
    this.router.navigate(['/add-item']);
  }

  editItem(id: string, slidingItem: any) {
    slidingItem.close();
    this.router.navigate(['/edit-item', id]);
  }

  toggleStatus(id: string) {
    this.shoppingService.toggleItemStatus(id);
  }

  removeItem(id: string) {
    this.shoppingService.removeItem(id);
  }

  handleReorder(event: any) {
    this.shoppingService.reorderItems(event.detail.from, event.detail.to);
    event.detail.complete();
  }

  clearCompleted() {
    this.shoppingService.clearCompleted();
  }

  trackItems(index: number, item: any) {
    return item.id;
  }
}
