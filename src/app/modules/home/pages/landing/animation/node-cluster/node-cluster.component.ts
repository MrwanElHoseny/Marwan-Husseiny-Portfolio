import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'node-cluster',
  templateUrl: './node-cluster.component.html',
  styleUrls: ['./node-cluster.component.scss'],
})
export class NodeClusterComponent implements OnInit {
  constructor() {}

  @Input() nodeCount: number = 3;
  public numOfLines: number = 2;

  @ViewChild('container') container!: ElementRef;

  ngOnInit(): void {
    this.calcNumOfLines();
  }

  ngAfterViewInit(): void {
    this.shuffleNodes();

    this.updateLines();
    setInterval(() => this.updateLines(), 1);
  }

  updateLines(): void {
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const divs = this.container.nativeElement.querySelectorAll('.circle');
    const lines = this.container.nativeElement.querySelectorAll('line');

    divs.forEach((div1: HTMLElement, index1: number) => {
      divs.forEach((div2: HTMLElement, index2: number) => {
        if (index1 < index2) {
          const rect1 = (div1 as HTMLElement).getBoundingClientRect();
          const rect2 = (div2 as HTMLElement).getBoundingClientRect();
          const line = lines[
            index1 * divs.length + index2 - ((index1 + 1) * (index1 + 2)) / 2
          ] as SVGLineElement;
          const x1 = rect1.left + rect1.width / 2 - containerRect.left;
          const y1 = rect1.top + rect1.height / 2 - containerRect.top;
          const x2 = rect2.left + rect2.width / 2 - containerRect.left;
          const y2 = rect2.top + rect2.height / 2 - containerRect.top;

          line.setAttribute('x1', x1.toString());
          line.setAttribute('y1', y1.toString());
          line.setAttribute('x2', x2.toString());
          line.setAttribute('y2', y2.toString());

          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          let strokeWidth: number = 0;
          if (length < 300) {
            strokeWidth = Math.max(0, Math.min(1, 1 / (length / 100))); // Inverse relationship
          } else {
            strokeWidth = 0;
          }
          line.style.strokeWidth = strokeWidth.toString();
        }
      });
    });
  }

  shuffleNodes() {
    const nodes = this.container.nativeElement.querySelectorAll('.circle');
    nodes.forEach((node: HTMLElement) => {
      const randomTop = this.getRandomNumber(0, 220) + 'px';
      const randomLeft = this.getRandomNumber(0, 1920) + 'px';
      node.style.top = randomTop;
      node.style.left = randomLeft;
    });
  }
  changePosition(event: any) {
    let circle = event.target;

    circle.style.animationName = 'none';

    requestAnimationFrame(() => {
      circle.style.animationName = '';
    });

    let circleStyle = getComputedStyle(circle);
    let finalX = circleStyle.getPropertyValue('--xB');
    let finalY = circleStyle.getPropertyValue('--yB');

    circle.style.setProperty('--xA', finalX);
    circle.style.setProperty('--yA', finalY);

    circle.style.setProperty('--xB', this.getRandomNumber(-50, 300) + 'px');
    circle.style.setProperty('--yB', this.getRandomNumber(-50, 300) + 'px');
    circle.style.setProperty('animation-duration', '12s');
  }

  getRandomNumber(low: number, high: number) {
    let r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
  }

  calcNumOfLines() {
    this.numOfLines = (this.nodeCount * (this.nodeCount - 1)) / 2;
  }
}
