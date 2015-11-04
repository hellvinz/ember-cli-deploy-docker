# Ember-cli-deploy-docker

This ember-cli-deploy addon allows you to build a docker container via ember-cli-deploy

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Usage

In you deploy.js file, add a docker section like this:

```
docker: {
      repository: 'xxx.dkr.ecr.us-east-1.amazonaws.com/myrepo'
    }
```

then deploy your app:

```
ember deploy production
```

note: autodeploying the pushed container to a docker host is out of the scope of this project


## Gotchas

The container will be tagged with `#latest` and the current `revisionData.revisionKey` provided by ember-cli-deploy
