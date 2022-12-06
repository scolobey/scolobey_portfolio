---
title: How to setup a multiplatform synchronized realm
date: "2019-09-16T23:46:37.121Z"
template: "post"
draft: false
slug: "/posts/realm_synch_tutorial/"
category: "Programming"
tags:
  - "Javascript"
  - "Realm"
  - "React"
description: "According to Realm, the documentation is immaculate. But it sucks. So I thought I'd share how I figured out (over the course of far too many moons) how to synchronize Realm with my MongoDB server."
---

Part of me wants to just rant here about how shitty Realm's documentation is when it comes to helping you do what I thought Realm was designed to do. But I've read walkthroughs like that before, and they suck.

Not to mention, I've discovered that a lot of my frustration comes from a misunderstanding of what Realm could and should do, and how that would occur. I do think Realm's documentation and marketing are at least partly to blame for this. But I am, as usual, diving in a little over my head here. Still, I tend to think that

So I'm just going to say that I think they can do better and we'll move on.

#What are we doing now?
I have a simple recipe app that spans multiple platforms. There's an IOS app, an Android app, a React-based web interface and a Node API to a MongoDB database. I want data on my various interfaces to be synchronized. If you alter data in one interface, I want those changes to be reflected as quickly as possible in the other interfaces.  

This is a tall order. It's getting easier these days, but it's still proving to be one of the more difficult programming tasks I've attempted.

#The current solution
My project works currently. Sorta.

Both of my mobile apps use Realm to manage local data. One of the reasons I chose Realm for this purpose is that it supports Android and IOS, and I thought it might save me some cognitive overhead. The other reason I picked it was the magical promise of out-of-the-box data synchronization.

I quickly discovered that synchronization was a little difficult to implement, and would probably involve a 30$ a month fee. Realm hosts what they call the 'Realm Object Server'. You pay a monthly fee and they give you a Realm that you can access via a URL. It does appear to be possible to host your own Realm but as far as I can tell, that's complicated.

Being as I am frugal, my initial solution was to write my own synchronization. This is easily the most complicated part of my app. Each interface has its own code that reconciles local and remote data. But, as I mentioned, it works.

The problem though, is that it doesn't work great. There are bugs. It's tough as hell to troubleshoot. Even at its best, it can't handle simultaneous manipulation of data.

#What we're gonna do
We're going to set up a Realm Object Server. Then we will learn how to securely connect to that Realm using a JWT (JSON web token). We're going to patch our API code into that Realm. Then we're going to figure out how to piggyback our MongoDB on that Realm so that we can lean on Realm to manage data manipulation and MongoDB for persistence.

Along the way I'm sure we'll uncover some confusion and problems and misconceptions and general bullshit.

#But real quick, what is a JSON web token
Just in case you need a refresher here. A JSON web token is an encoded string. It generally includes 3 sections of data, a header, a payload and a signature.

The header describes the token and specifies an encryption algorithm.

The payload contains JSON data. In practice, it usually contains some kind of user data, maybe an admin boolean or something.

The signature is built by combining data from the previous 2 sections with a secret key and hashing them with the encryption algorithm specified in the header.

#The first catch
Realm does you one better in terms of security. Unfortunately, they're not doing you any favors when it comes to simplicity. My current setup I have to specify a 'secret key' constant when I fire up a server. The whole JWT concept is based on the requirement that both the server and the client are aware of a secret password. When either system runs a hash using the specified algorithm, they seed that hash with the same string.

https://www.comodo.com/resources/small-business/digital-certificates2.php

The problem as described by https://blog.miguelgrinberg.com/post/json-web-tokens-with-public-key-signatures
<!-- This works, but if someone gets ahold of your secret password, you're kinda screwed. In addition, if you start scaling and you need to spawn off new servers, the password game gets a little complicated. What Realm does is that it asks you to bring public-key encryption into the system.

You can opt to have a dedicated service for token generation and verification. Any services that receive a token from a client need to make a call into the authentication service to have the token verified. For busy systems this creates a performance bottleneck on the authentication service.
You can configure the secret key into all the services that receive tokens from clients, so that they can verify the tokens without having to make a call to the authentication service. But having the secret key in multiple locations increases the risk of it being compromised, and once it is compromised the attacker can generate valid tokens and impersonate any user in the system. -->


And the description of why public-key encryption is awesome by the same

<!-- Message encryption: If I want to send an encrypted message to someone, I can use that person's public key to encrypt it. The encrypted message can only be decrypted with the person's private key.
Message signing: If I want to sign a message to certify that it came from me, I can generate a signature with my own private key. Anybody interested in verifying the message can use my public key to confirm that the signature is valid. -->



#First you need to generate some keys

I had to go through this code example to figure all of this out manually.
https://github.com/realm/realm-sync-samples/tree/master/05-jwt-authentication/server

The process gets a little complicated here. You need to generate some cryptographic signatures and store them in a file on whatever system is running your code. If you're just playing with a local project, you can run a few commands in your terminal. Let's start with that.

Open up a terminal window and cd into the main directory of your project. Then, run the following 2 commands.

```
openssl genrsa -out privatekey.pem 2048
openssl rsa -in privatekey.pem -outform PEM -passin pass:ilovesushi -pubout -out publickey.pem
openssl rsa -in privatekey.pem -outform PEM -pubout -out publickey.pem
```

openssl genrsa -des3 -out private.pem 4096
// Enter and confirm password when prompted
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

This will generate 2 files 'privatekey.pem' and 'publickey.pem'. These files should contain cryptographic keys. It's not a bad idea to open each file with your text editor and verify that this is the case.

Add a line to your .gitignore file to avoid pushing these files to version control.
```
*.pem
```

If you're pushing to a production environment, you should set up a couple of other details. It's a little frustrating to have to access a remote terminal to run obscure commands, so you should .

"deletekeys": "rm privatekey.pem && rm publickey.pem",
"generatekeys": "sh ./keygen.sh",
"postinstall": "npm run generatekeys",



https://www.ssh.com/ssh/keygen/

Now that we've got our keys saved and our files ignored from version control, let's take a look at how we can use these keys to securely authenticate to the Realm Object Server.


#The second catch
Somehow I got it in my head that Realm would need to somehow be integrated with my database from the start. My gameplan for implementation then, involved patching Realm in on the logic for my API calls. After some struggling, I came to the realization that this was just an entirely backwards idea.

From the outset, it just makes more sense to completely ignore your backend. The goal is to patch all of the clients directly into the Realm Object Server and let Realm do all of the synching work for you.

It's difficult to describe just how wrong I was in my understanding of this system. Personally, this is just the backwards way I do things. I get an idea in my head, chase it around for weeks, and then realize that there was a much easier way to do things. It's a struggle, but I do learn from my mistakes.

So the new starting point is to setup our web interface to hit Realm directly and generally bypass API calls. Then we can do some testing and play around a little before moving on to the mobile client implementations.

Who knows, it looks like we might not even need a backend. Maybe that whole API is useless. That would be really cool, but also somewhat devastating. That's an awful lot of fruitless work.

#Get shit done
I opened up my react/redux client. This is where things are maybe going to fall apart from the standpoint of a tutorial. That's because what I'm doing is dependent on the way I've chosen to organize my project. So I'm stuck here in that it's not really valuable to provide exact code anymore. I'll need to give you the background processes in coming up with this code so that hopefully you can come up with your own process.

First I add Realm to the project. In my package.json file I add the following to my dependencies list.  
```
"realm": "^2.3.0"
```
Before installing, there's a huge gotcha here. For whatever reason, Realm wants you to use node 10. I happened to be on node 12. In order to switch to 10 I had to install nvm (Node version Manager). It's not really easy to install, and may involve editing your .bashrc file.

http://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html

Contains everything you should need to get nvm working. As it describes, if it doesn't

#A note on .bashrc
Nobody explained this to me for years. As a result I wasted countless hours trying to install web projects because I lacked a small, but very important understanding.

In your root directory, you have some weird hidden files.
(~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc)

You should be able to open any of those files with your terminal text editor. For example:
```
vim ~/.bashrc
```
That should open your bashrc file.

These files may contain scripts. These scripts work to configure your terminal. I'm sure there are complex rules to how they are created and run. For now, all you need to know is that when you open a terminal, these scripts are executed, and they configure the environment in which your terminal is operating.

http://www.linuxfromscratch.org/blfs/view/systemd/postlfs/profile.html

Sometimes, when you try to run a project, it can't find files that you know are in your system. This is almost always signaling a problem with your bash shell startup files.

There's a lot you can do with these files, but when it comes to web development, you're mostly concerned with using these files

These files can be very frustrating to manage. They are often edited in an installation process. For instance, if you're following directions to install a package, those directions may contain a command that edits these files. Editing these files from the command line is fast, but it obscures the fact that you are altering important files. A big problem is that tutorials will sometimes guide you to run a command that edits these files in a way that influences other projects that you run on your system. In some cases a project will even make edits to these files when you install it and you don't even know the changes have occurred.

In the past I've run into trouble configuring a project and then switching over and trying to run a different project and finding that somehow my bash scripts have been changed. This has been particularly annoying for me because I have had the relatively rare pleasure of trying to work with both node and rails based projects simultaneously. I've spent countless hours trying to understand why the shell isn't finding some random file or package.

#Moving on

So I dig into my middleware. Shit, here's another complex concept that we need to dig into. Middleware is a concept that is specific to the React/Redux methodology. React is great at managing data changes and reflecting them in an interface. But that can get extremely complicated if you're not careful.

In order to manage this complication, developers have come

#The big confusion

So Realm is like a database. But not really. 
