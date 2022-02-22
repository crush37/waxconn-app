import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'discogs',
    loadChildren: () => import('./discogs/discogs.module').then(m => m.DiscogsModule)
  },
  {
    path: 'pos',
    loadChildren: () => import('./pos/pos.module').then(m => m.PosModule)
  },
  {
    path: 'shopify',
    loadChildren: () => import('./shopify/shopify.module').then(m => m.ShopifyModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelsRoutingModule { }
