## Sapien-Base

This was a learning project I undertook as part of The Odin Project curriculum.
This particular project is my submission for the "Odin-Book" project, which is the final project of the Node.js section.

## Objective

The objective of this project was to create a social media web application similar to something like Facebook. The app would require users to sign up before seeing the content of other users such as posts and comments. Users who were signed up could also create posts and make comments as well as like posts. Users also had to be able to update their bio and see their own posts via their Profile page. Posts displayed via the dashboard would be from the logged in user or the users they were following. Users are also able to follow (and unfollow) other users which will determine what they see on the dashboard screen upon logging in.

## Takeaways

This project (whilst not requiring it via The Odin Project) was one that I took as an opportunity to learn Next.js and, authentication and user management via Clerk.

- I learnt about how to create routes using Next.js's App Router. These included but were not limited to dynamic routes, layouts and templates.

- I learnt the difference between client components and server components and that by default Next.js uses server components to render content server side.

- A best practice as far as client components is concerned is keeping them to small child components that require interactivity. (A like button VS the entire post being a client component for example)

- Next has in-built components such as Image and Link. Image optimizes images to present the right size for the viewing device as well as presenting the image in a format that's web friendly and minimizes overall file size. Rendering images using the Image component also helps to reduce layout shift

- The Link component enables Next.js to pre-fetch the pages that are linked to and saves the browser refreshing each time a link is visited, which gives that 'Single Page Application' feel.

- Another thing I learnt, whilst not specific to Next.js is React's useOptimistic hook which came in handy for providing snappy user interactions as well as displaying skeleton loaders for elements whilst asynchronous operations were being carried out

## Reflections

Overall I'm pretty happy with how this project turned out! I didn't spend as much time here as I did on my Budding Messenger application, but largely this was due to how much faster Next.js was to develop with. Not having to create a seperate API for my backend an document end points sped up development ALOT despite challenges configuring my Supabase PostgreSQL database in the cloud being a bit more of a confusing process due to connection strings sometimes working better as a direct string, other times (Such as in deployment) requiring a connection string with pooling

Debugging was also a bit different, but something I adapted to. It focused more on looking through Next's logs rather than developer tools on the front end.
