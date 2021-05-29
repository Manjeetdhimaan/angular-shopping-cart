import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  constructor(private slService: ShoppingListService) { }
  editItemIndex: number;
  editedItem: Ingredient;
  editMode = false
  subscription: Subscription;
  ngOnInit() {

    this.subscription = this.slService.editStart.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true
        this.editedItem = this.slService.emitIngredient(this.editItemIndex)
        console.log(this.slForm.value)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.slService.updateIngredients(this.editItemIndex, newIngredient)
    }
    else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false
    form.reset();
  }
  onClearItem() {
    this.slForm.reset()
    this.editMode = false
  }
  onDelete() {
    this.slForm.reset();
    this.slService.deleteIngredient(this.editItemIndex);
    this.editMode = false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
