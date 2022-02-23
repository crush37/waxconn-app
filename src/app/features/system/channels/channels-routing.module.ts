import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';

const routes: Routes = [
  {
    path: '', component: ChannelListComponent
  },
  {
    path: 'discogs',
    loadChildren: () => import('@features/channels/discogs/discogs.module').then(m => m.DiscogsModule)
  },
  {
    path: 'pos',
    loadChildren: () => import('@features/channels/pos/pos.module').then(m => m.PosModule)
  },
  {
    path: 'shopify',
    loadChildren: () => import('@features/channels/shopify/shopify.module').then(m => m.ShopifyModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelsRoutingModule {
}
