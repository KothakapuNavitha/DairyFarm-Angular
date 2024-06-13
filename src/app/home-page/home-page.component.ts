import { Component ,OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})

export class HomePageComponent implements OnInit {
  images: string[] = [
    
    'assets/IMG-20240613-WA0012.jpg',
    'assets/IMG-20240613-WA0010.jpg',
    'assets/IMG-20240613-WA0009.jpg',
    'assets/IMG-20240613-WA0008.jpg',
    'assets/IMG-20240613-WA0013.jpg'
    
    
 
   ];
   currentImage: string = this.images[0];
   currentIndex: number = 0;
   constructor() {}
 
   ngOnInit(): void {
     this.startSlideshow();
   }
   startSlideshow() {
     setInterval(() => {
       this.nextSlide();
     }, 5000);
   }
   nextSlide() {
     this.currentIndex = (this.currentIndex + 1) % this.images.length;
     this.currentImage = this.images[this.currentIndex];
   }
   onHover(index: number) {
     this.currentIndex = index;
   }
 
   onHoverOut() {
     this.currentIndex = -1; 
   }

}
