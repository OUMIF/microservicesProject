import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'test/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ]
  } as unknown as ServerRoute,
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
