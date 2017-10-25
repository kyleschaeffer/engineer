# Engineer

[![npm](https://img.shields.io/npm/v/sp-engineer.svg?style=flat-square)](https://www.npmjs.com/package/sp-engineer) [![GitHub issues](https://img.shields.io/github/issues/oldrivercreative/engineer.svg?style=flat-square)](https://github.com/oldrivercreative/engineer/issues) [![GitHub license](https://img.shields.io/github/license/oldrivercreative/engineer.svg?style=flat-square)](https://github.com/oldrivercreative/engineer/blob/master/LICENSE) [![Twitter](https://img.shields.io/twitter/url/https/github.com/oldrivercreative/engineer.svg?style=social&style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Foldrivercreative%2Fengineer)

**Engineer** is a command-line tool to help track and consolidate SharePoint configuration changes in any number of environments. It's like version control for site columns, content types, lists, views, and more.

**[Explore Engineer Documentation](http://sp-engineer.org)**

Engineer is inspired by [Laravel](https://laravel.com) migrations, and is made possible by [PnP-JS-Core](https://github.com/SharePoint/PnP-JS-Core), [node-pnp-js](https://github.com/s-KaiNet/node-pnp-js), and [CSOMNode](https://github.com/vgrem/CSOMNode).

## Table of Contents
- [Getting Started](#getting-started)
- [Migrations](#migrations)
- [Documentation](#documentation)
- [Authors](#authors)
- [Copyright and License](#copyright-and-license)

## Getting Started

You'll need [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) before you begin.

```sh
npm -g install sp-engineer
```

Once installed, you can type `engineer` into any console prompt to run Engineer commands. Use `engineer -h` to see a list of commands.

### Initialize Engineer

```sh
engineer init
```

The `engineer init` command creates a `.gitignore` and `env.js` file in the current working directory. `env.js` contains the SharePoint site URL as well as authentication information for your target SharePoint environment. Any authentication configuration supported by [node-sp-auth](https://github.com/s-KaiNet/node-sp-auth) can be used as the `auth` settings in your `env.js` file.

### Install Engineer

```sh
engineer install
```

That's it. You're ready to start making configuration changes to SharePoint.

## Migrations

Engineer uses **migrations** to track configuration changes made to SharePoint. You can use migrations to create a queue of tasks that are executed in order on any number of target environments. Think of migrations like source control for your configuration operations.

### New Migration

```sh
engineer make my-first-migration
```

This command will create a `migrations` folder in the current working directory, and a new file called `YYYYMMDDHHMMSS-my-first-migration.js` in that directory (`YYYYMMDDHHMMSS` is replaced by the current UTC timestamp). Feel free to open this file to see what's inside. By default, new migrations are configured to create a new list called `My List` when migrated.

### Migration Status

```sh
engineer status

┌───────────────────────────────────┬─────────┐
│ 20171025135627-my-first-migration │ Pending │
└───────────────────────────────────┴─────────┘
```

You can see that our new migration is currently in `Pending` status. Now use the `migrate` command to activate the migration.

### Migrate

```sh
engineer migrate
```

Once migrated, you'll see a new list called `My List` has been created on your SharePoint site. This migration is now in the `Migrated` status, and will not be activated again during future migrations.

### Roll Back

```sh
engineer rollback
```

Once rolled back, `My List` is deleted from the SharePoint site and the migration is set to `Pending` status once again.

## Documentation

Find details on every Engineer command and migration API method in the official documentation, available at [http://sp-engineer.org](http://sp-engineer.org).

## Authors

Engineer was created by **[@kyleschaeffer](https://twitter.com/kyleschaeffer)** and **[Old River Creative](https://oldrivercreative.com)**.

## Copyright and License

Code and documentation copyright 2017, [Engineer contributors](https://github.com/oldrivercreative/engineer/graphs/contributors) and [Old River Creative, LLC](https://oldrivercreative.com). Code released under the [MIT License](https://github.com/oldrivercreative/engineer/blob/master/LICENSE). Documentation released under [Creative Commons](https://github.com/oldrivercreative/engineer/blob/docs/LICENSE).
