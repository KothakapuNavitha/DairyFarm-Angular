
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderService } from '../loader.service';
import { config, Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading: boolean = false;
  private loadingSubscription: Subscription | undefined;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(){
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
