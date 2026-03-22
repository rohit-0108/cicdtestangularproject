import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Team';
 
  private readonly SPARKS = ['✨', '⭐', '💥', '🌟', '✦', '★', '•', '◆', '▲', '❋'];
  private readonly COLORS = [
    '#ff4d4d', '#ff9900', '#ffe600', '#33ff77',
    '#33ddff', '#cc66ff', '#ff66cc', '#ffffff',
    '#ffaa00', '#44eeff'
  ];
 
  onOkClick(event: MouseEvent): void {
    const btn = event.currentTarget as HTMLElement;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
 
    this.burst(cx, cy);
    setTimeout(() => this.burst(cx - 80, cy - 60), 120);
    setTimeout(() => this.burst(cx + 80, cy - 50), 220);
    setTimeout(() => this.burst(cx, cy - 100), 350);
  }
 
  private burst(cx: number, cy: number): void {
    const count = 38;
 
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.classList.add('spark');
 
      const angle = (2 * Math.PI * i) / count + Math.random() * 0.4;
      const dist = 60 + Math.random() * 140;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - Math.random() * 60;
      const rot = (Math.random() - 0.5) * 720 + 'deg';
      const char = this.SPARKS[Math.floor(Math.random() * this.SPARKS.length)];
 
      el.textContent = char;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--rot', rot);
      el.style.animationDuration = (0.55 + Math.random() * 0.55) + 's';
      el.style.animationDelay = (Math.random() * 0.12) + 's';
 
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
 
    for (let j = 0; j < 22; j++) {
      const dot = document.createElement('div');
      dot.classList.add('trail');
 
      const angle2 = Math.random() * 2 * Math.PI;
      const r = 20 + Math.random() * 80;
 
      dot.style.left = (cx + Math.cos(angle2) * 10) + 'px';
      dot.style.top = (cy + Math.sin(angle2) * 10) + 'px';
      dot.style.background = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
      dot.style.setProperty('--tx', (Math.cos(angle2) * r) + 'px');
      dot.style.setProperty('--ty', (Math.sin(angle2) * r) + 'px');
      dot.style.animationDuration = (0.35 + Math.random() * 0.4) + 's';
      dot.style.animationDelay = (Math.random() * 0.1) + 's';
 
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 900);
    }
  }
}
