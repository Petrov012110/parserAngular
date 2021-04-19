import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from '@angular/material/list';



import { LoginPageComponent } from "./login-page/login-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { ParserPageComponent } from './parser-page/parser-page.component';
import { ClientPageComponent } from "./client-page/client-page.component";
import { TableComponent } from './shared/components/table/table.component';
import { TreeComponent } from './shared/components/tree/tree.component';
import { GroupsComponent } from './shared/components/groups/groups.component';
import { FavoritesComponent } from "./shared/components/favorites/favorites.component";
import { PostComponent } from './shared/components/post/post.component';

import { TableServices } from "./shared/services/table.services";
import { GroupsServices } from "./shared/services/groups.services";
import { TreeServices } from "./shared/services/tree.services";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        UserLayoutComponent, 
        ParserPageComponent, 
        ClientPageComponent, 
        TableComponent, 
        TreeComponent, 
        GroupsComponent,
        FavoritesComponent,
        PostComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatTableModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatListModule,
        NgbModule,
        
        RouterModule.forChild([
            {
                path: '', component: UserLayoutComponent, children: [
                    {path: '', redirectTo: '/user/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'parser', component: ParserPageComponent, children: [
                        {path: '', redirectTo: '/user/parser/table', pathMatch: 'full'},
                        {path: 'table', component: TableComponent},
                        {path: 'favorites', component: FavoritesComponent}
                    ]},
                    {path: 'post/:id', component: PostComponent},
                    {path: 'client', component: ClientPageComponent}
                ]
            }
        ])
    ],
    providers: [
        TableServices,
        GroupsServices,
        TreeServices
    ],
    exports: [RouterModule]
})
export class UserModule {

}