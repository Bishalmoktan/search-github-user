import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "search",
    component: SearchComponent
  },
  {
    path: "user/:username",
    component: UserInfoComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];
