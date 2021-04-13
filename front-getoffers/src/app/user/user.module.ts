import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { ParserPageComponent } from './parser-page/parser-page.component';
import { ClientPageComponent } from "./client-page/client-page.component";
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainPageComponent } from './main-page/main-page.component';


@NgModule({
    declarations: [
        UserLayoutComponent, 
        ParserPageComponent, 
        ClientPageComponent, 
        MainPageComponent,

    ],
        
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule.forChild([
            {
                path: '', component: UserLayoutComponent, children: [
                    {path: '', redirectTo: '/user/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'main', component: MainPageComponent},
                    {path: 'parser', component: ParserPageComponent},
                    {path: 'client', component: ClientPageComponent}
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class UserModule {

}