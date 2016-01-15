[![Build
status](https://travis-ci.org/chcokr/remark-lint-sentence-newline.svg)](https://travis-ci.org/chcokr/remark-lint-sentence-newline)
[![Coverage
Status](https://coveralls.io/repos/chcokr/remark-lint-sentence-newline/badge.svg?branch=master&service=github)](https://coveralls.io/github/chcokr/remark-lint-sentence-newline?branch=master)

# remark-lint-sentence-newline

This is an [remark-lint](https://github.com/wooorm/remark-lint) rule that
enforces a newline after an end of sentence in Markdown.

How do we define an *end of sentence*?
It is a `.`, `?` or `!` followed by a space.

```Text
<!-- Invalid -->

Hello, world. This sentence should be on a second line.

<!-- Valid -->

Hello, world.
This sentence should be on a second line.

Hello.<-There is no space after the dot, so this is not an error.

"Hello, world!" This sentence is not required to be on a second line because
!" is not an end of sentence.
```

Regarding that `!"` example: `!` is a sentence end, but `!"` isn't.
But you're free to add a newline after `!"`, or wherever.
This rule's job is to complain when you *don't* have a newline in certain cases.
It never complains when you do have a newline.

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark
npm install -g remark-lint
npm install remark-lint-sentence-newline # local install!
```

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-sentence-newline"]
    }
  }
}
```

Now you can use the following command to run the lint:

```bash
remark --no-stdout xxx.md
```

### Via CLI

The following works for `remark-lint >= 2.2.0`.
Prior to 2.2.0, remark-lint did not load globally installed (a la `npm install
-g`) lint rules, so the following wouldn't work.

```bash
npm install -g remark
npm install -g remark-lint
npm install -g remark-lint-sentence-newline # global install!
remark --no-stdout -u remark-lint="external:[\"remark-lint-sentence-newline\"]" xxx.md
```

## Blacklisting

Earlier, we defined what an *end of sentence* is, but often there are exceptions
to the rule.
For example, we often use `e.g.` followed by a space.
The second dot followed by a space is eligible as an end of sentence, but we
don't want a newline in the middle of the following sentence for example:

```Text
Some open-source projects (e.g. remark-lint) are awesome
```

So we need a way to define exceptions.
The `blacklist` option in your `.remarkrc` (or in your CLI option) allows you to
achieve this.

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-sentence-newline"],
      "sentence-newline": {
        "blacklist": ["e.g."]
      }
    }
  }
}
```
