import { Component, OnInit } from '@angular/core';
import {
  Engine,
  Events,
  Interactivity,
  IShapeDrawData,
  IShapeDrawer,
  MoveDirection,
  OutMode,
  Particle,
  tsParticles,
} from '@tsparticles/engine';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { assert } from 'console';
import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  id = 'home-particles';

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = 'http://foo.bar/particles.json';

  /* or the classic JavaScript object */
  particlesOptions = {
    background: {},
    fpsLimit: 120,

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
      color: {
        value: '#a562db',
      },
      links: {
        color: '#461986',
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
          context.fillStyle = '#10002b';
          context.fill();
          // Change this to your desired fill color
          context.strokeStyle = '#a562db';
          context.lineWidth = 2;
          context.stroke();
          context.closePath();
        },
        validTypes: ['custom-circle'],
      };
      engine.addShape(customCircleDrawer);
    });
    this.initMouseSway();
  }

  initMouseSway() {
    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2; // Calculate the center x-coordinate of the viewport
      const distanceFromCenterX = e.clientX - centerX; // Calculate the distance from the center
      let titleElement = document.getElementById('title');
      let titleOutlineElement = document.getElementById('title-outline');
      let chevLeftElement = document.getElementById('chev-left');
      let chevMidElement = document.getElementById('chev-mid');
      let chevRightElement = document.getElementById('chev-right');

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
    });
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
