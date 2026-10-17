document.querySelectorAll('a[href]').forEach(link => {
if (!link.getAttribute('href').startsWith('#')) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
}
});

// document.addEventListener('DOMContentLoaded', function () {
//     // Universal image zoom for all zoomable figures
//     const zoomableImages = document.querySelectorAll('img.zoomable');
    
//     if (zoomableImages.length > 0) {
//         zoomableImages.forEach(img => {
//             new Viewer(img, {
//                 inline: false,
//                 viewed() {
//                     // Load high-res version if specified
//                     const originalSrc = img.getAttribute('data-original');
//                     if (originalSrc) {
//                         this.image.src = originalSrc;
//                     }
//                 },
//                 toolbar: {
//                     zoomIn: 1,
//                     zoomOut: 1,
//                     oneToOne: 1,
//                     reset: 1,
//                     prev: 0,
//                     play: 0,
//                     next: 0,
//                     rotateLeft: 0,
//                     rotateRight: 0,
//                     flipHorizontal: 0,
//                     flipVertical: 0,
//                 },
//                 title: false,
//                 navbar: false,
//             });
//         });
//     }
// });