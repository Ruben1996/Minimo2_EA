import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {path} from "@angular-devkit/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stations',
    pathMatch: 'full'
  },
  {
    path: 'stations',
    children: [
      {
        path: '',
        loadChildren: './pages/home/home.module#HomePageModule'
      },
      {
        path: ':id',
        loadChildren: './pages/list/list.module#ListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
