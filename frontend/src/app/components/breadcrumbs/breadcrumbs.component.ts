import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  private readonly navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).urlAfterRedirects),
    startWith(this.router.url)
  );

  private readonly currentUrl = toSignal(this.navigationEnd$, { initialValue: this.router.url });

  readonly breadcrumbs = computed(() => {
    const url = this.currentUrl();
    return this.generateBreadcrumbs(url);
  });

  constructor(private router: Router) {}

  private generateBreadcrumbs(url: string): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Home', url: '/' }
    ];

    if (url === '/' || url === '') {
      return breadcrumbs;
    }

    const segments = url.split('/').filter(segment => segment);
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = this.formatLabel(segment);
      breadcrumbs.push({
        label,
        url: currentPath
      });
    });

    return breadcrumbs;
  }

  private formatLabel(segment: string): string {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
