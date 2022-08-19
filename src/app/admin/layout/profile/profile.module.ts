import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule

    ],
    declarations: [ProfileComponent]

})
export class ProfileModule { }
