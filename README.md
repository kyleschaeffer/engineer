# Engineer

[![npm](https://img.shields.io/npm/v/sp-engineer.svg?style=flat-square)](https://www.npmjs.com/package/sp-engineer) [![GitHub issues](https://img.shields.io/github/issues/oldrivercreative/engineer.svg?style=flat-square)](https://github.com/oldrivercreative/engineer/issues) [![GitHub license](https://img.shields.io/github/license/oldrivercreative/engineer.svg?style=flat-square)](https://github.com/oldrivercreative/engineer/blob/master/LICENSE) [![Twitter](https://img.shields.io/twitter/url/https/github.com/oldrivercreative/engineer.svg?style=social&style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Foldrivercreative%2Fengineer)

**Engineer** is a powerful command-line tool to help track and consolidate SharePoint configuration changes in any number of environments. It's like version control for site columns, content types, lists, views, and more.

**[Explore Engineer Documentation](http://sp-engineer.org)**

Engineer is inspired by [Laravel](https://laravel.com) migrations, and is made possible by [PnP-JS-Core](https://github.com/SharePoint/PnP-JS-Core), [node-pnp-js](https://github.com/s-KaiNet/node-pnp-js), and [CSOMNode](https://github.com/vgrem/CSOMNode).

## Table of Contents
- [Getting Started](#getting-started)
- [Migrations](#migrations)
- [Documentation](#documentation)
- [Authors](#authors)
- [Copyright and License](#copyright-and-license)

## Getting Started

```sh
npm i -g sp-engineer
```

Once installed, you can type `engineer` into any console prompt to run Engineer commands. Use `engineer -h` to see a list of [commands](http://sp-engineer.org/commands/).

### Start a New Project

```sh
engineer init
```

The [`init`](http://sp-engineer.org/commands/init) command creates `env.js` in the current working directory. This file contains important configuration information such as the SharePoint site URL and authentication settings. Any authentication configuration supported by [node-sp-auth](https://github.com/s-KaiNet/node-sp-auth) can be used as the `auth` settings in your `env.js` file.

### Install Engineer Lists

Once your `env.js` file is set up, you're ready to install Engineer lists to your target SharePoint environment.

```sh
engineer install
```

## Migrations

Engineer uses **migrations** to track configuration changes made to SharePoint. You can use migrations to create a queue of tasks that are executed in order on any number of target environments. Think of migrations like source control for your configuration operations.

### New Migration

```sh
engineer make my-first-migration
```

The [`make`](http://sp-engineer.org/commands/make) command creates a file called `migrations/YYYYMMDDHHMMSS-my-first-migration.js` (`YYYYMMDDHHMMSS` is replaced by the current UTC timestamp). Feel free to open this file to see what's inside. By default, new migrations are configured to create a new list called `My List` when migrated.

### Migrate

```sh
engineer migrate
```

The [`migrate`](http://sp-engineer.org/commands/migrate) command activates pending migrations. A new list called `My List` will be created on the target SharePoint site when this migration is activated.

### Roll Back

```sh
engineer rollback
```

The [`rollback`](http://sp-engineer.org/commands/rollback) command retracts active migrations. Once rolled back, `My List` is deleted from the target SharePoint site.

### Multiple Environments

You can create copies of `env.js`, allowing you to store authentication and configuration for multiple SharePoint environments. Use Engineer's [`--config`](http://sp-engineer.org/commands/#config) option to switch environments when running any command.

```sh
engineer -c env/dev.js migrate
engineer -c env/prod.js migrate
```

## Documentation

Find details on every Engineer command and migration API method in the official documentation, available at [http://sp-engineer.org](http://sp-engineer.org).

## Authors

Engineer was created by **[@kyleschaeffer](https://twitter.com/kyleschaeffer)** and **[Old River Creative](https://oldrivercreative.com)**.

## Copyright and License

Code and documentation copyright 2017, [Engineer contributors](https://github.com/oldrivercreative/engineer/graphs/contributors) and [Old River Creative, LLC](https://oldrivercreative.com). Code released under the [MIT License](https://github.com/oldrivercreative/engineer/blob/master/LICENSE). Documentation released under [Creative Commons](https://github.com/oldrivercreative/engineer/blob/docs/LICENSE).
