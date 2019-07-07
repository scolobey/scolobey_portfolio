---
title: SEO Friendly React Redux
date: "2019-06-30T23:46:37.121Z"
template: "post"
draft: true
slug: "/posts/introduction-to-my-recipe-api/"
category: "Development"
tags:
  - "Node"
  - "API"
description: "Documenting my efforts to make my React/redux-based recipe app more SEO friendly."
---

# What's the problem?
Search engines send their dirty little spiders to your website. The information they retrieve helps to paint a picture of your content and the structure you've applied to it. This information is used to sort and rank your content into the broader search landscape depicted by that particular search engine.

That works great for traditional web services with neatly (sometimes?) organized HTML files linked together in a clear hierarchy.  

But React is different. React is designed to render HTML dynamically. This means that a lot of the content rendered by React doesn't exist until you get to it. This is great because it allows you to interact with your data in much more interesting ways. But it tends to cause problems when Google tries to crawl your pages and it finds only partially rendered content, or nothing at all.

#What can we do?
There are several techniques you can apply to remedy this issue.

- You can ignore it.
In some cases your marketing plan doesn't depend on SEO. But if you've managed to find this article, I'm assuming that's not your case. So let's move on.

- You can apply a routing system to your project.
A standard React app doesn't include routing. Everything is served to whatever path you've plugged into. The React website lists a number of [good and dependable routing packages](https://reactjs.org/community/routing.html). Roughly speaking, these packages allow you to set up your React app to accept information from a URL and reflect that information in your content. So if you have an app hosted at 'www.happylittletrees.com' you can take advantage of one of those routing systems to render React components at various paths. For instance, you might render a list of trees at 'happylittletrees.com/trees' or you might render a specific tree at 'happylittletrees.com/tree/:treeID'.

This technique will help you apply an SEO friendly structure to your site, but it still doesn't ensure that the content will be rendered effectively when crawlers try to access that structure. The thing is, if you can solve your SEO problems using this technique alone, you might not actually have a good reason to be using React to begin with, but I'll leave that to you to struggle with.

- Render your metadata dynamically.
Web standards dictate that you label the pages you create. You might have a title and a description of your content placed directly in your HTML but this isn't always the case, and it isn't always practical.

So crawlers expect you to provide accurate metadata. Each page needs a title and some basic[https://www.w3schools.com/tags/tag_meta.asp](<meta> tags). These tags are placed within your <head> tag. Crawlers regard this information as the authoritative description of your site's content.

But React is generally configured to render into the body of your HTML. So let's say you have routing set up and you're rendering all kinds of interesting content to different routes, your <head> still doesn't change. Effectively, this makes it look like you have an app that just renders the same content at different routes. Pretty lame.

There's a package for that. It's called [helmet](https://github.com/nfl/react-helmet). As always, there are other solutions. This one is popular and very easy to use, so I haven't looked much deeper. You just install the package and import it into any component which would benefit from customized metadata. Then, you can just add the <Helmet> tag into your component and watch the magic happen. Check out the repo for details. The broad consensus is that, at least to start, you really only need a title and description. Once helmet is installed and imported into a component, you can insert something like this into your render.
```
<Helmet>
  <title>{this.props.recipe.title}</title>
  <meta name="description" content= {"Recipe for " + this.props.recipe.title + ". "} />
</Helmet>
```
In this case, my content is a recipe, so now when you load the URL for a given recipe, you get a title and description in the metadata.

- You can render your content on the server.
Here's where you really see results. We have our routes set up. We're customizing metadata to compliment the wonderful content that we're rendering to each of those routes. Server-side rendering is the next step in ensuring that crawlers can actually see that content.

Problem is, this can get ~~a little confusing~~ mega super duper confusing.

There are a lot of ways to handle Server-Side rendering (a.k.a SSR). The argument regarding [which one is the right way](https://www.reddit.com/r/reactjs/comments/7o6oj6/serverside_rendering_not_worth_it/) is contentious. Many of the top tutorials out there have become obsolete.

But it makes sense that this should be difficult. You're trying to get a tool to function smoothly in the very environment it was designed to destroy. It's wise, when you encounter this kind pattern in software development, to turn around. As usual, I have chosen to disregard the warning signs.

I did some searching and sorted through a bunch of relatively useless info to find [this](https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a).

or

[this](https://flaviocopes.com/react-server-side-rendering/)

And they both let me down.   

-Split your code.

-Enable HTTPS
In 2014 Google announced a minor bump to search rankings for sites that enable HTTPS. They did this to help promote switching to this more secure protocol. In addition to this artificial bump that supposedly still exists, enabling HTTPS makes your site more secure and more attractive to users, which should presumably have it's own long term effect on your search rankings.



#Other things you can do

- Add your crawler files.
You should be publishing both a robots.txt file and a sitemap.xml file to your site at their respective paths. That is, if you hit yourdomain.com/robots.txt or yourdomain.com/sitemap.xml you should see the right file.

Creating these files is very straightforward. Just make the files, place them directly in your public folder, and they should be reachable through your browser.

The formatting is a little technical. Take a look at [SeriousEats](seriouseats.com) for instance.

[robots.txt](https://www.seriouseats.com/robots.txt)
[sitemap.xml.txt](https://www.seriouseats.com/sitemap.xml)

The robots.txt is easy. Just replace the disallow section with any of the routes on your site that you don't want crawlers to find.

The sitemap.xml is a little more complicated. If you google 'sitemap generator' you will find plenty of options and they all work just about the same. You put in your url, and it spits out a sitemap in the proper format. But it probably won't have all of the pages you want search engines to index, so sort through it and add what's missing. [Here's a formatting guide](https://www.sitemaps.org/protocol.html).

Eventually, you'll probably want to do this dynamically so that you don't have to go in and edit your sitemap every time you create new content. There are [plenty of packages](https://www.npmjs.com/search?q=sitemap) to help with that.

#Troubleshooting
Along the way here, I also discovered some little issues that are likely more specific to my project. I'll give a brief rundown of how I discovered these issues and how I as able to sort through them.

##Discovery
Google has a great tool that allows you to get an idea of what their crawler sees when it hits the various routes on your site. I'm assuming you've already setup the Google console for your site. From the [Google Search Console](https://search.google.com/search-console), you can use the 'URL Inspection Tool' to see what Google sees when it crawls your site. Just enter your site with the desired route into the search field. When searching my domain and routes I get nothing but blank pages.

<a href="https://imgflip.com/i/34vh4k"><img src="https://i.imgflip.com/34vh4k.jpg" title="made at imgflip.com"/></a>

##Recovery
After trudging through several potential solutions with no improvement, I found [this article by @vonkunesnewton](https://medium.com/@vonkunesnewton/setting-up-your-react-app-for-googles-seo-crawlers-d16b102b0103). The author describes troubleshooting the issue of blank pages appearing in their URL Inspection Tool testing by crawling a project from the command line using [Phantomjs](http://phantomjs.org/).

This is a great new trick to add to the ol' trick bag. Phantomjs is basically a browser without an interface. You can feed it scripts and tell it what to crawl. Supposedly, it's either the basis for, or very similar to, the tools used by Google's crawler. Therefore, Phantomjs tesnds to offer a view of your content that is very similar to that of Google and other search crawlers.  

I did find Phantomjs to be a little confusing at first. It took some digging to understand the tool and how to use it.

I found it easiest to install on the command line via Brew.
```
brew tap homebrew/cask
brew cask install phantomjs
```
After installation, create a Phantomjs script. You can find a simple example script in the article that hits a given URL and log's the returned content.

Copy it into your text editor and replace the URL with whatever page you want to test, save your script as 'crawler.js', change over to the directory where you saved your script, and run it with phantomjs like this.
```
phantomjs crawler.js
```

Sure enough, my site wasn't rendering correctly. It's probably unlikely that you'll run into the same exact issues I had, but I'll run you through anyway so you can see my troubleshooting logic.

The first problem I discovered was this error message in the output from the crawler script.
'ReferenceError: Can't find variable: Map'

Turns out it's the same error @vonkunesnewton found and it appears to be an issue of polyfills. Polyfill is one of those vague words that someone made up to make confusing things more confusing. Apparently it means that the crawler doesn't have all of the language features required to run my project.

I fixed this easily by adding the following line to the <head> of my index.html file located in my public directory.
```
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

Supposedly, according to [@vonkunesnewton's article](https://medium.com/@vonkunesnewton/setting-up-your-react-app-for-googles-seo-crawlers-d16b102b0103) you can also install and import the source. I actually prefer that solution, but I couldn't get it to work. Oh well, one error message is gone. On to the next one.

The next error message I found was this.
```
Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
```

Unfortunately, this is where @vonkunesnewton and I part ways.

The error is informative but still confusing. I checked my code at the line referenced in my trace and it's just a simple <route> tag for my authorization view.
```
<Route path="/login/" exact component={AuthView} />
```

I performed the classic 'Google the error message' technique I've been perfecting for years now and I found [this short fiction novel]. About 10 posts in, this guy jtreminio mentions solving this by wrapping a component with withRouter(). I gave it a shot, importing withRouter at the top of the file.
```
import { withRouter } from 'react-router-dom'
```
and wrapping my AuthView component like this.
```
<Route path="/login/" exact component={withRouter(AuthView)} />
```
I don't pretend to fully understand why, but this seems to have worked... Sorta... That error is gone now, but the problem persists. When I run the Url Inspection Tool, my page still comes up blank. I've made some significant improvements here, but the journey continues.

After the above improvements, my local environment is still rendering fine, and production looks good too, but Google's tools are showing errors.

In the URL Inspection Tool, there are 3 tabs. The one labeled 'Screenshot' is showing the "Cannot read property" error. This is a frustratingly vague error.

The  My current path towards resolution seems to require a better understanding of babel.

#What even really is Babel?
Babel is a transpiler. It basically coordinates the compilation of your code down to

#Yes, and?
I guess there's the peace of mind? When I do my lighthouse audits now, I don't see anymore red flags, so I got that goin' for me.

Honestly, the whole thing was a pretty serious pain in the ass. It's particularly frustrating to have to divert so much time to work that doesn't improve your experience. But if you're promoting any content on your site, you need that SEO power.  

#Thanks for reading!
If you are anything like me, you would rather be focused on building a better interaction than SEO. So this wasn't a pleasant experience for me. But maybe documenting my struggle here will help someone else get through it more easily.
