import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Engine,
  IShapeDrawData,
  IShapeDrawer,
  MoveDirection,
  OutMode,
  Particle,
} from '@tsparticles/engine';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { ConfigService } from 'src/app/services/config.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('startArrow', { static: true }) startArrow!: ElementRef;
  @ViewChild('startSection', { static: true }) startSection!: ElementRef;
  id = 'home-particles';
  arrowDown = faArrowDown;

  particlesOptions = {
    background: {},
    fpsLimit: 120,

    fullScreen: {
      enable: false,
      zIndex: 99999999,
    },
    interactivity: {
      events: {
        onClick: {},
        onDiv: {},
        onHover: {
          enable: true,
          mode: '',
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 1.2,
        },
      },
    },
    particles: {
      links: {
        // color: '#461986',
        color: '#aaaaaa',
        distance: 320,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: true,
        speed: 0.8,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 27,
      },
      opacity: {
        value: 1,
      },
      shape: { type: 'custom-circle', fill: true },
      size: {
        value: { min: 5, max: 20 },
      },
    },
    detectRetina: true,
  };

  constructor(
    private readonly ngParticlesService: NgParticlesService,
    private _configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadFull(engine);
      await loadSlim(engine);
      const customCircleDrawer: IShapeDrawer = {
        draw: ({ context, particle, radius }: IShapeDrawData<Particle>) => {
          context.beginPath();
          context.arc(0, 0, radius, 0, Math.PI * 2, false);
          // Fill the inner space with a different color
          context.fillStyle = '#eeeeee'; //var(--primary-bg) //#10002b
          context.fill();
          // Change this to your desired fill color
          context.strokeStyle = '#aaaaaa'; //#9d4edd
          context.lineWidth = 2;
          context.stroke();
          context.closePath();
        },
        validTypes: ['custom-circle'],
      };
      engine.addShape(customCircleDrawer);
    });
    this.initMouseSway();
    this.initStartArrow();
  }

  initMouseSway() {
    document.addEventListener('mousemove', this.swayContent);
  }

  swayContent(e: MouseEvent) {
    const centerX = window.innerWidth / 2; // Calculate the center x-coordinate of the viewport
    const distanceFromCenterX = e.clientX - centerX; // Calculate the distance from the center
    let homeWelcome = document.getElementById('welcome');
    let titleElement = document.getElementById('title');
    let titleOutlineElement = document.getElementById('title-outline');
    let chevLeftElement = document.getElementById('chev-left');
    let chevMidElement = document.getElementById('chev-mid');
    let chevRightElement = document.getElementById('chev-right');

    if (homeWelcome) {
      homeWelcome.style.transform = `translateX(${distanceFromCenterX / 50}px)`;
    }

    if (titleElement) {
      titleElement.style.transform = `translateX(${
        distanceFromCenterX / 50
      }px)`;
    }

    if (titleOutlineElement) {
      titleOutlineElement.style.transform = `translateX(${
        distanceFromCenterX / 25
      }px)`;
    }

    if (chevLeftElement) {
      chevLeftElement.style.transform = ` translateX(${
        -distanceFromCenterX / 35
      }px)`;
    }
    if (chevMidElement) {
      chevMidElement.style.transform = `translateX(${
        -distanceFromCenterX / 25
      }px) `;
    }
    if (chevRightElement) {
      chevRightElement.style.transform = `translateX(${
        -distanceFromCenterX / 15
      }px)`;
    }
  }

  initStartArrow() {
    const startSection = this.startSection.nativeElement;
    if (!startSection) return;
    this.startArrowBounce();

    gsap.fromTo(
      startSection,
      {
        y: 35,
        opacity: 0,
        filter: 'blur(15px)',
      },
      {
        y: 0,
        filter: 'blur(0px)',
        ease: 'ease-in',
        delay: 3,
        opacity: 1,
        duration: 1,
        onComplete: () => {},
      }
    );
  }
  startArrowBounce() {
    const startArrow = this.startArrow.nativeElement;

    if (!startArrow) return;

    gsap.fromTo(
      startArrow,
      {
        y: 30,
      },
      {
        y: 0,
        color: '#fafafa',
        borderColor: '#fafafa',
        ease: 'ease-in',
        yoyo: true,
        repeat: -1,
        duration: 1,
      }
    );
  }

  get firstName() {
    return this._configService.firstName;
  }
  get lastName() {
    return this._configService.lastName;
  }
  // particlesLoaded(container: Container): void {
  //   console.log(container);
  // }
}
