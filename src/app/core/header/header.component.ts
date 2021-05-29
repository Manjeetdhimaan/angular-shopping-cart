import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Recipe } from '../../recipes/recipe.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  onAddData() {
    this.dataStorageService
      .addRecipes()
      .subscribe((httpresponse: HttpResponse<Recipe[]>) => {
        console.log(httpresponse);
      });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onAuth() {
    return this.authService.isAuthenticated();
  }

  authLogOut() {
    this.authService.logOut();
  }
}
