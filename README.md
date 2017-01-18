# Slush Model-crud

## Getting Started

Install `slush-model-crud` globally:

```bash
$ npm install -g https://github.com/angeltveit/slush-model-crud.git
```
## About
This plugin abstracts away the monkey work when creating CRUD routes in coherence with Express and Mongoose in Node.js. It simply creates a model and some simple default CRUD routes. It also supports inserting middleware in the process.

The default folder structure is:
* ./routes/api/<route-folder>/index.js
* ./models/<modelname>/index.js

These can be changed in ./config.json

### Usage

Open your project folder and run:

```bash
$ slush model-crud
```

## About Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).
