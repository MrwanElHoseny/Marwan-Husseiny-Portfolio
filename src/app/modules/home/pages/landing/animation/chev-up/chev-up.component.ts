import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chev-up',
  templateUrl: './chev-up.component.html',
  styleUrls: ['./chev-up.component.scss'],
})
export class ChevUpComponent implements OnInit {
  @Input() size: 'md' | 'lg' = 'md';
  constructor() {}

  ngOnInit(): void {}
}
