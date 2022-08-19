import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { restaurantsComponent } from './restaurants.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { MenuComponent } from './menu/menu.component';
import { ReviewComponent } from './review/review.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DetailComponent } from './detail/detail.component';
import { ReservationTimeComponent } from './reservation-time/reservation-time.component';
import { OrdersComponent } from './orders/orders.component';
import { DiscountComponent } from './discount/discount.component';

const routes: Routes = [
    {
        path: '', children: [
            {
                path: 'list',
                component: restaurantsComponent,
                data: {
                    title: 'Restaurant'
                }
            },
            {
                path: 'create',
                component: CreateComponent,
                data: {
                    title: 'Create Restaurant'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data: {
                    title: 'Edit Restaurant'
                }
            },
            {
                path: 'menu/:id',
                component: MenuComponent,
                data: {
                    title: 'Manu'
                }
            },
            {
                path: 'review/:id',
                component: ReviewComponent,
                data: {
                    title: 'Review'
                }
            },
            {
                path: 'gallery/:id',
                component: GalleryComponent,
                data: {
                    title: 'Gallery'
                }
            },
            {
                path: 'detail/:id',
                component: DetailComponent,
                data: {
                    title: 'Detail'
                }
            },
            {
                path: 'orders/:id',
                component: OrdersComponent,
                data: {
                    title: 'Detail'
                }
            },
            {
                path: 'reservation-time/:id',
                component: ReservationTimeComponent,
                data: {
                    title: 'Reservation Time'
                }
            },
            {
                path: 'discounts/:id',
                component: DiscountComponent,
                data: {
                    title: 'Discounts'
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class restaurantsRoutingModule {
}
