import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'text-animate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-animate.component.html',
  styleUrl: './text-animate.component.scss',
})
export class TextAnimateComponent implements AfterViewInit, OnChanges {
  @Input() text: string = 'Text';
  public textLetters: string[] = [];

  @ViewChildren('letterElement') textElements!: QueryList<any>;

  ngAfterViewInit(): void {
    this.animateText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.textLetters = this.text.split('');
      if (this.textLetters.length) {
        this.animateText();
      }
    }
  }

  animateText() {
    if (!this.textElements) return;

    const elements = this.textElements.toArray();

    gsap.fromTo(
      elements.map((el) => el.nativeElement),
      {
        y: 150,
        scale: 0.5,
        opacity: 0,
        filter: 'blur(20px)',
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        filter: 'blur(0px)',
        stagger: {
          amount: 0.4,
          from: 'center',
        },
        delay: 1.5,
        ease: 'cubic-bezier(.91,-0.01,.4,.99)',
      }
    );
  }
}
