import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  encapsulation: ViewEncapsulation.None
  id: number;
  editMode = false;
  recipeForm: FormGroup
  constructor(private route: ActivatedRoute, private recipeService: RecipeService ,private router:Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // this.editMode = params['id'] != null;
          if (this.id >=0 ) {
            this.editMode = true;
          }
          this.initForm()
        }
      );
  }
  onSubmit() {
    const newRecipe = new Recipe(this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['image'],
      this.recipeForm.value['ingredients'])
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
    }
    else {
      this.recipeService.addRecipe(newRecipe)
      console.log(this.recipeForm.value)
    }
    this.cancalRecipe()
  }
  onAddIngrdient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDesc = "";
    let recipeIngredient = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredient.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "image": new FormControl(recipeImgPath, Validators.required),
      "desc": new FormControl(recipeDesc, Validators.required),
      "ingredients": recipeIngredient

    })
    console.log(recipeIngredient)

  }
  cancalRecipe(){
      this.router.navigate(["/recipes"]);
}
ondelete(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
}
}
