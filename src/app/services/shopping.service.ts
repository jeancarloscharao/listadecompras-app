import { Injectable, signal, effect, computed } from '@angular/core';
import { ShoppingItem } from '../models/shopping.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    private readonly STORAGE_KEY = 'listadecompras_shopping_items';

    // Signal to store the list of items
    private itemsSignal = signal<ShoppingItem[]>(this.loadFromStorage());

    // Public items signal (readonly to prevent direct mutation)
    readonly items = this.itemsSignal.asReadonly();

    // Computed signal for pending items counter
    readonly pendingCount = computed(() =>
        this.items().filter(item => !item.comprado).length
    );

    constructor() {
        // Effect to automatically save to localStorage whenever itemsSignal changes
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itemsSignal()));
        });
    }

    private loadFromStorage(): ShoppingItem[] {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (!saved) return [];

        try {
            const items = JSON.parse(saved);
            // Ensure dates are correctly parsed back to Date objects
            return items.map((item: any) => ({
                ...item,
                dataAdicao: new Date(item.dataAdicao)
            }));
        } catch (e) {
            console.error('Error loading items from localStorage', e);
            return [];
        }
    }

    addItem(nome: string, quantidade: number, categoria: string) {
        const newItem: ShoppingItem = {
            id: crypto.randomUUID(),
            nome,
            quantidade,
            categoria,
            comprado: false,
            dataAdicao: new Date()
        };

        this.itemsSignal.update(items => [newItem, ...items]);
    }

    removeItem(id: string) {
        this.itemsSignal.update(items => items.filter(item => item.id !== id));
    }

    toggleItemStatus(id: string) {
        this.itemsSignal.update(items =>
            items.map(item =>
                item.id === id ? { ...item, comprado: !item.comprado } : item
            )
        );
    }

    getItemById(id: string): ShoppingItem | undefined {
        return this.itemsSignal().find(item => item.id === id);
    }

    updateItem(updatedItem: ShoppingItem) {
        this.itemsSignal.update(items =>
            items.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    }

    clearCompleted() {
        this.itemsSignal.update(items => items.filter(item => !item.comprado));
    }

    reorderItems(from: number, to: number) {
        this.itemsSignal.update(items => {
            const updatedItems = [...items];
            const [item] = updatedItems.splice(from, 1);
            updatedItems.splice(to, 0, item);
            return updatedItems;
        });
    }
}
