import { Component } from '@angular/core';
import { NavItem } from '../Classes/nav-item';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  mobileQuery!: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener!: () => void;
  menu: NavItem [] = [
    {
      displayName: 'Home',
      iconName: 'home',
      route: 'homepage',
    },

    {
      displayName: 'Admin',
      iconName: 'person',
      children: [
        {
          displayName: 'Client Details',
          iconName: 'how_to_reg',
          route: '/clientDetails'
        },
        {
          displayName: 'Cattle Details',
          iconName: 'pets',
          route: '/cattleDetails'
        }
      ]
    },
    {
      displayName: 'Products',
      iconName: 'shopping_cart',
      children: [
          {
            displayName: 'Products',
            iconName: 'shopping_cart',
            route: '/products'
          },
          {
            displayName: 'Production',
            iconName: 'factory',
            route: '/production'
          },  {
            displayName: 'Feed Details',
            iconName: 'restaurant',
            route: '/feedDetails'
          }
          ,  {
            displayName: 'Purchase Details',
            iconName: ' monetization_on',
            route: '/purchaseDetails'
          }
        ]
      }
  ];

  constructor(media: MediaMatcher){

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
