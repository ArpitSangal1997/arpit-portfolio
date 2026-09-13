import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-scene-3d',
  standalone: true,
  template: `
    <div class="scene-3d" aria-hidden="true">
      <svg class="line-canvas" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false">
        <path
          class="journey-line"
          pathLength="1"
          stroke-dasharray="1"
          [style.stroke-dashoffset]="1 - progress"
           d="M 0 0
             L 120 130
             L 880 220
             L 140 390
             L 900 560
             L 180 700
             L 760 900
             L 780 840
             L 800 900
             L 793 880
             L 770 880
             L 760 900
             L 820 900
             L 820 870
             L 830 885
             L 845 875
             L 855 900
             L 870 900
             L 870 860
             L 870 925
             L 880 880
             L 900 878
             L 910 890
             L 900 900
             L 880 900
             L 920 900
             L 920 875
             L 920 900
             L 920 865
             L 928 865
             L 928 872
             L 920 872
             L 920 900
             L 940 900
             L 940 850
             L 940 900
             L 958 900
             L 930 875
             L 958 875
             L 980 960" />
      </svg>
    </div>
  `,
  styleUrl: './scene-3d.scss'
})
export class Scene3dComponent implements AfterViewInit {
  progress = 0;
  private readonly platformId = inject(PLATFORM_ID);
  private frame = 0;

  constructor() {
    this.scheduleProgressUpdate();
  }

  ngAfterViewInit(): void {
    this.updateProgress();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scheduleProgressUpdate();
  }

  @HostListener('document:scroll')
  onDocumentScroll(): void {
    this.scheduleProgressUpdate();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.scheduleProgressUpdate();
  }

  private scheduleProgressUpdate(): void {
    if (!isPlatformBrowser(this.platformId) || this.frame) {
      return;
    }

    this.frame = window.requestAnimationFrame(() => {
      this.updateProgress();
      this.frame = 0;
    });
  }

  private updateProgress(): void {
    const scrollingElement = document.scrollingElement ?? document.documentElement;
    const scrollableHeight = scrollingElement.scrollHeight - scrollingElement.clientHeight;
    const scrollTop = scrollingElement.scrollTop;
    this.progress = scrollableHeight > 0 ? Math.min(1, scrollTop / scrollableHeight) : 0;
  }
}
