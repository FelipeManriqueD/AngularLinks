import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../core/models';

@Component({
    templateUrl: 'logo.component.html',
    selector: 'app-logo',
    styleUrls: ['logo.component.scss']
})
export class LogoComponent implements OnInit{
    @Input() userToken: User;
    
    constructor(){

    }

    ngOnInit(){
        
    }
}