import { Injectable } from "@angular/core";
import { HttpClient ,HttpResponse } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx'
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{
    constructor(private http:HttpClient ,
         private recipeService:RecipeService,
         private authService:AuthService){
}
addRecipes(){
    const token = this.authService.getToken();
   return this.http.put('https://ng-recipe-book-ba334-default-rtdb.firebaseio.com/recipes.json?auth='+token,
    this.recipeService.getRecipes());
}

getRecipes(){
    const token = this.authService.getToken();
    this.http.get('https://ng-recipe-book-ba334-default-rtdb.firebaseio.com/recipes.json?auth=' +token)
    .map(
        (response:HttpResponse<Recipe[]>)=>
        {
            const recipes:any = response
           for(let recipe of recipes){
               if(!recipe['ingredients']){
                   recipe['ingredients']=[]
               }
           }
           return recipes;
        }
    )
    .subscribe(
        (recipe:Recipe[])=>{
            this.recipeService.retrieveRecipes(recipe);
        }
    );
}
}