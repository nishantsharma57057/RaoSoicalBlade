# Rao Social Blade design assets

The website uses the original Rao Social Blade logo from the user-provided website. The source PNG is preserved without changing its artwork. Its transparent margins are excluded by the SVG display viewBox.

- Original logo: `/workspace/sites/logical-india-studio/public/rao-logo.png`
- Custom 3D campaign artwork: `/workspace/sites/logical-india-studio/public/campaign-3d-v2.png`
- Generation method: built-in ImageGen, with a transparent background.
- Presentation: gentle floating motion and pointer tilt; reduced-motion preferences disable both effects.

## Final generation prompt

Use case: stylized-concept. Asset type: premium digital marketing agency website hero artwork. Create one extraordinary, photorealistic high-end 3D sculpture that represents bold digital campaigns and brand amplification. Main subject: a large sculptural megaphone angled dynamically upward to the right, made of glossy royal blue #155DFC outer shell, white enamel and polished chrome accents, with a deep royal blue circular speaker opening facing front-left. Surround it with a curved thick upward arrow in royal blue, two small floating silver spheres, a tiny glossy blue heart notification tile, and a translucent frosted glass orbit ring. A compelling visually cohesive composition, asymmetrical, substantial shapes, rich believable depth, reflections and soft ambient occlusion, crisp premium studio lighting, like an art-directed Cinema4D / Octane brand campaign render. Restrained materials, entirely royal blue, white and silver; no purple, no lime green. All objects fully visible with generous breathing room on each edge, square composition. Transparent background and natural subtle contact shadows as translucent pixels. No lettering, no logos, no numbers, no dashboards, no people, no website mockup, no watermark. This is an illustration for a creative marketing agency, not an infographic.

## Reference layout assets

The user explicitly requested the Digtek reference design. The updated landing page adapts its composition, typography, cutout campaign imagery, paired moving text bands and section styling to Rao Social Blade’s royal blue and white identity. Portraits are campaign visuals, not claims about Rao Social Blade team members. Template reviews and performance statistics are not used.

Reference: https://digtek-react.vercel.app/

| Local asset | Reference source |
| --- | --- |
| public/reference-hero-model.png | /assets/img/hero/hero-image.png |
| public/reference-megaphone.png | /assets/img/hero/mike-shape.png |
| public/reference-rocket.png | /assets/img/hero/rocket.png |
| public/reference-bolt.png | /assets/img/hero/energy-shape.png |
| public/reference-about-model.png | /assets/img/about/01.png |
| public/reference-service-marketing.png | /assets/img/service/icon-1.png |
| public/reference-service-analytics.png | /assets/img/service/icon-2.png |
| public/reference-service-social.png | /assets/img/service/icon-3.png |
| public/reference-case-art.jpg | /assets/img/case-studies/01.jpg |

The Plus Jakarta Sans font files are self-hosted under public/fonts and were obtained from Google Fonts. The original generated campaign-3d-v2.png remains in the strategy section. All imagery and fonts used by the site are included in its source repository.

## Image completion and logo theme

The original logo image is preserved. Its existing SVG presentation now uses an alpha-composite filter in royal blue #155DFC, retaining the exact lettering, symbol and transparency in every location, including the owner inbox. Unique filter IDs prevent collisions when the logo appears twice.

Additional self-hosted campaign visuals from the user-selected Digtek reference:

| Local asset | Reference source |
| --- | --- |
| reference-case-website.jpg | /assets/img/case-studies/02.jpg |
| reference-case-brand.jpg | /assets/img/case-studies/03.jpg |
| reference-case-social.jpg | /assets/img/case-studies/04.jpg |
| reference-cta-model.png | /assets/img/cta-img.png |
| reference-marketing-visual.png | /assets/img/cta-marketing.png |
| reference-faq-visual.png | /assets/img/faq-shape.png |
| reference-about-chart.png | /assets/img/about/grap.png |
| reference-about-emoji.png | /assets/img/about/emoji.png |
| reference-hero-orbit.png | /assets/img/hero/bg-shape.png |
| reference-case-decoration.png | /assets/img/case-studies/right-shaape.png |

Photos remain illustrative campaign visuals and are not represented as staff or completed client work. Decorative reference review badges are omitted. Below-fold assets load lazily; reserved aspect ratios and responsive styling protect readable content.

## Image delivery fix and tilted ribbons

Campaign images and the original logo are embedded as data URLs through lib/site-images.json and lib/brand-image.json. Their source bytes remain in public. This removes separate authenticated image requests from the rendered landing page. Project thumbnails use explicit non-negative image, overlay and text layers.

The two text ribbons match the supplied screenshot: the white foreground ribbon slopes down to the right at +1.9 degrees, while the blue ribbon behind it slopes up at -2.8 degrees. Their vertical offset scales with viewport width to preserve the crossing position, including on mobile. Reserved vertical space and independent inner tracks preserve the text animation. Pause, hover/focus pause and reduced-motion support are preserved.
