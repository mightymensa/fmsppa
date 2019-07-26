import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule',canActivate:[UserGuard]  },
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule',canActivate:[UserGuard] },
  { path: 'zoneview/:index', loadChildren: './pages/zoneview/zoneview.module#ZoneviewPageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesPageModule' },
  { path: 'alarmhistory', loadChildren: './pages/alarm-history/alarm-history.module#AlarmHistoryPageModule' },
  { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(public router:Router){
    this.router.navigate(['home'],{replaceUrl:true});
  }
}
