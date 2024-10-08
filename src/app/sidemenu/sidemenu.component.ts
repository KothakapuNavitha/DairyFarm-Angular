import { Component, OnDestroy ,ViewChildren, QueryList } from '@angular/core';
import { NavItem } from '../Classes/nav-item';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  isLoggedIn$!: Observable<boolean>;

  mobileQuery!: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
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
        // {
        //   displayName: 'Cattle Details',
        //   iconName: 'pets',
        //   route: '/cattleDetails'
        // },
        {
          displayName: 'Customer Details',
          iconName: 'people',
          route: '/customerDetails'
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
        ]
      },
      {
        displayName: 'Purchase',
        iconName: 'monetization_on',
        children: [
          {
            displayName: 'Purchase Details',
            iconName: 'list_alt',
            route: '/purchaseDetails'
          },{
            displayName: 'Purchase Reports',
            iconName: 'new_releases',
            route: '/purchaseReports'
          }
        ]
      },
      {
        displayName: 'Sales',
        iconName: 'business',
        children: [
          {
            displayName: 'Sales Details',
            iconName: 'list_alt',
            route: '/salesDetails'
          }
        ]
      }
  ]

  constructor(private router:Router,media: MediaMatcher,private userService: UserService){

  }

  ngOnInit(){
    this.isLoggedIn$ = this.userService.isLoggedIn;
  }
  onLogout() {
    // debugger;
    this.userService.logout();

    this.router.navigate(['/login'])

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
