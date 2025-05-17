import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'content-fade-up',
  standalone: true,
  imports: [],
  templateUrl: './content-fade-up.component.html',
  styleUrl: './content-fade-up.component.scss',
})
export class ContentFadeUpComponent implements AfterViewInit {
  @ViewChild('contentFadeUp') content!: ElementRef<any>;
  @Input() delay: number = 0;
  @Input() duration: number = 3;
  constructor() {}

  ngOnInit(): void {
    // Add any initialization logic if needed
  }

  ngAfterViewInit(): void {
    // Call the animation function after the content is initialized
    this.initiateAnimation();
  }
  initiateAnimation(): void {
    // Ensure the content is available before accessing it
    if (!this.content) {
      console.error('Content element is not available');
      return;
    }
    const element = this.content.nativeElement;

    // Trigger the animation using GSAP
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 150,
      },
      {
        y: 0,
        opacity: 1,
        duration: this.duration,
        ease: 'power3.out',
        delay: this.delay,
      }
    );
  }
}
