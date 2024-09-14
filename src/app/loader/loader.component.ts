
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  // [x: string]: any;
  // name = 'NGX-UI-LOADER';
  isLoading: boolean = false;
  private loadingSubscription: Subscription | undefined;
  constructor(private loaderService: LoaderService) { }
    
      ngOnInit() {

        // this.ngxLoader.start(); // start foreground spinner of the master loader with 'default' taskId
        // // Stop the foreground loading after 5s
        // setTimeout(() => {
        //   this.ngxLoader.stop(); // stop foreground spinner of the master loader with 'default' taskId
        // }, 4000);

        // // OR
        // this.ngxLoader.startBackground("do-background-things");
        // // Do something here...
        // this.ngxLoader.stopBackground("do-background-things");

        // this.ngxLoader.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
        // // Stop the foreground loading after 5s
        // setTimeout(() => {
        //   this.ngxLoader.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
        // }, 5000);
        // this.loader.getLoading().subscribe(loading => {
        //   console.log('Loading state:', loading); // Log for debugging
        //   if (loading) {
        //     this.ngxLoader.start();
        //     console.log('NgxUiLoader started'); // Log for debugging
        //   } else {
        //     this.ngxLoader.stop();
        //     console.log('NgxUiLoader stopped'); // Log for debugging
        //   }
        // });

        this.loadingSubscription = this.loaderService.isLoading.subscribe(
          (loading) => {
            this.isLoading = loading;
          }
        );
      }
      ngOnDestroy(): void {
        if (this.loadingSubscription) {
          this.loadingSubscription.unsubscribe();
        }
      }

    }
