---
title: Mobile Recipe Sharing
date: "2019-06-26T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/mobile-recipe-sharing/"
category: "UX"
tags:
  - "Design"
  - "UX"
  - "Development"
  - "Mobile"
description: "Documenting my process in developing a recipe sharing UX for the Funky Radish recipe app."
---

I'm a little stuck right now. I built and released a recipe app on 3 platforms. But I don't know where to go next. The app is basic. It's ready for a new feature. But I wanna pick the right one.

A key motivation in developing this app is the complexity of other recipe apps. I want my recipes, in my pocket, easy to find. I solved that problem for myself. As far as I'm concerned, the worst thing I can do right now is add a feature that impinges on that function.

A feature I've been thinking about for years is recipe sharing. It's the natural progression. You bring a dish to a pot luck and you start to get those requests, "oooh, what's the recipe". Or, more relevant to my world, you work in a restaurant and you need the recipe for the vinaigrette or the marinade or the sauce or whatever. But the problem is the same. How do we get a recipe from one pocket to another?

This is particularly interesting because it's one of those natural processes that may actually be improved by an app. Without an app I can write down a recipe in a notebook. I can then just hand it to a friend to copy. It's not the worst experience. Maybe I even have it typed up somewhere and I can email it to you. Again, not awkward, or confusing, or uncomfortable.

But there's value to be had in being able to share a recipe via a native mobile app. It's easier than copying it manually at least. It may even be a little easier than an email if the flow is intuitive and simple enough. There's also the advantage of knowing where to find a recipe once it's been shared. You don't really share a recipe for immediate access. You share it, and it's used months, years, even decades down the road. You might forget what random folder of what file sharing service you stored that document in.

So how do we do this? Bottom line, it needs to be easy. We need minimal clicks and the simplest possible flow.

Find recipe > share recipe > find recipient or recipients > send

Let's start at the main view.

<img src="/media/fr_main_screen.jpg" height="350" />

Where do we put the button? I don't want to clutter the view and I don't want extra clicks. I do want advanced users to send recipes back and forth to each other. It may be a little crazy, but I already know I'm leaning towards a long-click for this.
