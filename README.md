# PseudoCode Website

> Source of truth and live version for my personal website.

This project is built using [Express.js](https://expressjs.com/). Initially, I intended to create a simple static
website, but I wanted a more flexible setup for publishing and tagging content. So, I opted for Express.js.

Instead of using a separate database, I decided to avoid the overhead of managing one and am experimenting with storing
all the content in markdown files. I use [NeDB](https://github.com/louischatriot/nedb) to index metadata. NeDB is
lightweight and works well for indexing, but I'm mindful that as the content grows, this setup might face scalability
issues. For admin authentication, I disable admin features in production using environment variables.

## Development

Ensure the environment variables are configured:

```bash
PORT=3000
ADMIN_ENABLED=true
```

To run the server in development mode:

```bash
yarn install
yarn run dev
```

## Production

Make sure the environment variables are set correctly:

```bash
PORT=3000
ADMIN_ENABLED=false
```

## Publishing Blog Posts

- Run the server locally.
- Use the admin panel to create a new post.
- Verify that the markdown and index are properly updated.
- Commit and push the changes to the repository.
- Pull the latest changes on the production server.

*Note: GitHub hooks for automated deployments are not yet set up but are planned for the future.*

## Future Plans

I plan to evolve this platform as my main editor for writing blogs, allowing me to draft and publish posts seamlessly.
Additionally, I aim to integrate a mailing list feature to share new posts and connect with my readers.

Thank you!