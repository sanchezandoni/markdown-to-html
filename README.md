markdown-to-html
================

Command-line utility to convert Github Flavored Markdown to HTML.
Output may be to stdout or to your default browser.
Also, the underlying Markdown and GithubMarkdown classes are readable stream classes
and may be used however you like (e.g., pipe to an http response or to stdout).
Includes a demo of a web server app that uses both the classes.

##Installation

####To use the command line utilities

```
npm install markdown-to-html -g
```

####To use the Markdown or GithubMarkdown classes in your project

```
npm install markdown-to-html --save
```

##Example Usage

####Command line utility to output HTML to stdout

```
markdown myfile.md [<options>]
```
####Command line utility to output HTML to default browser

```
markdownb myfile.md [<options>]
```

####Command line utility to output the Github API results to stdout

```
github-markdown myfile.md [<options>]
```

####Command line utility to output the Github API results to default browser

```
github-markdownb myfile.md [<options>]
```

####Run the web demo

1. Run `git clone https://github.com/cwjohan/markdown-to-html.git` to create a markdown-to-html directory.
1. Run `cd markdown-to-html`
1. Run `npm install`
1. Run `npm start`.
1. In a web browser address field type [localhost:3000](http://localhost:3000).

###Use the Markdown class to render markdown text

```js
var Markdown = require('markdown-to-html').Markdown;
var md = new Markdown();
md.bufmax = 2048;
var fileName = 'test/test.md';
var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};
...
// Write a header.
console.log('===============================');
// Write a trailer at eof.
md.once('end', function() {
  console.log('===============================');
});
md.render(fileName, opts, function(err) {
  if (err) {
    console.error('>>>' + err);
    process.exit();
  }
  md.pipe(process.stdout);
});
```

##Options for markdown and markdownb

`--flavor <type>` -- Format as type 'gfm' (default) or just plain 'markdown'. May be abbreviated `-f`.
Note that for the `github-markdown` utility or the `GithubMarkdown` class it is the 'markdown' flavor that gives you
something resembling the README.md format on Github. Whereas, the 'gfm' flavor gives you something resembling the
the format of comments and issues on Github. This is due to how the Github Markdown API works. On the other hand,
for the `markdown` utility or the `Markdown` class it is virtually the opposite. For example, fenced code blocks
don't work when using the `markdown` utility or the `Markdown` class with the `--flavor markdown` option. This is
due to how the `marked` markdown parser works.

`--highlight` -- Highlight code blocks with style info. Highlight has no effect in
github-markdown. May be abbreviated `-h`. Defaults to `false`.

`--stylesheet <stylesheet>` -- Output HTML header with link element referring to
the given stylesheet. May be abbreviated `-s`.

`--title <title>` -- Output HTML header with given title. Title string may include
`$FILENAME`, `$DIRNAME`, `$BASENAME`, or `$PATHNAME` variables which are replaced by the
corresponding .md filename, directory name, base name, or full path, respectively.
Alternatively, the title may be any text you wish. May be abbreviated `-t`.

`--context <context>` -- Github user/project to use with #<n> issue number references.
May be abbreviated `-c`.

`--verbose` -- Verbose output. May be abbreviated `-v`. Defaults to `false` unless debug has
been specified, in which case it is set to `true`.

`--debug` -- Debug output. May be abbreviated `-d`. Defaults to `false`.

`--help` -- Output usage info.

##Markdown and GithubMarkdown class properties

`bufmax` -- The maximum amout of data to push to the read operation at any given time.
Defaults to 1024.

`debug` -- Debug output (e.g., individual chunks of data pushed to output). Defaults to `false`.

##Markdown and GithubMarkdown class methods

`render(fileName, opts, onDone)` -- Renders the markdown text in the given file using the given
options. Calls the onDone callback function when finished if specified. If you are going to
pipe the output to another stream, this is most reliably done in the callback function.

The `onDone` callback takes a single error parameter, which ought to be tested before
performing any other operations on the Markdown or GithubMarkdown stream.

