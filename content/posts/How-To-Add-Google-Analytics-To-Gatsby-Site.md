---
title: Setting up Google Anlytics on my Gatsby Site
date: "2019-07-15T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/google_analytics_and_gatsby/"
category: "Development"
tags:
  - "Development"
  - "Analytics"
  - "Gatsby"
description: "A quick note about how to add Google Analytics to a Gatsby site"
---
I'm just getting started with this Gatsby thing. I built a simple blog/portfolio. I wrote a few posts and linked my site to some social accounts, added it to my resume, mentioned it in some random spots online: reddit, (the Gatsby showcase site)[https://www.gatsbyjs.org/contributing/site-showcase-submissions/], etc. Now I'm wondering if anyone is actually visiting my page. So how do I get GA working with Gatsby?

There's a short answer. And there's also a long answer.

The actual process (the short answer) is super simple, and I followed these steps to enable GA on this very blog. To build this blog I used Lumen, which is a Gatsby starter project. If you're using Lumen, or any Gatsby project, your setup should be very similar.

However, if you have any trouble with the 'short answer' I've included my steps and reasoning (the long answer) in order to make this guide more transparent and universal.

#Short Answer.
Open up the config.js file in the root directory of your project. In the exported object, you should see a key entitled 'googleAnalyticsId'. Get your Google Analytics tag and paste it in there. Save the file, push your code, and you should be good to go. It may take some time for this to start working.

#Long Answer.
Setup a Google Analytics account if you haven't already. Click the 'Admin' option on the left-side menu and then click the blue button at the top of the middle column that says 'create property'. Fill in the form and select 'Get Tracking ID'.

You should now be presented with a 'script' tag and directed to insert this script into the head tag of the pages you want to track.

Simple enough. Your first inclination might be to find that 'head' tag in your project and paste in the code. If your page was just a simple HTML file, this would work fine, but we're using Gatsby, and Gatsby is built with React, and React does some interesting HTML gymnastics behind the scenes.

In fact, with Gatsby, you don't really even have a 'head' tag. Instead, it's more like a .js file that renders a 'head' based on some managed state, so enabling Google Analytics won't be as simple as pasting that 'script' code into an HTML file.

Let's take a look at the script they want us to put in our project. Here's what my script looks like, except { My-Analytics-ID } would be my actual analytics ID (which I've obscured for obvious reasons).

```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id={ My-Analytics-ID }"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '{ My-Analytics-ID }');
</script>
```
Taking a look at this script, here's what I'm thinking, in this sequence.

- Gatsby seems to be developed enough that it should have an in-built solution for something as simple and ubiquitous as enabling GA.

- The problem with an in-built solution is that, while it may simplify implementation, it's likely to also make it a little more confusing.

- What element do I see in the script tag that might remain intact through code extraction?

And in this case, I got pretty lucky, because my next thought was to search my project for the string 'gtag'. I'm using [Atom](https://atom.io/)(a great text editor - highly recommended) so all I have to do is cmd+shift+f and type 'gtag'.

This search points to 3 files in my project. I can see that my package.json and my package-lock.json reference a package called 'gatsby-plugin-google-gtag'. Awesome! This would suggest that my theory about an obfuscated GA configuration is correct. I'm not usually this clever, so I'll take a brief moment to celebrate. But we're not out of the woods yet.

In addition to the package files, I see that 'gatsby-plugin-google-gtag' is also referenced in a file called gatsby-config.js. I click that file opened and see this:

![Atom view of Gatsby file.](/media/gatsby-gtag.png "Atom view of Gatsby file.")

A little confusing, but you can see it's setting a key called trackingIds to a an array which contains 'siteConfig.googleAnalyticsId'. Seems promising, right? I do another project search for 'googleAnalyticsId'.

Sure enough, I find that config.js file with the 'googleAnalyticsId' key.

Pretty simple really, but I know a few years ago, or maybe even if I hadn't had my coffee, this little adventure could have easily turned into the proverbial 3-hour tour.
