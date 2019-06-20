---
title: Lumen
date: "2019-04-19T19:46:37.121Z"
template: "post"
draft: false
slug: "/posts/lumen/"
category: "Development"
tags:
  - "Development"
  - "Blogging"
  - "Gatsby"
description: "How to add a photo gallery to the Gatsby Lumen starter project."
---

#How to add a gallery page to the Gatsby Lumen starter project.

I want to add a gallery page to my Gatsby site. The site is based on the [Lumen starter project](https://github.com/alxshelepenok/gatsby-starter-lumen). I found it pretty easy to get started with Gatsby using this template. I picked Lumen because it's fairly simple, looks good on mobile, seems pretty well tested, etc. Sorting through a new project is always a little tough, as you stumble across conventions that may not make sense without a broader understanding of the project. Fair Warning: This article is probably not going to be incredibly useful unless you're using the Lumen project, or a similar Gatsby template project.

I'll set our first anchor point as a string of static text rendered at the '/gallery' route. In the Lumen project, locate the 'create-pages.js' file in the 'gatsby' directory. This file relies on a function that creates pages. The function accepts an object with two keys: path and component. To start, I added a call to the createPage function that creates the '/gallery' route and links it to a template that we'll create next. I added the following code around line 30 in create-pages.js.

~~~~
// Gallery
createPage({
  path: '/gallery',
  component: path.resolve('./src/templates/gallery-template.js')
});
~~~~

Now to add the gallery-template.js file. As a reference, I copied another template, namely the 'category-list-template.js' and pasted it into the newly created 'gallery-template.js' file. This is just a sorta quick hack to get things going and enforce the maintenance of existing code structures. With this code in place, we just need to pare the file down to what we need. Specifically, we just want to render some text, so there's some stuff we can get rid of. The resulting file looks like this.

~~~~
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const GalleryTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Gallery - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Gallery">
        Looks like we've got a gallery here, holmes.
      </Page>
    </Layout>
  );
};

export default GalleryTemplate;
~~~~

#How to add a link to the sidebar in the Gatsby Lumen starter project.

Okay. Now you should be able to just refresh the browser and access your gallery page at the '/gallery' route. Might as well shut down your server and reload though anyway, just in case. Sometimes routing and such don't hot reload readily.

On to the next goal. I want to have a link to this page on my sidebar, so that visitors can click on it and check out some of the images I've created. This is super simple, but perhaps a little confusing if you're new to Gatsby or any of this stuff. In the root directory of your project, you should see a file called 'config.js'. Pop that sucker opened and you should find that it exports a json object that models some of the site's configuration properties. The object contains a 'menu' key. If you don't see it, just cmd+f for 'menu'. The menu key references an array of objects with both a path and a label. Add the following lines to the menu array. Gatsby can be pretty simple, so if, by chance, you've come this far without learning about arrays, [check this out](https://www.w3schools.com/js/js_arrays.asp).

~~~~
,
{
  label: 'Gallery',
  path: '/gallery'
}
~~~~

Now shut down the server once more and restart with 'gatsby develop'. Changes to config.js aren't covered in hot reload because this is a core configuration file, so you need to do a full restart.

#How to handle images with Gatsby.

The next anchor point I'll set here is to display images. From what I understand, there are some major optimizations to be made in image serving with Gatsby. But for the moment, I just want the results, so I'll go for a more naive implementation.

I'll just collect a handful of images of various dimensions and file sizes that I want to show off and I'll copy them right into the project in the '/static/media' directory. Having done that, I can use a standard <img> html tag to display them. The one caveat is that when displaying images, the system apparently assumes the '/static' directory as the root, so the correct <img> reference looks like this.

~~~~
<img src="/media/{name of your image file}" alt="{your text}" />
~~~~

In my case, the name of one of the file I'm working with in my media directory is 'sunset.png', so I would display that image by replacing the placeholder text I put between the <Page> tags in my gallery-template.js file with an <img> tag, like so.

~~~~
<Page title="Gallery">
  <img src="/media/sunset.png" alt="Sunset" />
</Page>
~~~~

So maybe not the most performant option, and it doesn't look great, but when I go to the '/gallery' route, I can see my images.

![Scolobey portfolio blog gallery using Gatsby and Lumen.](/media/gallery.gif "This is what it looked like when I added a simple gallery to my Gatsby Lumen blog.")

Next anchor point on this climb? I want fix the layout so that those images look nice, even on mobile. But that's a job that doesn't have much to do with Gatsby or Lumen, so let's jump to a new post.
