---
title: HTTPS is a Suck
date: "2019-07-05T23:46:37.121Z"
template: "post"
draft: true
slug: "/posts/https_is_a_suck/"
category: "Development"
tags:
  - "Development"
  - "Hosting"
description: "Just... Why? Why does this need to be so difficult?"
---

So awhile back, Google decided that it was going to incentivize the adoption of HTTPS by providing a minor SEO bump to sites that enabled https. That's all well and good. Theoretically, HTTPS provides a significant security increase over HTTP. I say "Theoretically," because we're talking about the internet and reality, and ultimately, nobody really knows anything about either, so we're doubly screwed.

At any rate, HTTPS appears to be the right choice for your users, and the right choice for Google, so you better get on that. It's just that, I wish Google found a way to incentivize making it easier to enable HTTPS. It's not easy. In fact, it's confusing as hell.

#What is HTTPS?
We really have to start with HTTP. You may or may not have a passable understanding of the matter. Either way, keep reading, you might learn something kid. If you're super smart, you can just read fast so I can waste less of your time.

HTTP. It stands for Hyper Text Transfer Protocol. It's a protocol describing how computers can talk to each other. Not exactly a language, just guidelines for how computers should talk to each other. It's almost difficult to draw a line between the internet and HTTP. The internet is a bunch of computers talking to each other. HTTP is the protocol that describes how this should be done.

#What's Wrong With HTTP?
So we have a protocol we can all agree on. Web sites are developed. Browsers are built. Your little digital dooohickey connects to the world wide web and starts babbling away. But there's a problem. A pretty big problem actually.

See, when they developed the internet (Al Gore and Tim Berners Lee) they kinda left out the security part. So, everyone can see this conversation that takes place between your doohickey and the internet. The NSA can see it. Your ISP can see it. The dirty hacker kid next door playing around with the wifi sniffer can see it.

And sometimes there's sensitive information in that conversation. I mean, most people use the same password for every dumb online service they access on a daily basis and the same key code for every bank account they control.

Think about it. If I could sift through the conversations your computer is having with other computers, do you think I might be able to pull out some useful information? Do you think, maybe, I might find your pin code? Are you sure your computer has never talked about your pin code with another computer?

#HTTPS
And so, there's HTTPS. If you're anything like me, and slightly dumb, you don't really get it yet.

Please keep these 2 things in mind as you progress here, so that you don't feel badly about yourself.

- The inventors of this stuff, who also happen to be the inventors of the internet, called this system Hyper Text Transfer Protocol. That is a dumb name. It is absolutely needlessly confusing and pretentious.  

- The people who then realized there was a major flaw in the system that made it so that you couldn't even do things that today seem like incredibly obvious uses of the internet (banking, purchasing, watching porn) without revealing important information that could be used to blackmail you or steal large amounts of money from you? Yeah, they kept the same name. Except, they added an 'S' at the end, which stands for security. That's stupid. That is... So stupid. And what's more, it doesn't totally work.

So we've established that the founders of the internet were at least a little short-sighted and your a fucking genius in comparison. Let's see if we can't dig through their idiocy to understand the current state.

#What is HTTPS
When your computer sends a message to another computer, it might be a good idea to hide that message from other random Joe's on the internet. 

Now, you may not be fully aware, but it's actually pretty easy (if not totally legal) to crack into your wifi network and watch everything that you do online. You should read through [this article](https://www.howtogeek.com/181767/htg-explains-what-is-https-and-why-should-i-care/) just to get a rough idea of what I mean.
