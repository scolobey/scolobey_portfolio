---
title: Mountains and sunsets
date: "2019-06-13T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/mountains_and_sunsets/"
category: "Design"
tags:
  - "Design"
  - "Javascript"
  - "SVG"
description: "Mesh images. So hot right now."
---

Having recently moved to Denver, CO. and also being rather preoccupied with art and design these days, I find myself acutely aware of a Denver-specific aesthetic. Looking back on San Francisco, I can recognize some themes (mostly the golden gate bridge) but we lived there long enough that these themes had mostly sunk into the background. This is one of the biggest surprises of our recent move. Denver has a different style. Graffiti is huge here. There's also a digital design thread that seems to run through. Some of the wall art I've come across would be seem just as natural as a web background as it is on the side of a building.

But the main theme here, at least the one that most stands out for me, is nature. Mountains and sunsets in particular. There's almost a city-wide challenge to put your own spin on the concept of a sun setting behind the rockies.

We went back to California for a wedding. This graphic was hanging in the kitchen of our Airbnb. I had been bombarded with these images and I was already beginning to toy with the concept on my own, so this image stood out as an interesting interpretation.

The geometry of it kinda already suggests vector graphics. It wouldn't be hard to program the image manually, just a circle, lines and some gradients. Pretty obvious that this concept would lend itself readily to digital.

![Sunset over the rockies.](/media/sunset.png "Simple SVG design - Sunset over the rockies.")

A simple image, I built the entire thing from code as an SVG. I liked the results enough to use them as a header on my portfolio site here.

But I had a more complicated concept on my mind. I see this pattern a lot these days. Interlocking triangles of varying tone, arranged to form an image. It might actually be the single most popular design element of the last decade. I can see why though. The results are kinda interesting and the angularity translates really well to digital media.

Something interesting about the image of a mountain range. It doesn't look like much. Just points and shadows arranged in a seemingly random pattern. So I've been thinking a lot lately of using this concept of the tonal triangles to render a mountain scape.

Being that I don't like to do things too terribly simple, I began to wonder if I could generate the entire image from code. I was curious whether I could seed an image with random points and apply certain parameters to allow it to look like a mountain range.

##Step 1

#First I need to render a mesh of interlocking triangles.

I'm playing with this site right now, so I might as well just render it right here. I'm using Gatsby which is essentially a static site generator built on React. It's a little bit of an odd concept, seeing as how React is really designed to be anything but static. And the name is super lame. Still, I find it interesting, and here's why. Gatsby is something like Ruby on Rails. If you stay on the rails, you can build a relatively reliable static site. But, it's faster than Rails. So there's the first big selling point. But there's another point I wanna make. Being based on React in the first place, Gatsby is capable of doing what React can do. Imagine a Ferrari. I'm not a huge Ferrari fan, but it really fits this analogy well. Now, imagine you ant to drive it to the store for groceries. Well, you can't. It's just not practical. Now imagine you have a great Italian mechanic (Ha!) and he comes over and he a says-uh to you-uh, "Hey guy, I can-uh fix-uh you problem". Alright, whatever, have at it. He clunks around for awhile and brings you back your Ferrari, but it's not a Ferrari anymore, it's an extremely reliable commuter vehicle with lots of cargo space. Now, don't get me wrong, all of the Ferrari is still there underneath, it's just a little harder to get to it.

That's Gatsby. It's React, but it'll get you to the store and back. Still, React is there if you need it. You might end up solving some complicated problems in ways that would be easier if you just started with React in the first place, but the simpler problems are made even simpler.

So I ran into a little of that. Because I'm using Gatsby, right. But I just want to use React. and it gets a little weird and confusing when you try to render a regular React component in Gatsby.

My first sorta anchor point on this climb was a plot of random points. I figured it was simple enough to start. I could generate random coordinates, then set up an SVG of given dimensions and iterate. Turns out it was pretty simple. The hard part was figuring out how to get a React component to work correctly in Gatsby.

![Points in a field.](/media/points.png "Simple SVG design - Plotting points in a field.")

Where do we go from here? The trick is to find a suitable algorithm for determining which points to connect. Doing a little research, I came across [this library](https://github.com/mapbox/delaunator). The primary function of this library is to accept an array of coordinates and return an array of triangles. So the next anchor point here is to load the library, feed it my list of random points, and inspect the output.

Screwing around with the delaunator library, I ran into a little trouble. Demo implementations didn't really seem to work right out of the bag. I tried the classic 'Google the error messages' solution and wasn't making much progress. But I found that there are a number of delaunay packages available. Delaunator claims the highest performance, but some of the other libraries appear simpler, and performance is not very impressive if you can't load the package. So I moved down the list.

Ultimately, this led me into a vast world of geometric algorithms.

#Primitives for the Manipulation of General Subdivisions and the Computation of Voronoi Diagrams

If there's one reason advanced learning didn't work for me, it's titles like that. Really!? You couldn't figure out a way to convey more information in fewer words? If that's your title, I know I'm in for a thrilling read.

Yes, it was a (massively thrilling 50 pages)[http://www.sccg.sk/~samuelcik/dgs/quad_edge.pdf] by Guibas and Stolfi. Let's see if we can boil it down into a few paragraphs.

Imagine you have a bunch of random points on a graph. Surrounding each point is a region where that point is the nearest point to a given location in the region. If you were to draw that region for each point on the graph, you would have what is known as a (voronoi diagram)[https://en.wikipedia.org/wiki/Voronoi_diagram].

On occasion I get sucked into overly academic things. I'm not really proud to say that I don't much believe in academics. I believe that a universe is shaped by it's own beliefs, and the academic universe fits that bill well. Behaviors are incentivized that benefit the academic universe internally at the expense of the reality which envelops it. That is, I believe that a lot of scientists enjoy flattering themselves with the idea that the pursuits of science are most purely noble. I feel uncomfortable with the regularity with which science manages to promote pharmaceuticals over herbal medicine. I don't believe wholly in any one view of reality, particularly those which claim to be the only true answer. There is merit in the use of logic, deduction and evidence to solve problems. This does not inherently validate the actions and beliefs of all beings and institutions who espouse these ideas.

But I am biased, in that I flunked out of college. Something about humans is that they tend to paint themselves the hero in their own story. While I don't see anything heroic in flunking out of college, I don't see it as a failure.

I transferred to a campus that I didn't particularly like. I had already taken the classes I was interested in. I wanted to build things and after several years of study, I was only getting further from that goal. I didn't want to go to school bad enough to pay for it anymore, and debt never made sense in my world. So, I started cooking instead.

Guibas and Stolfi promise some efficient algorithms for resolving a voronoi diagram. Personally, on initial analysis, there is no simple concept that readily comes to mind in committing this to computational logic. It's simple enough to calculate the distance between 2 points and divide that in half. I imagine, in pursuing a solution independently, it would be based on first resolving voronoi diagrams for each potential set of two points independently, and then somehow prioritizing the intersections of these lines. But that is conceivably a computationally intense solution. While the Guibas and Stolfi work is a little outdated, and more recent solutions are available, it seems a reasonable starting point. Not to mention, I'm a little curious to see how solutions may have evolved over the years. So, let's take a look at the Guibas Stolfi solution.

The paper goes on for a numbing number of pages with a lot of words that mean one thing to the general public and something else entirely to anyone who shares their beliefs and background, but could be replaced with something very simple and universally recognizable if the goal was to communicate knowledge as opposed to perpetuating the illusion of superiority over the "uneducated".

But I digress. Oh wait, I should also mention that when I first Googled this paper, I found it on a site where they wanted to charge me 15$ to download the pdf. I'm glad I just clicked to a different site because the concept in computer science of guarding your own knowledge is as ridiculous as a chef trying to guard their own recipes.

So when they finally get back to giving you information, they explain that in order to arrive at some of their algorithms, they had to conceptually bend and warp the original planar geometry in ways that are mathematically sound. Really we're talking about a mathematical discipline called topology. This is essentially the study of the mathematical properties of shapes as they're distorted.

It's fascinating, and has far-reaching applications, but it's confusing as hell digging through all of this weird topological algebra. I was getting super lost for awhile, but on page 32 I found this.

![Voronoi and Delaunay diagrams.](/media/voronoi_delaunay.png "A voronoi overlayed on a delaunay, illustrating their relationship.")

The solid lines are the Voronoi diagram. The dashed lines are the Delaunay diagram.

Check out the solid lines. How is this thing constructed? Between each set of points, draw a line that is equidistant from both points at all points along it's body. Notably, that line is also perpendicular to the line between each set of points. Then, at each vertex, you clip the lines that are irrelevant.

And the Delaunay diagram? You just connect every pair of points that shares a Voronoi edge.
