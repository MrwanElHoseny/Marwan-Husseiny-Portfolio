import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  @ViewChildren('slideRef') slides!: QueryList<ElementRef>;
  private currentIndex = 0;
  private isAnimating = false;

  ngAfterViewInit() {
    // Optional: Animate first slide content
    this.animateSlide(this.currentIndex);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.isAnimating) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = this.currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < this.slides.length) {
      this.scrollToSlide(nextIndex);
    }
  }

  private scrollToSlide(index: number) {
    const target = this.slides.toArray()[index].nativeElement;

    this.isAnimating = true;
    gsap.to('.scroll-container', {
      duration: 0.5,
      scrollTo: { y: target, autoKill: false },
      ease: 'power2.out',
      onComplete: () => {
        this.currentIndex = index;
        this.isAnimating = false;
        this.animateSlide(index);
      },
    });
  }

  private animateSlide(index: number) {
    // const slide = this.slides.toArray()[index].nativeElement;
    // gsap.fromTo(
    //   slide.querySelector('.content'),
    //   { opacity: 0, y: 50 },
    //   { opacity: 1, y: 0, duration: 0.6 }
    // );
  }
}
