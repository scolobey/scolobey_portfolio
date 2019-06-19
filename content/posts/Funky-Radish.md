---
title: Funky Radish
date: "2019-06-12T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/funky_radish/"
category: "Development"
tags:
  - "Design"
  - "Javascript"
  - "Development"
description: "What happens when you design a recipe app for real cooks?"
---

As a former chef with now about 5 years working to build and design recipe apps, I have a complaint. Every recipe app I've ever tried, and I've tried a lot of them, has been designed with the clear intention of making people click.

It makes sense. Engagement in the digital recipe world is fueled by imagery. Some users do place more importance on the quality of the recipe itself than on the media content it comes with. But the signal those users send is often drowned out by that of the users who just wanna get their food porn fix and be on their merry way.

Funky Radish is a recipe app for real cooks. It is designed not as a media delivery system, but as a culinary tool. The goal is to remove any distraction from the act of cooking itself. It allows you to find recipes and store them in a save and accessible place indefinitely. Where other recipe apps are mostly attempts at recreating the success of the food network in a digital format, Funky Radish only seeks to replace the tattered and stained recipe notebook in your kitchen junk drawer with something that is clean and always available.

## Implementation

I started with a node backend. Just a basic recipe object, belonging to a user.

One of the bigger challenges I ran into was authentication. Having never managed authentication across platforms before, I had a lot of learning to do. Making matters a little more complicated, I elected to avoid relying on packages. While open source solutions are usually the safer bet when it comes to authentication, I wanted something simple, and I wanted to understand what was going on under the hood.

Once the API was complete with some basic testing in place, I moved into developing an Android interface. I had never worked with Android before, so progress was slow at first. I found Kotlin to be a pleasant language though, and was able to cobble together a basic interface in a couple of weeks.

I then moved on to the IOS app. Though I had worked with Objective-C a little in the past, I decided to build in Swift, and did not regret it.

So, with two apps complete, I wanted to build a web interface to complete the platform. I had worked with React in the past a little, but found it to be a little frustrating. Still, it's only gaining popularity and the tools and documentation keep improving. I also knew that I wanted a reactive experience and when I've experimented with other frameworks, including Angular, Marko and even a library that a friend rolled up on his own, I found some of the same frustrations I had encountered with React. So I started playing with some basic components and soon found the files taking on more weight. When I finally accepted redux, and tuned my file structure, I found that it became as straightforward to implement major features as I had encountered using Ruby on Rails in the past, but with better performance and more versatility in the experience I could deliver. I'm definitely sold on React at this point, at least for the time being.

## What next?

The completion and initial release of the basic MVP for this project represents a major personal milestone. This project has been a goal of mine for years, and only within the past year have I gained the skills required to follow through.

But I do want to improve the system. While I find the app to be personally useful, it will take some iteration to make it attractive and useful for those who don't readily see the value of a simplified recipe storage system.

I think the first step is an overall image uplift. I need downloads to begin assessing the experience, and those downloads have been hard to come by. So I intend to put some focus into marketing and improving the mobile store listings to improve conversion.

An internal recipe database is a major draw for most users. If there's nothing to search for, the app is useless to most cooks. So a focus on improving the consumption portion of the experience is in order. I'd like to start by generating a database of quality recipes. Then I'll move into refining the search experience. But I don't want to allow access to recipes without a monetization plan in place. I have a theory that users can be convinced to pay for digital recipes if the experience is smooth enough.

An internal database will be a major help to online marketing efforts. At the moment, the site has no search engine footprint, because it doesn't offer any content.

Regardless of result, piecing together a complete platform from the ground up has been infinitely valuable. My entire understanding of software development has evolved greatly through the process, and I have the confidence to build increasingly complex systems.
