/* Route chunks. Calling a loader starts (or reuses) the download, so links can
   prefetch the page they lead to on hover/focus and the click opens instantly. */
export const loadCategory = () => import('../pages/Category.jsx');
export const loadViewer = () => import('../pages/Viewer.jsx');

/* Warm everything a design page needs: the viewer and the template itself. */
export function prefetchDesign(design) {
  loadViewer();
  if (design && typeof design.component === 'function') design.component();
}
