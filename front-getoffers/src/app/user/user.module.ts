import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

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
import { BreadcrumbComponent } from "./shared/components/breadcrumb/breadcrumb.component";
import { CheckServices } from "./shared/services/check.services";


@NgModule({
    declarations: [
        UserLayoutComponent, 
        ParserPageComponent, 
        ClientPageComponent, 
        TableComponent, 
        TreeComponent, 
        GroupsComponent,
        FavoritesComponent,
        PostComponent,
        BreadcrumbComponent
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
        NzTreeModule,
        MatCheckboxModule,
        NzCollapseModule,
        NzCheckboxModule,
        NgbModule,
        
        RouterModule.forChild([
            {
                path: '',
                component: UserLayoutComponent,
                children: [
                    {
                        path: '', 
                        redirectTo: '/user/parser', 
                        pathMatch: 'full'
                    },
                    // {path: 'login', component: LoginPageComponent},
                    {
                        path: 'parser', 
                        component: ParserPageComponent, 
                        children: [
                            {
                                path: '', 
                                redirectTo: '/user/parser/table', 
                                pathMatch: 'full'
                            },
                            {
                                path: 'table', 
                                component: TableComponent
                            },
                            {
                                path: 'favorites', 
                                component: FavoritesComponent
                            }
                    ]},
                    {
                        path: 'post/:id',                        
                        component: PostComponent
                    },
                    {
                        path: 'client', 
                        component: ClientPageComponent
                    }
                ]
            }
        ])
    ],
    providers: [
        TableServices,
        GroupsServices,
        TreeServices,
        CheckServices
    ],
    exports: [RouterModule],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule {

}