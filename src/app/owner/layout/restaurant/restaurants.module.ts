import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { restaurantsRoutingModule } from './restaurants-routing.module';
import { restaurantsComponent } from './restaurants.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MenuComponent } from './menu/menu.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ReviewComponent } from './review/review.component';
import { RatingModule } from 'ng-starrating';
import { GalleryComponent } from './gallery/gallery.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { LightboxModule } from 'ngx-lightbox';
import { DetailComponent } from './detail/detail.component';
import { RestaurantviewModule } from '../../../shared/modules/restaurantview/restaurantview.module';
import { ReservationTimeComponent } from './reservation-time/reservation-time.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { OrdersComponent } from './orders/orders.component';
import { OrdersModule } from './../../../shared/modules/front/orders/orders.module';
import { DiscountComponent } from './discount/discount.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
    imports: [
        CommonModule,
        AngularFileUploaderModule,
        restaurantsRoutingModule,
        DataTablesModule,
        AmazingTimePickerModule,
        UiSwitchModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule,
        RatingModule,
        AngularMultiSelectModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GoogleMapApiKey,
            libraries: ['places']
        }),
        LightboxModule,
        RestaurantviewModule,
        FullCalendarModule,
        OrdersModule,
        RichTextEditorModule

    ],
    declarations: [restaurantsComponent, CreateComponent, EditComponent, MenuComponent, ReviewComponent, GalleryComponent, DetailComponent, ReservationTimeComponent, OrdersComponent, DiscountComponent]

})
export class RestaurantModule { }
