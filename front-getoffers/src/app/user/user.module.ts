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
import { ParserPageComponent } from './parser-page/parser-page.component';
import { TableComponent } from './shared/components/table/table.component';
import { TreeComponent } from './shared/components/tree/tree.component';
import { GroupsComponent } from './shared/components/groups/groups.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TreeService } from "./shared/services/tree.service";
import {MatTabsModule} from '@angular/material/tabs';
import { FavoritesComponent } from "./shared/components/favorites/favorites.component";
import { HttpClientModule } from "@angular/common/http";
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        UserLayoutComponent, 
        ClientPageComponent, 
        MainPageComponent,  
        ParserPageComponent, 
        TableComponent, 
        TreeComponent, 
        GroupsComponent,
        FavoritesComponent
    ],
        
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatTreeModule,
        MatCheckboxModule,
        MatFormFieldModule,
        HttpClientModule,
        MatListModule,
        MatTabsModule,
        MatTableModule,
        RouterModule.forChild([
            {
                path: '', component: UserLayoutComponent, children: [
                    {path: '', redirectTo: '/user/main', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'main', component: MainPageComponent},
                    {path: 'client', component: ClientPageComponent},
                    {path: 'parser', component: ParserPageComponent},
                    
                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [TreeService]
})
export class UserModule {

}