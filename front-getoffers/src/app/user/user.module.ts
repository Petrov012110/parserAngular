import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { ClientPageComponent } from "./client-page/client-page.component";
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
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
import { MainLayoutComponent } from "../shared/components/main-layout/main-layout.component";

@NgModule({
    declarations: [
        UserLayoutComponent, 
        ClientPageComponent, 
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
                path: '', component: MainLayoutComponent, children: [
                    {path: '', redirectTo: '/main', pathMatch: 'full'},
                    {path: 'client', component: ClientPageComponent},
                    {path: 'parser', component: ParserPageComponent, children: [
                        {path: 'table', component: TableComponent},
                        {path: 'favorites', component: FavoritesComponent},
                    ]},
                    
                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [TreeService]
})
export class UserModule {

}