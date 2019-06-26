---
title: Mountains and sunsets
date: "2019-05-13T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/mountains_and_sunsets/"
category: "Design"
tags:
  - "Design"
  - "Javascript"
  - "Topology"
  - "Algorithms"
  - "SVG"
description: "Mesh images. So hot right now."
---

Having recently moved to Denver, CO. and also being rather preoccupied with art and design these days, I find myself acutely aware of a Denver-specific aesthetic. Looking back on San Francisco I can recognize some themes (mostly the golden gate bridge) but we lived there long enough that these themes have mostly dissolved into the background of my memories.

One of the biggest surprises of our recent move has been this little adjustment to the local style. Graffiti is huge here. There's a digital design vein that seems to run through everything. Some of the wall art would appear just as natural as a web background as it is on the side of a building.

But the main theme here (at least the one that most stands out for me) is nature. Mountains and sunsets in particular. There's almost like a city-wide challenge to put your own spin on the concept of a sun setting over a mountain range.

We went back to California for a wedding. This graphic was hanging in the kitchen of our Airbnb.

<img src="/media/petaluma_graphic.jpg" width="250" />

Kinda a weird image, and hung awkwardly between two windows. But it caught my eye. I had been bombarded with these images of sunsets and mountain ranges for the past month or so and I was thinking about it a lot.

And the geometry of it already suggests vector graphics. It wouldn't be hard to program the image manually, a circle, lines, some gradients. Pretty obvious that this concept would lend itself readily to digital interpretation.

So I made this . . .

![Sunset over the rockies.](/media/sunset.png "Simple SVG design - Sunset over the rockies.")

A simple image, I built the entire thing from code as an SVG. And I even liked the results enough to use them as a header on my portfolio site here. But I had a more complicated concept in mind.

I see a pattern a lot these days of interlocking triangles of varying tone, often arranged to form an image. It's probably one of the most popular design elements for web backgrounds right now for some reason. I can see why though. The results are kinda interesting and the angularity translates well to digital media.

Something interesting about the image of a mountain range. It doesn't look like much. Just points and shadows arranged in a random pattern. So I've been thinking of using this concept of the tonal triangles to render a mountain scape.

Being that I don't like things to be too terribly simple, I started to wonder if I could generate the entire image from code. I was curious whether I could seed an image with random points and apply certain parameters to allow it to look like a mountain range. I went a little deep here.

#First step. Render some random points.

I'm playing with this site right now, so I might as well just render it right here. I'm using Gatsby which is essentially a static site generator built on React. It's a little bit of an odd concept, seeing as how React is really designed to be anything but static. And the name is super lame. Still, I find it interesting and here's why. Gatsby is a little like Ruby on Rails. If you stay on the rails, you can build a relatively reliable static site.

But it's faster than Rails. So there's that first big selling point. But there's another point I wanna make. Being based on React in the first place, Gatsby is capable of doing what React can do, it's just a little harder to get to it.

That's Gatsby. It's React but it'll still get you to the store and back. Still, React is there if you need it. You might end up solving some complicated problems in ways that would be easier if you just started with React in the first place, but the simpler problems are made even simpler.

![Points in a field.](/media/points.png "Simple SVG design - Plotting points in a field.")


#Getting deeper. How do you connect the dots?

Where do we go from here? I need to find a suitable algorithm for determining which points to connect. As it turns out, this is a big thing. I came across [this library](https://github.com/mapbox/delaunator). The primary function of this library is to accept an array of coordinates and return an array of triangles. Seems simple enough to load the library, feed it my list of random points, and inspect the output.

Here I ran into a little trouble. The demo implementations from the readme didn't really seem to work right out of the bag. I tried the classic 'Google the error messages' solution and wasn't making much progress. But I found that there are a number of delaunay packages available. Delaunator claims the highest performance, but some of the other libraries appear simpler and performance is not very impressive if you can't load the package. So I moved down the list.

Ultimately, this just led me into a vast world of geometric algorithms.

#Primitives for the Manipulation of General Subdivisions and the Computation of Voronoi Diagrams

That's the title of the academic paper I found. If there's one reason advanced learning didn't work for me, it's titles like that. Really!? You couldn't figure out a way to convey more information in fewer words? If that's your title, I know I'm in for a thrilling read.

And yes, it was a [massively thrilling 50 pages](http://www.sccg.sk/~samuelcik/dgs/quad_edge.pdf) of mathematical bliss. Thanks Guibas and Stolfi.

A lot of the paper deals with [topology](https://en.wikipedia.org/wiki/Topology), which is basically the study of the mathematical properties of distorted shapes. It's fascinating, and has far-reaching applications, but it's confusing as hell and employs a lot of words that seem familiar but they mean something entirely foreign in a topological context. After wading through 32 pages of confusion, I found this.

![Voronoi and Delaunay diagrams.](/media/voronoi_delaunay.png "A voronoi overlayed on a delaunay, illustrating their relationship.")

This is an illustration of the relationship between a [voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) and a [delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation), and it depicts concepts that are right at the heart of what I'm after.

What you see there is a random spread of points on a plane. Surrounding each point is a region where that point is the nearest point to any given location in the region. The solid line in the diagram represents the boundary of that region. So, at any given point on the solid line, you're at an equal distance from the nearest of those random points marked on the diagram. That's the voronoi diagram.

Now, each pair of points that share an edge on the voronoi diagram is connected by a broken line. That's the delaunay triangulation.

This is a start, and it does offer a little context in regards to understanding how I might be able to construct an algorithm to convert these geometric concepts into a diagram.
