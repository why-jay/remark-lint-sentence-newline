[![Build
status](https://travis-ci.org/chcokr/mdast-lint-sentence-newline.svg)](https://travis-ci.org/chcokr/mdast-lint-sentence-newline)

# mdast-lint-sentence-newline

This is an [mdast-lint](https://github.com/wooorm/mdast-lint) rule that enforces
a newline after an end of sentence in Markdown.

```Text
<!-- Invalid -->

Hello, world. This sentence should be on a second line.

<!-- Valid -->

Hello, world.
This sentence should be on a second line.
```

## Using the rule

### Via `.mdastrc`

```bash
npm install -g mdast
npm install -g mdast-lint
npm install mdast-lint-sentence-newline # local install!
```

Then, set up your `.mdastrc`:

```JSON
{
  "plugins": {
    "mdast-lint": {
      "external": ["mdast-lint-sentence-newline"]
    }
  }
}
```

Now you can use the following command to run the lint:

```bash
mdast --no-stdout xxx.md
```

### Via CLI

```bash
npm install -g mdast
npm install -g mdast-lint
npm install -g mdast-lint-sentence-newline # global install!
mdast --no-stdout -u mdast-lint="external:[\"mdast-lint-sentence-newline\"]" xxx.md
```

Note that the `lint=<lint_options>` option only works with `mdast >= 1.1.1`.
