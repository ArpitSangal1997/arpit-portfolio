import { Directive, ElementRef, HostListener, inject, input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTiltCard]',
  standalone: true
})
export class TiltCardDirective implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  maxTilt = input(12);

  private rafId = 0;

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.applyTilt(e));
  }

  @HostListener('mouseleave')
  onLeave(): void {
    cancelAnimationFrame(this.rafId);
    const node = this.el.nativeElement;
    node.style.transform = '';
    node.style.setProperty('--glow-x', '50%');
    node.style.setProperty('--glow-y', '50%');
  }

  private applyTilt(e: MouseEvent): void {
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tilt = this.maxTilt();
    const rotateX = ((y - cy) / cy) * -tilt;
    const rotateY = ((x - cx) / cx) * tilt;

    node.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    node.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
    node.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
}
