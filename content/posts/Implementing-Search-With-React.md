---
title: Implementing Search with React and Redux
date: "2019-06-25T23:46:37.121Z"
template: "post"
draft: true
slug: "/posts/implementing-search-with-react-and-redux/"
category: "Development"
tags:
  - "Design"
  - "Search"
  - "Development"
  - "React"
  - "Redux"
description: "A naive client-side search implementation in React using Redux to separate concerns."
---

Working to build out my recipe app, there's really only one more major discrepancy between web and mobile and that's search. Currently, the app is geared towards storing recipes, so I don't have a database of recipes to search through. But once you add your own recipes, a search bar does come in handy.

It's a little silly because I don't have any users yet and I should probably focus on marketing, but it shouldn't be too difficult to implement a simple search system, just enough to get any of those potential users started. What's more, search is a natural in to the wide and wonderful world of SEO. For a recipe platform, search results are key to structuring data in a way that appeals to search algorithms, but we'll get into that a little down the road.

For now, just the simple search interface, and I'll walk through this in a very simple, step by step process. This might get a little silly if you're already more comfortable with react and redux, but I think it illustrates some important concepts to try and outline my thought process throughout.

# The UI

First things first, let's put a search bar at the top of the page. I'm mostly patterning the web interface off of the mobile apps, so I want it to look something like this. Here's what the mobile app looks like.

So you can throw a div at the top of your page as you see fit.

```
  <div class="RecipeSearchField">
    <img src="/search_icon.svg" height="30"/>
    <input type="text" placeholder="Search.." />
  </div>
```

Take a look at the 'img' tag. The 'src' references a file I've dropped into the 'public' file in my project. It's just a search icon I downloaded [here](https://icons8.com/icons/set/search). I like the SVG format for icons because it scales so nicely. Play with the height of the icon to get the size you want.

Do we have our search field somewhere on our page. I'll run you through styling later if you're interested. However, you'll probably want to style your search field to match your page, so it's not really important. For now let's focus on turning this div into a React component so that we can start to add functionality. After that I'll show you how to bring in the redux architecture to streamline your code and separate your logic from your view.

# A simple search field component in react

```
import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div class="RecipeSearchField">
        <img src="/search_icon.svg" height="30"/>
        <input type="text" placeholder="Search.." />
      </div>
    );
  }
}

export default SearchBar;
```

I don't know where you're keeping your components, but I'd guess it's in a directory called 'components'. Create a file in that directory and fill it with the code above. That's just about as simple as a React component gets. It just imports the modules we needs from React, creates a component, and exports it as SearchBar. Feel free to adjust the titles as you see fit, then save your file.

Now we can replace our previous html with a reference to our new React component. Go back to the view where you added the search field and replace that recipeSearchField 'div' with your component, like so.

```
<SearchBar />
```

Awesome. But it doesn't work yet. Your app has no idea what '<SearchBar />' means. Go to the top of your file and import the component. At the moment, I'm just storing all of my components in the same directory using CamelCase.js naming structure. So accessing SearchBar.js from my NavBar.js component is as easy as...

```
import SearchBar from "./SearchBar";
```

But you may well need to edit the file path to match your project structure. And if you exported your SearchBar under a different name, you'll need to change that first part as well.

So now, if you reload, you should see that same search field you had earlier. The difference is that now our search field is actually a React component. Considering that there is pretty much no benefit whatsoever to a React component that simply renders HTMl, we should probably add some functionality. Let's add a couple of functions.

```
import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
    console.log(event.target.value);
  }

  render() {
    return (
      <div class="RecipeSearchField">
        <img src="/search_icon.svg" height="30"/>
        <input type="text" placeholder="Search.." onChange={this.handleChange}/>
      </div>
    );
  }
}

export default SearchBar;
```

Notice we added a constructor to do a little ground work before we get started. The constructor establishes an empty state and then binds the handleChange function to the component. the handleChange function takes an event as a parameter and sets the state. For now, we'll also log the event.target.value to the console so we can see if it's working. in the input, we've set onChange={this.handleChange}. So, when there's a change to the input field, the handleChange function is called.

Save the file, reload the app, and fire off the old cmd+opt+i to open the inspector. Make sure the console is showing.

Now we have to do some code gymnastics. I want to share state between my recipe list and my search bar, but they're separate components. It would be simpler to just combine my search bar with my recipe list. But I want to compartmentalize things. My code will be cleaner and easier to troubleshoot. If you're not comfortable with redux, you might want to take a little side path and [read up](https://redux.js.org/introduction/core-concepts). But I'll try and be gentle.

#Skip this section if you understand Redux

Redux is... Kinda like... A library that enforces a design pattern.

Like, what!? Why!?

I dunno. But it does start to make sense once you sort it out. I think.

React is a fun tool. It helps you write browser code that updates itself in really fun and interesting ways. Of course, we all know that, with great power, comes great responsibility. If you're not careful, React will allow you to build some extremely unpredictable and unreliable software.

To build larger React applications without losing control, it helps to lay down some rules. Some of the most valuable rules are those governing the way in which information moves through the application. A popular design pattern, intended to guide implementation of this information flow, is called Flux.

I like the way this is worded [here](https://en.support.wordpress.com/markdown-quick-reference/)

> > The view dispatches actions that describe what happened. The store receives these actions and determines what state changes should occur. After the state updates, the new state is pushed to the View.

Action, store, and state are all bits of React jargon, but they are rather descriptive of the structures they represent. As a mental exercise, take a moment to try and understand the process described and imagine what might happen if this process takes a wrong turn.

Long story short, you get unexpected results. If you're not careful about how you manage changes to your data stores and reflect them in your UI, you quickly find yourself in a situation where your data stores are inconsistent with your UI. As your user tries to compensate for those inconsistencies, they are compounded.

So yeah, there's Flux. And it's helpful. But it's confusing. And it still lets you wander off the trail if you're not faithful to the map.

Enter Redux. Redux is a library that implements a design pattern rather similar (though not identical) to Flux and exposes it via an API. It helps you stick to some of the Flux ideas in a more structured way.

It's a little tough to get all of these concepts to congeal into a nice mental Jello. To really get it, you need to implement a feature. Maybe something like a search bar?

#The meat and two bits

There's really more than one way to structure your Redux application, and your file structure and use of Redux may differ from mine. As concerns the task at hand, we need to add 2 main structures to our code: an action, and a reducer. The action will define the process we want to launch, and the reducer will describe that process.

My project is still on the simpler side, so I'm still keeping all of my actions and reducers in single files. That is, I have one file at 'src/reducers/index.js' and one at 'src/actions/Actions.js'. This is starting to get a little out of control, and I'm going to have to do some refactoring eventually, but it works for now.

The Actions file is straightforward. It just exports functions that return objects with a 'type' key and sometimes a little data. As concerns our search action, all I need to do is add a few lines of code to the bottom of that Actions.js file.

```
export function search(query) {
  return { type: 'search', query }
};
```

This new function accepts a query as a parameter and returns an object containing a type string and the query.

Now for the reducer. My reducer file exports 1 function that acts as a filter to determine how to alter the state of the app based on that 'type' string in the action that is fired. I'll add an if statement into that function that will handle the 'search' type action. So now when your reducer is called with an action that is labeled with type='search', it will trigger this statement.

```
if (action.type === 'search') {
  let recipeList = state.recipes.filter( function(recipe) {
    return recipe.title.toLowerCase().includes(action.query.toLowerCase());
  });

  return Object.assign({}, state, {
    filteredRecipes: recipeList
  });
}
```

What does it do? First, it filters the current recipe list stored in my app's state based on the provided query string and the recipe title. Then, it creates an Object that is a copy of the app's current state, and sets the 'filteredRecipes' key in that state to my new list of filtered recipes. I'm filtering recipes. You might be filtering something else. But the concept is still the same. When your app is told to 'search', it replaces your app state with a new state that reflects that request.

>> Since we're talking about lists, there's this question of where your list came from. I'm assuming you had to load it, and you're storing it in some kind of object in your state. Keep in mind that you will need to now store a new object in your state that is a filtered version of your list. You will need both objects. My list is stored in state as 'recipes'. and my filtered list is stored as filteredRecipes.

Now that we've got that sorted out, we need to connect this new action to our view. Going back to our SearchBar component, let's make a few adjustments. First import our new search action from Actions.js, as well as the connect function from the "react-redux" library, which can be easily installed via npm (probably you've already done that). Then, you need to make 2 more little tweaks to the code.

```
import React, { Component } from 'react';
import { connect } from "react-redux";
import { search } from "../actions/Actions";

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.search(event.target.value);
  }

  render() {
    return (
      <div className="RecipeSearchField">
        <img src="/search_icon.svg" height="30"/>
        <input type="text" placeholder="Search.." onChange={this.handleChange}/>
      </div>
    );
  }
}

export default connect(null, {search} )(SearchBar);
```

See that connect stuff I added to the export? Take a little peak at the [description of the connect function](https://react-redux.js.org/api/connect). It allows you to feed some information into your component through its props. The first parameter is set to null for our purposes. That parameter can be used to match state to props. A little complicated to understand, but it allows you to effect changes to UI between independent components. We'll get to that in a moment. The next parameter in this case is the search function from our Actions.js. And then it's called against our component.

To simplify here, we're just connecting our search action to our component's props.

And that enables us to call our action from inside our component. Just take a look at the handleChange() function. I've replaced the code that was previously in this function with the line 'this.props.search(event.target.value);'. So now, when the search field is changed, react-redux fires off the correct action.

A little trick to make sure this is working. Save your files and reload. Go back to your console. Type something into the search bar. Then, in the console, enter the following call

```
store.getState()
```

You should now see your store object in the console. Does it contain your filtered list? If you click opened the object, how many objects appear in your filtered list? If it's the same number of objects as the number of objects in your list that match the query, you're looking good. If not, I don't know what to tell you other than "I'm sorry I've failed you".

# The filtered list.

So now that we have this new object representing our filtered list, let's connect this list to our UI. My list of recipes is displayed via a component called Recipes. I'm already importing redux and my actions in my Recipes component. But you may need to add this.

```
import { connect } from "react-redux";
import { getToken, setRecipe } from "../actions/Actions";
```

And then at the bottom of my Recipes component, I have this structure.

```
function mapStateToProps(state) {
  return {
    filteredRecipes: state.filteredRecipes,
  };
}

export default withRouter(connect(mapStateToProps, { })(Recipes));
```

As mentioned before, that first parameter in the connect function serves to map state to props. I pass a function into that parameter that accepts a state and returns an object based on that state. You see all I did is map 2 keys of the state to corresponding keys in props. There's a lot going on under the surface, but what this does is it detects when an action changes those keys (probably from a separate component), and resets the state in this component. So in our case, when our searchBar fires an action that changes filteredRecipes, our Recipes component knows it need to re-render with the new filteredRecipes.

To wrap it all up. switch out whatever key you're using as your list, with the new key referencing your filtered list.
