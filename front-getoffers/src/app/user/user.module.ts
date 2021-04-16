import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { LoginPageComponent } from "./login-page/login-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { ParserPageComponent } from './parser-page/parser-page.component';
import { ClientPageComponent } from "./client-page/client-page.component";
import { TableComponent } from './shared/components/table/table.component';
import { TreeComponent } from './shared/components/tree/tree.component';
import { GroupsComponent } from './shared/components/groups/groups.component';
import { FavoritesComponent } from "./shared/components/favorites/favorites.component";



@NgModule({
    declarations: [
        UserLayoutComponent, 
        ParserPageComponent, 
        ClientPageComponent, 
        TableComponent, 
        TreeComponent, 
        GroupsComponent,
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatTableModule,
        RouterModule.forChild([
            {
                path: '', component: UserLayoutComponent, children: [
                    {path: '', redirectTo: '/user/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'parser', component: ParserPageComponent, children: [
                        { path: '', redirectTo: '/user/parser/table', pathMatch: 'full' },
                        {path: 'table', component: TableComponent},
                        {path: 'favorites', component: FavoritesComponent}
                    ]},
                    {path: 'client', component: ClientPageComponent}
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class UserModule {

}