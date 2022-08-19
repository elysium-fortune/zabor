import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { PromotionalRoutingModule } from './promotional-routing.module';
import { AdvertComponent } from './advert/advert.component';
import { VideoComponent } from './video/video.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { VideoProcessingService } from '../../../shared/services/video-processing.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
    imports: [
        CommonModule,
        PromotionalRoutingModule,
        DataTablesModule,
        AmazingTimePickerModule,
        UiSwitchModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule,
        AngularMultiSelectModule,
        NgxDaterangepickerMd.forRoot(),
        NgxSmartModalModule.forRoot(),
    ],
    providers: [
        VideoProcessingService
    ],
    declarations: [AdvertComponent, VideoComponent]

})
export class PromotionalModule { }
