import { Component } from '@angular/core';

@Component({
  selector: 'app-scene-3d',
  standalone: true,
  template: `
    <div class="scene-3d" aria-hidden="true">
      <div class="scene-stage">
        <div class="cube cube-1">
          <div class="face front"></div>
          <div class="face back"></div>
          <div class="face right"></div>
          <div class="face left"></div>
          <div class="face top"></div>
          <div class="face bottom"></div>
        </div>
        <div class="cube cube-2">
          <div class="face front"></div>
          <div class="face back"></div>
          <div class="face right"></div>
          <div class="face left"></div>
          <div class="face top"></div>
          <div class="face bottom"></div>
        </div>
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>
  `,
  styleUrl: './scene-3d.scss'
})
export class Scene3dComponent {}
