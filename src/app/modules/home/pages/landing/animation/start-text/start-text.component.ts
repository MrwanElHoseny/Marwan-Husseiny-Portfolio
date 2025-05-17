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
  selector: 'start-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-text.component.html',
  styleUrl: './start-text.component.scss',
})
export class StartTextComponent implements AfterViewInit, OnChanges {
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

  dir = 'down';
  animateText(): void {
    if (!this.textElements) return;
    const textElements = this.textElements.toArray();
    gsap.fromTo(
      textElements.map((el) => el.nativeElement),
      {
        y: this.dir === 'down' ? 20 : 0,
      },
      {
        y: this.dir === 'down' ? 0 : 20,
        color: this.dir === 'down' ? '#fafafa' : '#c77dff',
        duration: this.dir === 'down' ? 0.4 : 0.7,
        stagger: {
          amount: 0.5,
        },
        ease: this.dir === 'down' ? 'ease-out' : 'none',
        onComplete: () => {
          this.dir = this.dir === 'down' ? 'up' : 'down';
          this.animateText();
        },
      }
    );
  }
}
