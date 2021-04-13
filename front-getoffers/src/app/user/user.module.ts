import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { ClientPageComponent } from "./client-page/client-page.component";
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainPageComponent } from './main-page/main-page.component';
import {MatButtonModule} from '@angular/material/button';
import { FavoritesComponent } from './parser-page/favorites/favorites.component';
import { ResultsComponent } from './parser-page/results/results.component';


@NgModule({
    declarations: [
        UserLayoutComponent, 
        ClientPageComponent, 
        MainPageComponent, 
        FavoritesComponent, 
        ResultsComponent
    ],
        
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        RouterModule.forChild([
            {
                path: '', component: UserLayoutComponent, children: [
                    {path: '', redirectTo: '/user/main', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'main', component: MainPageComponent},
                    {path: 'client', component: ClientPageComponent},
                    {path: 'favorites', component: ClientPageComponent},
                    {path: 'results', component: ClientPageComponent}
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class UserModule {

}