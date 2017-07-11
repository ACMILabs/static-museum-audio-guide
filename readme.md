# Static Museum Audio Guide

A [Jekyll](http://jekyllrb.com/) static site generator theme for building lightweight audio tours for exhibitions or museums.

## Kiosk branch

This is a branch of the Static Museum Audio Guide that replaces absolute URLs with relative URLs, specifying a direct .html file. Certain Kiosk app software (such as [Kiosk Pro](http://www.kioskproapp.com/)) requires this, and it means that without adding a URL rewrite at the server level, `index.html` files will be served directly. If you're not intending on running the audio guide from a Kiosk app, use the Master branch instead.

## Overview

This template is built on top of the [Jekyll new](https://github.com/jglovier/jekyll-new) theme by [Joel Glovier](http://joelglovier.com/). While it is reusable in its current form, it was purpose built for the Scorsese Exhibition at ACMI. Take a look at a live version, and view the [Scorsese Audio Guide](https://guides.acmi.net.au/scorsese/welcome). For a demo of this version, take a look at the Github pages hosted demo: http://acmilabs.github.io/static-museum-audio-guide/welcome/

Some image editing / Photoshop skills will be required to build a finished guide. Parts of the theme (such as the welcome page) are just plain old HTML and will need to be customised for your guide.

The audio guide features the following main pages:

- `/welcome` - an onboarding page, using Slick JS to get users started with the audio guide.
- `/` - a menu with headphone icons to begin using the guide.
- `/stops/1` - an individual audio guide stop, with slide-down menu, hero images in a carousel, and fixed footer audio player.

The guide will work best with 128kbps 16-bit 44.1khz MP3 files.

There is also a simple page at `/connected` as a landing page if you are using Captive Network WiFi pages. Redirect post login pages to this page, and the anchor tags with `target="_system"` should make the links open in Safari on iOS devices.

## Getting Started

1. Follow the instructions on the [Jekyll](http://jekyllrb.com/) site to install Jekyll static site generator on your local dev machine.
2. Clone this repo and run `jekyll serve`, to see a sample version of the web app.
3. In the `stops` directory, create numbered markdown files for all the stops in your audio guide.
4. Each audio guide stop is just a page in Jekyll terms, using a layout called `episode`.
5. Meta-data should be added to the top of each audio guide stop as follows:
  - `layout` - this should be set to `episode`
  - `permalink` - the default structure is `/stops/1` (replace the number with the desired permalink)
  - `type` - set this to `stop` - type is used for generating the slide down menus
  - `section_title` - this appears at the top of each stop page
  - `title` - this is a sub-heading, but is typically the name of the actual object in the exhibition, and is used as the title of the page.
  - `page_rank` - this is used to order the stops in the menu and slide-down menu
  - `stop_id` - if you wanted, you could give the stop a different ID number to its page rank, but you should probably keep it the same as the permalink and page_rank.
  - `audio_file` - just the filename and extension of the MP3 file to play
  - `hero_images` - an array of `path` and `alt_text` values for the hero image on the audio guide stop page. Multiple images will appear in an image carousel (using Slick JS). The `path` should just be the image filename and extension. The folder location is set in the main site settings `config.yml`. Good image settings for this are 512 x 341 pixels (1.5:1 aspect ratio) JPEG at 50 - 60% compression.
6. Update `config.yml` with settings for your particular guide. You can use the default settings, but be sure to update the `title`, `description`, `url` and `twitter` usernames for your site. If you want to change the folder structure for the MP3s or hero images, you can do that here.
7. Create a new logo and save it over `/assets/img/logo/audio-guide.png`.
8. Replace the footer logo and link with your own organisation or partner logos in `_includes/footer.html`.
9. Update `/assets/img/meta/og-image.jpg` with an image you'd like to have appear when the site is shared on social media. (This is used for Open Graph tags, pulled by Facebook and other sites).
10. To change colour scheme, update the variable `$brand-color` in `css/main.scss` with your main colour. Most of the other colours in the web app will be calculated from this one.
11. Add Font import or @font-face statements to `_sass/_fonts.scss` and update `$base-font-family` in `_css/main.scss` to swap fonts.
12. Once you're happy with your content and have updated all styling and branding above, launch your site locally with `jekyll serve` at the command line. Navigate to a stop in the audio tour and take screenshots at mobile resolution.
13. Update the images in `assets/img/welcome` with these screenshots from your own web app.
14. In `_layouts/welcome/html` update the mark-up of the welcome pages to give an overview to your web app.
15. Once you're happy with your audio guide, drop in your own Google Analytics or Google Tag Manager snippet into `_includes/tagmanager.html`.

Each time you update the JS or CSS files, you may wish to update `version_number` in `config.yml`. This is appended a query string to the CSS link and JS script tag in the Head element for [cache busting](https://css-tricks.com/strategies-for-cache-busting-css/).

## Deployment

Since this is just a straightforward Jekyll site, you can deploy it straight to Github pages. Follow the instructions here: https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/

If using Firebase, set the site directory as '_site' and be sure to run `jekyll build` before pushing the site to Firebase.

If using TeamCity and Octopus for running builds and deployments, a `.nuspec` file is included here, to specify the `_site` folder as the contents of the package.

## Modifications and reused code snippets

This site includes `markdown.rb` in the _plugins folder, by Tomotaka Sakuma. The gist on Github is located here: https://gist.github.com/tmtk75/1408402. We found out about it from this post: http://wolfslittlestore.be/2013/10/rendering-markdown-in-jekyll/

The above snippet allows you to easily use markdown includes in the site, however it breaks support for Github pages, so we've removed useage from this repo. In the index.html page for example, you could use `{% markdown overview.md %}` to include the markdown text in `overview.md` without having to write HTML. The on boarding pages could also be refactored to use this.

When the site is added to the homescreen on iOS, we use a code snippet from [iosweblinks](https://github.com/stylr/iosweblinks) (original author [Kyle Barrow](https://gist.github.com/kylebarrow/1042026)) to get links to remain in the web app view rather than opening up Safari.

To check whether or not to make the player fixed position to the bottom of the screen, we borrow the `$.support.fixedPosition` check from jQuery mobile, which doesn't do a true check of the feature, but eliminates known browsers that have issues with that CSS property. This enables fallback to an in-flow position for the player, which makes it sit at the very bottom of the page. We've placed a minimal version of the check in the head of the page, but the full jQuery mobile snippet is here: https://github.com/jquery/jquery-mobile/blob/master/js/support.js

## Included JS libraries

Most of the web app (aside from audio!) works without JavaScript, and we've tried to keep to a progressive enhancement approach as much as possible. The following JS libraries have been included here, each is covered by their own MIT license also in the repo. If you're extending this project, you may wish to switch to CDN copies, or concatenate and minify your libraries.

1. [jQuery (v1.12.3)](https://jquery.com/)
2. [Slick JS (v1.6.0)](http://kenwheeler.github.io/slick/)
3. [jPlayer (v2.9.2)](http://jplayer.org/)

In this repo, we've chosen to keep these libraries as local assets so that running `jekyll serve` or `jekyll build` from the command-line is as simple as possible. However, you may wish to switch to loading these libraries from a [package library](https://www.npmjs.com/) instead.

## More Info

Read the [ACMI Labs](https://labs.acmi.net.au/) blog posts covering this project:

1. [Making the free audio guide for Scorsese](https://labs.acmi.net.au/making-the-free-audio-guide-for-scorsese-3cf5398e5658#)
2. [An open source museum audio guide](https://labs.acmi.net.au/an-open-source-static-museum-audio-guide-4c5cd83dbdcb#)

## Other people using this project

If you've built something using this audio guide template, [let us know](https://twitter.com/ACMILabs) and we'll add your project to this list.

1. [Vila Itororó](https://vilaitororo.github.io/bemvindos/) in [São Paulo, Brazil](http://vilaitororo.org.br/) (the tour is in Portuguese). Read [Christophe Buffet's](https://twitter.com/cpjfb) [technical post](https://medium.com/@cpjfb/scorsese-now-has-a-brazilian-clone-adee0a8089a8) on forking the audio guide repo.
2. [Lustre exhibition audio guide](http://lustre.guide/) for the [Lustre](https://museumvictoria.com.au/immigrationmuseum/whats-on/lustre/) exhibition at the [Immigration Museum](https://museumvictoria.com.au/immigrationmuseum/), part of [Museum Victoria](https://museumvictoria.com.au/) in Melbourne, Australia.
3. [A Perfect Chemistry: Photographs by Hill & Adamson](https://audio.nationalgalleries.org/), an [audio tour](https://audio.nationalgalleries.org/hill-and-adamson/index.html) for the [exhibition](https://www.nationalgalleries.org/exhibition/perfect-chemistry-photographs-hill-and-adamson) at [National Galleries of Scotland](https://www.nationalgalleries.org/).
4. [Voces en Off](https://macpanama.github.io/bienvenidos/) an audio project (in Spanish) for the exhibition [Voces en Off: Artistas Mujeres en la Colección Permanente del Mac](http://www.macpanama.org/exhibiciones/2017/voces_en_off.html) at [Museo de Arte Contemporáneo de Panamá, MAC Panamá](http://www.macpanama.org/)

## License

The Static Museum Audio Guide theme is released under the terms of the MIT license. Included JS libraries are covered by their own licenses, included in this repo.