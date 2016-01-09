[![Build
status](https://travis-ci.org/chcokr/mdast-lint-sentence-newline.svg)](https://travis-ci.org/chcokr/mdast-lint-sentence-newline)

# remark-lint-sentence-newline

This is an [remark-lint](https://github.com/wooorm/remark-lint) rule that enforces
a newline after an end of sentence in Markdown.

```Text
<!-- Invalid -->

Hello, world. This sentence should be on a second line.

<!-- Valid -->

Hello, world.
This sentence should be on a second line.
```

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

```bash
npm install -g remark
npm install -g remark-lint
npm install -g remark-lint-sentence-newline # global install!
remark --no-stdout -u remark-lint="external:[\"remark-lint-sentence-newline\"]" xxx.md
```
