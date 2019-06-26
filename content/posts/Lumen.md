---
title: Add a gallery Page to Gatsby Lumen
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

I want to add a gallery page to my Gatsby site. The site is based on the [Lumen starter project](https://github.com/alxshelepenok/gatsby-starter-lumen). I found it pretty easy to get started with Gatsby using this template. I picked Lumen because it seemed simple, looks good on mobile, and looks to be well tested, etc. Fair Warning: This article is probably not going to be incredibly useful unless you're using the Lumen project, or a similar Gatsby template project. If you want to get the project going, just follow the directions at the git link above.

I'll set our first anchor point as a string of static text rendered at the '/gallery' route. In the Lumen project, open the file located at '/gatsby/create-pages.js'. This file relies on a function that creates pages. The function accepts an object with two keys as an argument. Those two keys are 'path' and 'component'.

Let's add a call to the createPage function that creates the '/gallery' route and links it to a template that we'll create next. I added the following code around line 30 in create-pages.js.

~~~~
// Gallery
createPage({
  path: '/gallery',
  component: path.resolve('./src/templates/gallery-template.js')
});
~~~~

Now we'll add that template. Create a file called 'gallery-template.js' in the '/src/templates/' directory as referenced in the code snippet above. A little context here on my logic, I copied another template file from the same folder which is called 'category-list-template.js' and pasted it into the newly created 'gallery-template.js' file. This was just a quick way to get things going and enforce the maintenance of existing code structures. With this code in place, I just pared the file down to what I needed. The resulting file looks like this. You can just compy and paste this code into the 'gallery-template' file.

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

You should now be able to refresh the browser and access your gallery page at the '/gallery' route. Might as well shut down your server and reload though anyway, just in case. On my machine I've been having trouble with hot reloading when working with node lately.

For our next goal, I want to link to my new page from the sidebar so that visitors can click on it and check out some of the images I've created. This is very simple, but maybe a little confusing if you're new to Gatsby or any of this stuff.

In the root directory of your project, you should find a file called 'config.js'. Pop that sucker opened. It exports a json object that models some properties for your site's configuration. The object contains a 'menu' key. If you don't see it, just cmd+f for 'menu'. The menu key references an array of objects with both a path and a label. Add the following lines to the menu array. If, by chance, you've come this far without learning about arrays, [check this out](https://www.w3schools.com/js/js_arrays.asp). Otherwise, add the following code to the 'menu' array.

~~~~
,
{
  label: 'Gallery',
  path: '/gallery'
}
~~~~

Now shut down the server once more and restart with 'gatsby develop'. Changes to config.js are not covered in hot reload because this is a core configuration file. Do a full restart for your changes to take effect. You should be able to click the "gallery" link in the sidebar now and see your new page.

#How to handle images with Gatsby.

The next anchor point I'll set here is to display images. From what I understand, there are some major optimizations to be made in image serving with Gatsby. For now I just want results, so I'll go for a more naive implementation.

I'll collect a handful of images of various dimensions and file sizes that I want to show off and I'll copy them right into the project in the '/static/media' directory. Having done that I can use a standard <img> html tag to display them. One caveat here is that when displaying images, the system apparently assumes the '/static' directory as the root, so the correct <img> reference looks like this.

~~~~
<img src="/media/{name of your image file}" alt="{your text}" />
~~~~

In my case, the name of one of the file I'm working with in my media directory is 'sunset.png', so I can display that image by replacing the placeholder text I put between the <Page> tags in my gallery-template.js file with an <img> tag, like so.

~~~~
<Page title="Gallery">
  <img src="/media/sunset.png" alt="Sunset" />
</Page>
~~~~

So maybe not the most performant option, and it doesn't look great, but when I go to the '/gallery' route, I see my images.

![Scolobey portfolio blog gallery using Gatsby and Lumen.](/media/gallery.gif "This is what it looked like when I added a simple gallery to my Gatsby Lumen blog.")

Next anchor point on this climb? I want fix the layout so that those images look a little nicer, even on mobile. But that's a job for another day.
