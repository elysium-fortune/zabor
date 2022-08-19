import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { restaurantsRoutingModule } from './restaurants-routing.module';
import { restaurantsComponent } from './restaurants.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ViewComponent } from './view/view.component';
import { ReviewComponent } from './review/review.component';
import { RatingModule } from 'ng-starrating';
import { GalleryComponent } from './gallery/gallery.component';
import { MenuComponent } from './menu/menu.component';
import { LightboxModule } from 'ngx-lightbox';
import { RestaurantviewModule } from './../../../shared/modules/restaurantview/restaurantview.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdersModule } from './../../../shared/modules/front/orders/orders.module';

@NgModule({
    imports: [
        CommonModule,
        restaurantsRoutingModule,
        DataTablesModule,
        UiSwitchModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule,
        AngularMultiSelectModule,
        RatingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.GoogleMapApiKey
        }),
        LightboxModule,
        RestaurantviewModule,
        OrdersModule
    ],
    declarations: [restaurantsComponent, ViewComponent, ReviewComponent, GalleryComponent, MenuComponent, OrdersComponent]

})
export class RestaurantModule { }
