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

```bash
npm install -g mdast
npm install -g mdast-lint
npm install mdast-lint-sentence-newline
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
